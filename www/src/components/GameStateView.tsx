import React from 'react';
import {CraftParameter, CraftState} from '../models/gamestate'

interface Props {
    params: CraftParameter,
    state: CraftState
}

export function GameStateView(props: Props) {
    const { params, state } = props; 
    const buffs = ["inner_quiet", "innovation", "veneration", "muscle_memory", "waste_not", "great_strides", "final_appraisal", "manipulation"];
    let buffStatuses = [];
    for (const buffName of buffs) {
        if (state[buffName] > 0) {
            buffStatuses.push(`${buffName}: ${state[buffName]}`);
        }
    }

    return <div>
        <p>
            durability: {state.durability} / {params.item.max_durability}
        </p>
        <p>
            progress: {state.progress} / {params.item.max_progress}
        </p>
        <p>
            quality: {state.quality} / {params.item.max_quality}
        </p>
        <p>
            cp: {state.cp} / {params.player.max_cp}
        </p>
        <p>
            {buffStatuses.join(", ")}
        </p>
        <p>
            condition: {state.condition}
        </p>
    </div>
}