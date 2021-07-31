import * as wasm from "ffxiv-crafter-rust";
import { CraftParameter, CraftState, CraftAction, ProbabilisticState } from "./models/gamestate";

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
