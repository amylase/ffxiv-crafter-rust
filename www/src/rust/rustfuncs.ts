import * as wasm from "ffxiv-crafter-rust";
import { CraftParameter, CraftState, CraftAction, ProbabilisticState } from "../models/gamestate";

export function search_best_move(params: CraftParameter, state: CraftState): CraftAction {
    return JSON.parse(wasm.search_best_move(JSON.stringify(params), JSON.stringify(state)));
}

export function apply_action(params: CraftParameter, state: CraftState, action: CraftAction): ProbabilisticState[] {
    const serialized_states = wasm.apply_action(JSON.stringify(params), JSON.stringify(state), action);
    return JSON.parse(serialized_states);
}

export function play_action(params: CraftParameter, state: CraftState, action: CraftAction): ProbabilisticState[] {
    const serialized_states = wasm.play_action(JSON.stringify(params), JSON.stringify(state), action);
    return JSON.parse(serialized_states);
}

export function available_actions(params: CraftParameter, state: CraftState): CraftAction[] {
    const available_actions_str = wasm.available_actions(JSON.stringify(params), JSON.stringify(state));
    return JSON.parse(available_actions_str);
}

export function plan_macro(params: CraftParameter, initial_quality: number, longer: boolean): CraftAction[] {
    const actions_str = wasm.plan_macro(JSON.stringify(params), BigInt(initial_quality), longer);
    return JSON.parse(actions_str);
}

export function evaluate_macro(params: CraftParameter, actions: CraftAction[], initial_quality: number): MacroMetrics {
    const metrics_str = wasm.evaluate_macro(JSON.stringify(params), JSON.stringify(actions), BigInt(initial_quality));
    return JSON.parse(metrics_str);
}

type MacroMetrics = {
    success_rate: number,
    max_quality_rate: number,
    average_quality: number,
    macro_length: number,
}
