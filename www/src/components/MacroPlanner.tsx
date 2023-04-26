import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCraftConfiguration } from '../hooks/useCraftConfiguration';
import { useLanguage } from '../hooks/useLanguage';
import { CraftAction, CraftParameter, craftActions, validateConfiguration } from '../models/gamestate';
import { plan_macro } from '../rust/caller';
import { evaluate_macro } from '../rust/rustfuncs';
import { supportedLanguages, translationProvider } from '../translation';

function actionTime(action: CraftAction): number {
    const twoSecondActions = [
        "Observe",
        "TrickOfTheTrade",
        "Innovation",
        "Veneration",
        "WasteNot",
        "WasteNotII",
        "GreatStrides",
        "FinalAppraisal",
        "Manipulation",
    ]
    return twoSecondActions.find(twoSecondAction => action === twoSecondAction) !== undefined ? 2 : 3;
}

function escapeActionName(action: CraftAction, t: ReturnType<typeof translationProvider>) {
    const actionName = t(action);
    if (actionName.indexOf(' ') >= 0) {
        return `"${actionName}"`;
    } else {
        return actionName;
    }
}

function exportMacro(actions: CraftAction[], t: ReturnType<typeof translationProvider>): string {
    const macroSize = 15;
    let currentMacroSize = 0;
    let chunks = 0;
    const lines: string[] = [];
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        const isLastAction = i === actions.length - 1;
        const macro = `/action ${escapeActionName(action, t)} <wait.${actionTime(action)}>`;
        if (currentMacroSize >= macroSize - 1 && (currentMacroSize >= macroSize || !isLastAction)) {
            chunks += 1;
            lines.push(`/echo Next <se.${chunks}>`)
            lines.push('');
            currentMacroSize = 0;
        }
        lines.push(macro);
        currentMacroSize += 1;
    }
    return lines.join('\n');
}

function parseMacro(macro: String): CraftAction[] | undefined {
    let actions: CraftAction[] = [];
    const lines = macro.split("\n");
    for (let line of lines) {
        line = line.trim();
        if (!line.startsWith("/ac")) {
            continue;
        }
        const quoteBegin = line.indexOf('"');
        let actionArgument;
        if (quoteBegin >= 0) {
            const quoteEnd = line.lastIndexOf('"');
            actionArgument = line.substring(quoteBegin, quoteEnd + 1);
        } else {
            const tokens = line.split(' ')
                .map(token => token.trim())
                .filter(token => token.length > 0);
            actionArgument = tokens[1];
        }
        let parsedAction: CraftAction | undefined = undefined;
        for (const language of supportedLanguages) {
            const t = translationProvider(language);
            for (const action of craftActions) {
                const escapedActionName = escapeActionName(action, t);
                if (actionArgument === escapedActionName) {
                    parsedAction = action;
                    break;
                }
            }
            if (parsedAction) {
                break;
            }
        }
        if (parsedAction) {
            actions.push(parsedAction);
        }
    }
    return actions;
}

export function MacroPlanner() {
    const [macro, setMacro] = useState<string>("");
    const [macroAnalysis, setMacroAnalysis] = useState<string>("");
    const [isStartButtonDisabled, setIsStartButtonDisabled] = useState<boolean>(false);
    const [ language, setLanguage ] = useLanguage();
    const t = translationProvider(language);
    const {getCraftConfig} = useCraftConfiguration();
    
    function updateMacro(newValue: string) {
        setMacro(newValue);
        updateMacroEvaluation(newValue);
    }

    function updateMacroEvaluation(macro: string) {
        const { params: craftParameter, initialQuality } = getCraftConfig();
        const actions = parseMacro(macro);
        if (actions) {
            const metrics = evaluate_macro(craftParameter, actions, initialQuality);
            const analysisItems = [
                `${t("SuccessRate")}: ${(metrics.success_rate * 100).toFixed(2)}%`,
                `${t("MaxQualityRate")}: ${(metrics.max_quality_rate * 100).toFixed(2)}%`,
                `${t("AverageQuality")}: ${Math.round(metrics.average_quality * craftParameter.item.max_quality)}`,
                `${t("MacroLength")}: ${metrics.macro_length}`,
            ]
            setMacroAnalysis(analysisItems.join('\n'))
        }
    }
    
    function onStartButtonClick(longer: boolean) {
        return function() {
            const { params: craftParameter, initialQuality } = getCraftConfig();
            if (!validateConfiguration({params: craftParameter, initialQuality})) {
                alert(t("InvalidParameters"));
                return;
            }
            setMacro(t("InProgress"));
            setIsStartButtonDisabled(true);

            const cpuCount = navigator.hardwareConcurrency ?? 1;
            const concurrency = Math.max(Math.floor(cpuCount * 0.8), 1);
            const macroFutures = [];
            for (let i = 0; i < concurrency; i++) {
                macroFutures.push(plan_macro(craftParameter, initialQuality, longer))
            }

            Promise.all(macroFutures)
                .then(macros => {
                    const scores = macros
                        .map(macro => evaluate_macro(craftParameter, macro, initialQuality))
                        .map(evaluation => {
                            if (evaluation.success_rate < 1) {
                                return evaluation.success_rate;
                            }
                            if (evaluation.max_quality_rate < 1) {
                                return 1 + evaluation.average_quality;
                            }
                            return 1 + evaluation.average_quality + 1 / evaluation.macro_length;
                        })
                    const bestScore = Math.max(...scores);
                    const bestIndex = scores.findIndex(score => score === bestScore);
                    return macros[bestIndex];
                })
                .then(macro => {
                    updateMacro(exportMacro(macro, t))
                })
                .catch(err => {
                    setMacro(err);
                })
                .finally(() => {
                    setIsStartButtonDisabled(false);
                })
        }
    }

    return <div className="mt-3">
        <Button variant="primary" disabled={isStartButtonDisabled} onClick={onStartButtonClick(false)}>{t("PlanMacroFaster")}</Button>
        <Button className="ml-2" variant="secondary" disabled={isStartButtonDisabled} onClick={onStartButtonClick(true)}>{t("PlanMacroBetter")}</Button>

        <Form.Group className="mt-3" controlId="macroOutput">
            <Form.Label>{t("OutputMacro")}</Form.Label>
            <Form.Control as="textarea" value={macro} onChange={(event) => updateMacro(event.target.value)} rows={15}/>
        </Form.Group>

        <Form.Group className="mt-3" controlId="macroAnalysis">
            <Form.Label>{t("MacroAnalysis")}</Form.Label>
            <Form.Control as="textarea" value={macroAnalysis} rows={4} readOnly={true}/>
        </Form.Group>
    </div>
}