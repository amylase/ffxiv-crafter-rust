import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import {CraftParameter, CraftState} from '../models/gamestate'
import { translationProvider } from '../translation';

interface Props {
    params: CraftParameter,
    state: CraftState
}

export function GameStateView(props: Props) {
    const { params, state } = props; 
    const [ language, setLanguage ] = useLanguage();
    const t = translationProvider(language);

    const buffs = ["inner_quiet", "innovation", "veneration", "muscle_memory", "waste_not", "great_strides", "final_appraisal", "manipulation"];
    let buffStatuses = [];
    for (const buffName of buffs) {
        if (state[buffName] > 0) {
            buffStatuses.push(`${t(buffName)}: ${state[buffName]}`);
        }
    }

    return <div>
        <p>
            {t("durability")}: {state.durability} / {params.item.max_durability}
        </p>
        <p>
            {t("progress")}: {state.progress} / {params.item.max_progress}
        </p>
        <p>
            {t("quality")}: {state.quality} / {params.item.max_quality}
        </p>
        <p>
            {t("cp")}: {state.cp} / {params.player.max_cp}
        </p>
        <p>
            {buffStatuses.join(", ")}
        </p>
        <p>
            {t("condition")}: {t(state.condition)}
        </p>
    </div>
}