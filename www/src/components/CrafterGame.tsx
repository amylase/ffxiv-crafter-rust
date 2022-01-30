import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useLanguage } from '../hooks/useLanguage';
import { CraftAction, craftActions, CraftConfiguration, CraftParameter, craftResults, CraftState, initial_state } from '../models/gamestate';
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

function getInitialConfig(): CraftConfiguration {
    const itemParams = {
        recipe_level: 516,
        max_durability: 55,
        max_progress: 5059,
        max_quality: 15474,
    };
    const playerParams = {
        job_level: 80,
        craftsmanship: 2978,
        control: 2787,
        max_cp: 655,
    };
    const craftParameter = {
        player: playerParams,
        item: itemParams,
    };
    return {
        params: craftParameter,
        initialQuality: 0
    }
}

export function CrafterGame() {
    const [ craftConfig, setCraftConfig ] = useState<CraftConfiguration>(getInitialConfig());
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
        setCraftState(initial_state(craftConfig));
        setGameState(GameState.PLAYABLE);
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
        setCraftState(initial_state(craftConfig));
        setGameState(GameState.PLAYABLE);
        setNextStates(undefined);
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

    return <div>
        <ParameterEditor config={craftConfig} onChange={onConfigChange}/>
        <Button variant="primary" onClick={onStartButtonClick}>Start</Button>
        <GameStateView params={craftConfig.params} state={craftState}/>

        {gameState === GameState.PLAYABLE ? 
            <Form>
                <Form.Group className={"mb-3"}>
                    <ButtonGroup>
                        {action_buttons}
                    </ButtonGroup>
                </Form.Group>
                <Form.Group className={"mb-3"}>
                    AI: {t(aiAdvice)}
                </Form.Group>
            </Form>
        : gameState === GameState.SELECTING_NEXT_STATE ? 
            <NextStateSelector options={nextStates} onChange={onNextStateSelected}/>
        : null}

        <Button variant="danger" onClick={onResetButtonClick}>Reset</Button>
        <MacroPlanner craftParameter={craftConfig.params} initialQuality={craftConfig.initialQuality} />
    </div>
}