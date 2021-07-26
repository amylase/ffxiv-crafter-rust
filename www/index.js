import * as wasm from "ffxiv-crafter-rust";

let item_params = {
    internal_level: 490,
    max_durability: 55,
    max_progress: 12046,
    max_quality: 81447,
    standard_craftsmanship: 2180,
    standard_control: 2010,
    is_expert_recipe: true,
};
let player_params = {
    raw_level: 80,
    craftsmanship: 2978,
    control: 2787,
    max_cp: 655,
};
let crafter_params = {
    player: player_params,
    item: item_params,
}
let state = {
    durability: item_params.max_durability,
    progress: 0,
    quality: 0,
    cp: player_params.max_cp,
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

    prev_action: "MuscleMemory",
    result: "ONGOING",
};
alert(state)
let best_move = wasm.search_best_move(JSON.stringify(crafter_params), JSON.stringify(state), BigInt(3));
alert(best_move);