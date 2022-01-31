import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLanguage } from '../hooks/useLanguage';
import { CraftAction, CraftParameter, validateConfiguration } from '../models/gamestate';
import { evaluate_macro, plan_macro } from '../rustfuncs';
import { translationProvider } from '../translation';

type Props = {
    craftParameter: CraftParameter,
    initialQuality: number,
}

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

function exportActionName(action: CraftAction, t: ReturnType<typeof translationProvider>) {
    const actionName = t(action);
    if (actionName.indexOf(' ') >= 0) {
        return `"${actionName}"`;
    } else {
        return actionName;
    }
}

function exportMacro(actions: CraftAction[], t: ReturnType<typeof translationProvider>): string {
    const macroSize = 15;
    const macros: string[] = [];
    for (let i = 0; i < actions.length; i += 15) {
        const chunk = actions.slice(i, Math.min(i + 15, actions.length));
        const macro = chunk.map(action => `/action ${exportActionName(action, t)} <wait.${actionTime(action)}>`).join('\n');
        macros.push(macro);
    }
    return macros.join('\n\n');
}

export function MacroPlanner(props: Props) {
    const { craftParameter, initialQuality } = props;

    const [macro, setMacro] = useState<string>("");
    const [macroAnalysis, setMacroAnalysis] = useState<string>("");
    const [ language, setLanguage ] = useLanguage();
    const t = translationProvider(language);
    
    function onStartButtonClick(longer: boolean) {
        return function() {
            if (!validateConfiguration({params: craftParameter, initialQuality})) {
                alert(t("InvalidParameters"));
                return;
            }
            setMacro(t("InProgress"));
            const macro = plan_macro(craftParameter, initialQuality, longer);
            setMacro(exportMacro(macro, t));
            const metrics = evaluate_macro(craftParameter, macro, initialQuality);
            const analysisItems = [
                `${t("SuccessRate")}: ${(metrics.success_rate * 100).toFixed(2)}%`,
                `${t("MaxQualityRate")}: ${(metrics.max_quality_rate * 100).toFixed(2)}%`,
                `${t("AverageQuality")}: ${Math.round(metrics.average_quality * craftParameter.item.max_quality)}`,
                `${t("MacroLength")}: ${metrics.macro_length}`,
            ]
            setMacroAnalysis(analysisItems.join('\n'))
        }
    }

    return <div className="mt-3">
        <Button variant="primary" onClick={onStartButtonClick(false)}>{t("PlanMacroFaster")}</Button>
        <Button className="ml-2" variant="secondary" onClick={onStartButtonClick(true)}>{t("PlanMacroBetter")}</Button>

        <Form.Group className="mt-3" controlId="macroOutput">
            <Form.Label>{t("OutputMacro")}</Form.Label>
            <Form.Control as="textarea" value={macro} rows={16}/>
        </Form.Group>

        <Form.Group className="mt-3" controlId="macroAnalysis">
            <Form.Label>{t("MacroAnalysis")}</Form.Label>
            <Form.Control as="textarea" value={macroAnalysis} rows={4}/>
        </Form.Group>
    </div>
}