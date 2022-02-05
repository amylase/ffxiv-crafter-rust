import React, { useState } from 'react';
import { Button, ButtonGroup, Form, Tab, Tabs } from 'react-bootstrap';
import { useCraftConfiguration } from '../hooks/useCraftConfiguration';
import { useLanguage } from '../hooks/useLanguage';
import { CraftAction, craftActions, CraftConfiguration, CraftParameter, craftResults, CraftState, initial_state, validateConfiguration } from '../models/gamestate';
import { available_actions, search_best_move, play_action } from '../rustfuncs';
import { translationProvider } from '../translation';
import { GameStateView } from './GameStateView';
import { MacroPlanner } from './MacroPlanner';
import { NextStateSelector } from './NextStateSelector';
import { ParameterEditor } from './ParameterEditor';


enum GameState {
    CONFIGURING,
    PLAYABLE,
    SELECTING_NEXT_STATE,
}

export function CrafterGame() {
    const [ craftConfig, setCraftConfig ] = useCraftConfiguration();
    const [ craftState, setCraftState ] = useState<CraftState>(initial_state(craftConfig));
    const [ gameState, setGameState ] = useState<GameState>(GameState.CONFIGURING);
    const [ nextStates, setNextStates] = useState<CraftState[]>(undefined);
    const [ language, setLanguage ] = useLanguage();
    const t = translationProvider(language);

    const possible_actions = available_actions(craftConfig.params, craftState);
    function onConfigChange(config: CraftConfiguration) {
        setCraftConfig(config);
        setGameState(GameState.CONFIGURING);
    }
    function onStartButtonClick() {
        if (validateConfiguration(craftConfig)) {
            setCraftState(initial_state(craftConfig));
            setGameState(GameState.PLAYABLE);    
        } else {
            alert(t("InvalidParameters"))
        }
    }
    function onActionButtonClickFactory(action: CraftAction) {
        return function() {
            const nextStates = play_action(craftConfig.params, craftState, action);
            setNextStates(nextStates.map((probaState) => probaState.state));
            setGameState(GameState.SELECTING_NEXT_STATE);
        }
    }
    function onNextStateSelected(nextState: CraftState) {
        setCraftState(nextState);
        setGameState(GameState.PLAYABLE);
        setNextStates(undefined);
    }
    function onResetButtonClick() {
        if (validateConfiguration(craftConfig)) {
            setCraftState(initial_state(craftConfig));
            setGameState(GameState.PLAYABLE);
            setNextStates(undefined);
        } else {
            alert(t("InvalidParameters"))
        }
    }

    let aiAdvice;
    if (gameState === GameState.PLAYABLE && craftState.result === "ONGOING") {
        aiAdvice = search_best_move(craftConfig.params, craftState);
    };

    const action_buttons = craftActions.map((action) => {
        let disabled;
        let variant;
        if (action === aiAdvice) {
            disabled = false;
            variant = "success";
        } else if (possible_actions.some((possible_action) => possible_action == action)) {
            disabled = false;
            variant = "primary";
        } else {
            disabled = true;
            variant = "secondary"
        }
        return <Button key={action} variant={variant} disabled={disabled} onClick={onActionButtonClickFactory(action)}>
            {t(action)}
        </Button>
    })
    const button_chunks = [];
    for (let i = 0; i < action_buttons.length; i += 6) {
        button_chunks.push(action_buttons.slice(i, Math.min(i + 6, action_buttons.length)));
    }

    return <div>
        <div className="mt-3">
            <ParameterEditor initialValue={craftConfig} onChange={onConfigChange}/>
        </div>
        <Tabs className="mt-3">
            <Tab eventKey="advice" title={t("Advisor")}>
                <div className="mt-3">
                    <Button variant="primary" onClick={onStartButtonClick}>Start</Button>
                    <GameStateView params={craftConfig.params} state={craftState}/>

                    {gameState === GameState.PLAYABLE ? 
                        <Form>
                            <Form.Group className={"mb-3"}>
                                {button_chunks.map(chunk => {
                                    return <div className="mt-1">
                                        <ButtonGroup>
                                            {chunk}
                                        </ButtonGroup>
                                    </div>
                                })}
                            </Form.Group>
                            <Form.Group className={"mb-3"}>
                                AI: {t(aiAdvice)}
                            </Form.Group>
                        </Form>
                    : gameState === GameState.SELECTING_NEXT_STATE ? 
                        <NextStateSelector options={nextStates} onChange={onNextStateSelected}/>
                    : null}

                    <Button variant="danger" onClick={onResetButtonClick}>Reset</Button>
                </div>
            </Tab>
            <Tab eventKey="macro" title={t("Macro")}>
                <MacroPlanner craftParameter={craftConfig.params} initialQuality={craftConfig.initialQuality} />        
            </Tab>
        </Tabs>

    </div>
}