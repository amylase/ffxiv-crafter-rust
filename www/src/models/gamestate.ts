
const statusConditions = [
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
type StatusCondition = typeof statusConditions[number];

const craftResults = [
    "ONGOING",
    "FAILED",
    "SUCCESS",
]
type CraftResult = typeof craftResults[number];

const craftActions = [
    "BasicSynthesis",
    "BasicTouch",
    "MastersMend",
    "InnerQuiet",
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
    "PatientTouch",
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
]
type CraftAction = typeof craftActions[number];

export interface ItemParameter {
    internal_level: number,
    max_durability: number,
    max_progress: number,
    max_quality: number,
    standard_craftsmanship: number,
    standard_control: number,
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

    prev_action: CraftAction | undefined,
    result: CraftResult,
}