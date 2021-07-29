import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CraftAction, craftActions, CraftParameter, craftResults, CraftState, initial_state } from '../models/gamestate';
import { available_actions, search_best_move, play_action } from '../rustfuncs';
import { GameStateView } from './GameStateView';

interface Props {
    params: CraftParameter
}

export function CrafterGame(props: Props) {
    const { params } = props;
    const [craftState, setCraftState] = useState(initial_state(params));
    const [aiAdviceEnabled, setAiAdviceEnabled] = useState(false);

    const possible_actions = available_actions(craftState);
    function onActionButtonClickFactory(action: CraftAction) {
        return function() {
            const rand = Math.random();
            const nextStates = play_action(params, craftState, action);
            let accumulate = 0.;
            let sampledState;
            for (const nextState of nextStates) {
                accumulate += nextState.probability;
                if (rand <= accumulate) {
                    sampledState = nextState.state;
                    break;
                }
            }
            setCraftState(sampledState);
        }
    }
    function onResetButtonClick() {
        setCraftState(initial_state(params));
    }

    let aiAdvice;
    if (aiAdviceEnabled && craftState.result === "ONGOING") {
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
            {action}
        </Button>
    })

    function onAiAdviceCheckChange(event) {
        setAiAdviceEnabled(event.target.value);
    }

    return <Form>
        <GameStateView params={params} state={craftState}/>
        <Form.Group className={"mb-3"}>
            {action_buttons}
        </Form.Group>

        <Form.Group className={"mb-3"}>
            <Form.Check type="checkbox" label="Enable AI Advice" onChange={onAiAdviceCheckChange}/>
        </Form.Group>
        
        {aiAdviceEnabled ? 
        <Form.Group className={"mb-3"}>
            AI Advice: {aiAdvice}
        </Form.Group>
        : null }

        <Button variant="danger" onClick={onResetButtonClick}>Reset</Button>
    </Form>
}