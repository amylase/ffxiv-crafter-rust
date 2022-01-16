
export const statusConditions = [
    "NORMAL",
    "GOOD",
    "EXCELLENT",
    "POOR",
    "CENTRED",
    "PLIANT",
    "STURDY",
    "MALLEABLE",
    "PRIMED",
];
export type StatusCondition = typeof statusConditions[number];

export const craftResults = [
    "ONGOING",
    "FAILED",
    "SUCCESS",
]
export type CraftResult = typeof craftResults[number];

export const craftActions = [
    "BasicSynthesis",
    "BasicTouch",
    "MastersMend",
    "DelicateSynthesis",
    "CarefulSynthesis",
    "Groundwork",
    "Observe",
    "ByregotBlessing",
    "PreparatoryTouch",
    "RapidSynthesis",
    "IntensiveSynthesis",
    "HastyTouch",
    "PreciseTouch",
    "TrickOfTheTrade",
    "Innovation",
    "Veneration",
    "MuscleMemory",
    "FocusedSynthesis",
    "StandardTouch",
    "FocusedTouch",
    "Reflect",
    "WasteNot",
    "WasteNotII",
    "PrudentTouch",
    "GreatStrides",
    "FinalAppraisal",
    "Manipulation",
    "AdvancedTouch",
    "PrudentSynthesis",
    "TrainedFinesse",
]
export type CraftAction = typeof craftActions[number];

export interface ItemParameter {
    internal_level: number,
    max_durability: number,
    max_progress: number,
    max_quality: number,
    is_expert_recipe: boolean,
}

export interface PlayerParameter {
    raw_level: number,
    craftsmanship: number,
    control: number,
    max_cp: number,
}

export interface CraftParameter {
    player: PlayerParameter,
    item: ItemParameter,
}

export interface CraftConfiguration {
    params: CraftParameter
    initialQuality: number
}

export interface CraftState {
    durability: number,
    progress: number,
    quality: number,
    cp: number,
    condition: StatusCondition,

    inner_quiet: number,
    innovation: number,
    veneration: number,
    muscle_memory: number,
    waste_not: number,
    great_strides: number,
    final_appraisal: number,
    manipulation: number,
    turn: number,

    prev_action?: CraftAction,
    result: CraftResult,
}

export interface ProbabilisticState {
    state: CraftState,
    probability: number,
}

export function initial_state(config: CraftConfiguration): CraftState {
    const { params, initialQuality } = config;
    return {
        durability: params.item.max_durability,
        progress: 0,
        quality: initialQuality,
        cp: params.player.max_cp,
        condition: "NORMAL",

        inner_quiet: 0,
        innovation: 0,
        veneration: 0,
        muscle_memory: 0,
        waste_not: 0,
        great_strides: 0,
        final_appraisal: 0,
        manipulation: 0,
        turn: 1,

        result: "ONGOING",
    };
}
