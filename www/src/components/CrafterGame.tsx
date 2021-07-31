import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useLanguage } from '../hooks/useLanguage';
import { CraftAction, craftActions, CraftParameter, craftResults, CraftState, initial_state } from '../models/gamestate';
import { available_actions, search_best_move, play_action } from '../rustfuncs';
import { translationProvider } from '../translation';
import { GameStateView } from './GameStateView';
import { NextStateSelector } from './NextStateSelector';


enum GameState {
    PLAYABLE,
    SELECTING_NEXT_STATE,
}

interface Props {
    params: CraftParameter
}

export function CrafterGame(props: Props) {
    const { params } = props;
    const [ craftState, setCraftState ] = useState(initial_state(params));
    const [ gameState, setGameState ] = useState(GameState.PLAYABLE);
    const [ nextStates, setNextStates] = useState(undefined);
    const [ language, setLanguage ] = useLanguage();
    const t = translationProvider(language);

    const possible_actions = available_actions(craftState);
    function onActionButtonClickFactory(action: CraftAction) {
        return function() {
            const nextStates = play_action(params, craftState, action);
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
        setCraftState(initial_state(params));
        setGameState(GameState.PLAYABLE);
        setNextStates(undefined);
    }

    let aiAdvice;
    if (gameState === GameState.PLAYABLE && craftState.result === "ONGOING") {
        aiAdvice = search_best_move(params, craftState, 3);
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

    return <Form>
        <GameStateView params={params} state={craftState}/>
        {gameState === GameState.PLAYABLE ? 
            <>
                <Form.Group className={"mb-3"}>
                    <ButtonGroup>
                        {action_buttons}
                    </ButtonGroup>
                </Form.Group>
                <Form.Group className={"mb-3"}>
                    AI: {t(aiAdvice)}
                </Form.Group>
            </>
        : gameState === GameState.SELECTING_NEXT_STATE ? 
            <NextStateSelector options={nextStates} onChange={onNextStateSelected}/>
        : null}

        <Button variant="danger" onClick={onResetButtonClick}>Reset</Button>
    </Form>
}