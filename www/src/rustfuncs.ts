import * as wasm from "ffxiv-crafter-rust";
import { CraftParameter, CraftState, ItemParameter, PlayerParameter, CraftAction, ProbabilisticState } from "./models/gamestate";

export function search_best_move(params: CraftParameter, state: CraftState, depth: number): CraftAction {
    return JSON.parse(wasm.search_best_move(JSON.stringify(params), JSON.stringify(state), BigInt(depth)));
}

export function apply_action(params: CraftParameter, state: CraftState, action: CraftAction): ProbabilisticState[] {
    const serialized_states = wasm.apply_action(JSON.stringify(params), JSON.stringify(state), action);
    return JSON.parse(serialized_states);
}

export function play_action(params: CraftParameter, state: CraftState, action: CraftAction): ProbabilisticState[] {
    const serialized_states = wasm.play_action(JSON.stringify(params), JSON.stringify(state), action);
    return JSON.parse(serialized_states);
}

export function available_actions(state: CraftState): CraftAction[] {
    const available_actions_str = wasm.available_actions(JSON.stringify(state));
    return JSON.parse(available_actions_str);
}

export function call_wasm() {
    let item_params = {
        internal_level: 490,
        max_durability: 55,
        max_progress: 12046,
        max_quality: 81447,
        standard_craftsmanship: 2180,
        standard_control: 2010,
        is_expert_recipe: true,
    } as ItemParameter;
    let player_params = {
        raw_level: 80,
        craftsmanship: 2978,
        control: 2787,
        max_cp: 655,
    } as PlayerParameter;
    let crafter_params = {
        player: player_params,
        item: item_params,
    } as CraftParameter;
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
    } as CraftState;
    alert(state)
    let best_move = wasm.search_best_move(JSON.stringify(crafter_params), JSON.stringify(state), BigInt(3));
    alert(best_move);
}