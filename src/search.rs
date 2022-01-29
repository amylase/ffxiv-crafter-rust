use std::collections::HashMap;

use wasm_timer::Instant;

use crate::state::{CraftParameter, CraftState, CraftResult, StatusCondition};
use crate::action::{CraftAction, buff_turns, ProbabilisticResult, ProbabilisticState};
use crate::action::CraftAction::{BasicSynthesis, BasicTouch, MastersMend, Manipulation, Veneration, StandardTouch, Observe, FocusedTouch, Innovation, RapidSynthesis, ByregotBlessing, PreparatoryTouch, HastyTouch, PreciseTouch, GreatStrides, PrudentTouch, FinalAppraisal, WasteNot, WasteNotII, AdvancedTouch, TrainedFinesse};

#[derive(PartialOrd, PartialEq, Debug, Clone)]
pub struct DFSResult {
    pub best_score: f64,
    pub best_action_path: Vec<CraftAction>,
}


pub fn terminal_score(params: &CraftParameter, state: &CraftState) -> f64 {
    if state.result != CraftResult::SUCCESS {
        0.
    } else {
        (state.quality as f64) / (params.item.max_quality as f64)
    }
}

fn is_positive_durability_after_action(params: &CraftParameter, state: &CraftState, action: CraftAction) -> bool {
    action.apply(params, &state).iter().all(|proba_state| proba_state.state.durability > 0)
}

pub fn playout(params: &CraftParameter, state: &CraftState) -> CraftState {
    let mut state = state.clone();
    while state.result == CraftResult::ONGOING {
        let synthesis_playable = is_positive_durability_after_action(params, &state, BasicSynthesis);
        let touch_playable = BasicTouch.is_playable(&params, &state) && is_positive_durability_after_action(params, &state, BasicTouch);
        let mend_playable = MastersMend.is_playable(&params, &state);
        let action: CraftAction;
        if !(synthesis_playable || touch_playable || mend_playable) {
            action = CraftAction::all_actions().into_iter().filter(|action| action.is_playable(&params, &state)).next().unwrap();
        } else if !(synthesis_playable || touch_playable) {
            action = MastersMend
        } else if state.cp > 200 && state.manipulation == 0 {
            action = Manipulation
        } else {
            let calc_synthesis_progress = |state: &CraftState| {
                BasicSynthesis.play(params, &state).get(0).unwrap().state.progress
            };
            let synthesis_progress = calc_synthesis_progress(&state);
            if synthesis_playable && state.progress < synthesis_progress && synthesis_progress < params.item.max_progress {
                let mut veneration_state = state.clone();
                veneration_state.veneration = 1;
                let veneration_progress = calc_synthesis_progress(&veneration_state);
                if state.cp >= 18 && state.veneration == 0 && state.progress < veneration_progress && veneration_progress < params.item.max_progress {
                    action = Veneration;
                } else {
                    action = BasicSynthesis;
                }
            } else if touch_playable {
                if state.inner_quiet == 10 && state.cp < 24 + 32 + 18 + 18 && state.innovation == 0 && state.cp >= 24 + 32 + 18 {
                    action = Innovation
                } else if state.inner_quiet == 10 && state.cp < 24 + 32 + 18 && state.great_strides == 0 && state.cp >= 24 + 32 {
                    action = GreatStrides
                } else if state.inner_quiet == 10 && state.cp < 24 + 18 && state.cp >= 24 {
                    action = ByregotBlessing
                } else if state.prev_action.is_some() && state.prev_action.unwrap() == BasicTouch {
                    action = StandardTouch;
                } else if state.prev_action.is_some() && state.prev_action.unwrap() == StandardTouch {
                    action = AdvancedTouch;
                } else if state.prev_action.is_some() && state.prev_action.unwrap() == Observe {
                    action = FocusedTouch;
                } else if state.cp >= 18 * 3 && state.innovation == 0 {
                    action = Innovation;
                } else {
                    action = BasicTouch;
                }
            } else {
                action = BasicSynthesis;
            }
        }

        state = action.play(params, &state).get(0).unwrap().state.clone();
        state.condition = StatusCondition::NORMAL;
    }
    return state
}

fn is_completable(params: &CraftParameter, state: &CraftState) -> bool {
    let mut state = state.clone();
    state.final_appraisal = 0;
    RapidSynthesis.play(params, &state).iter().any(|proba_state| proba_state.state.result == CraftResult::SUCCESS)
}

fn is_quality_action(action: &CraftAction) -> bool {
    match action {
        BasicTouch | ByregotBlessing | PreparatoryTouch | AdvancedTouch | TrainedFinesse |
        HastyTouch | PreciseTouch | Innovation | StandardTouch | FocusedTouch | GreatStrides |
        PrudentTouch => true,
        _ => false
    }
}

fn is_meaningful_action(params: &CraftParameter, state: &CraftState, action: &CraftAction) -> bool {
    if is_quality_action(action) {
        return state.quality < params.item.max_quality
    }
    match action {
        FinalAppraisal => state.final_appraisal <= 0,
        BasicTouch => state.prev_action != Some(BasicTouch) && state.prev_action != Some(StandardTouch),
        StandardTouch => state.prev_action != Some(StandardTouch),
        RapidSynthesis => RapidSynthesis.play(params, state).iter().all(|proba_state| proba_state.state.progress < params.item.max_progress),
        Veneration => buff_turns(state, 4) > state.veneration,
        Innovation => buff_turns(state, 4) > state.innovation,
        Manipulation => buff_turns(state, 8) > state.manipulation,
        WasteNot => buff_turns(state, 4) > state.waste_not,
        WasteNotII => buff_turns(state, 8) > state.waste_not,
        MastersMend => state.durability < params.item.max_durability,
        _ => true
    }
}

pub fn adaptive_dfs(params: &CraftParameter, state: &CraftState) -> DFSResult {
    let max_depth = 10;
    for depth in 3..max_depth {
        let time = Instant::now();
        let result = dfs(params, state, depth);
        let elapsed = time.elapsed().as_secs_f64();
        if elapsed >= 0.3 {
            return result;
        } 
    }
    dfs(params, state, max_depth)
}

pub fn dfs(params: &CraftParameter, state: &CraftState, depth: i64) -> DFSResult {
    let mut memo: HashMap<CraftState, DFSResult> = HashMap::new();
    _dfs(params, state, depth, &mut memo)
}

fn _dfs(params: &CraftParameter, state: &CraftState, depth: i64, memo: &mut HashMap<CraftState, DFSResult>) -> DFSResult {
    if memo.contains_key(state) {
        return memo.get(state).unwrap().clone()
    }
    if state.result != CraftResult::ONGOING {
        let result =  DFSResult {
            best_score: terminal_score(params, state),
            best_action_path: vec![]
        };
        memo.insert(state.clone(), result.clone());
        return result
    }
    if depth == 0 {
        let terminal_state = playout(params, state);
        let result = DFSResult {
            best_score: terminal_score(params, &terminal_state),
            best_action_path: vec![]
        };
        memo.insert(state.clone(), result.clone());
        return result
    }
    let is_completable_state = is_completable(params, state);
    let actions: Vec<CraftAction> = CraftAction::all_actions().into_iter()
        .filter(|action| action.is_playable(params, state))
        .filter(|action| is_completable_state || !is_quality_action(action))
        .collect();

    let mut results: Vec<DFSResult> = vec![];
    let mut best_score = 0.;
    for action in actions {
        if !is_meaningful_action(params, state, &action) {
            continue
        }
        let next_states = action.play(params, state);
        let mut next_search_states: ProbabilisticResult;
        if action != Observe {
            let next_condition = if action == CraftAction::FinalAppraisal {
                state.condition 
            } else if state.condition == StatusCondition::EXCELLENT {
                StatusCondition::POOR
            } else {
                StatusCondition::NORMAL 
            };
            let next_normal_states: Vec<&ProbabilisticState> = next_states.iter()
                .filter(|proba_state| proba_state.state.condition == next_condition)
                .filter(|proba_state| proba_state.state.result == CraftResult::ONGOING)
                .collect();
            let next_terminal_states: Vec<&ProbabilisticState> = next_states.iter()
                .filter(|proba_state| proba_state.state.result != CraftResult::ONGOING)
                .collect();
            let terminal_proba: f64 = next_terminal_states.iter().map(|proba_state| proba_state.probability).sum();
            let ongoing_proba = 1. - terminal_proba;
            let normal_proba: f64 = next_normal_states.iter().map(|proba_state| proba_state.probability).sum();
            next_search_states = next_normal_states.iter()
                .map(|proba_state| ProbabilisticState { state: proba_state.state.clone(), probability: proba_state.probability * ongoing_proba / normal_proba })
                .collect();
            for next_terminal_state in next_terminal_states {
                next_search_states.push(next_terminal_state.clone());
            }
        } else {
            next_search_states = next_states.clone();
        }
        let mut score = 0.;
        let mut upper_bound = 1.;
        let mut sub_results: Vec<DFSResult> = vec![];
        for proba_state in next_search_states {
            let next_depth =  depth - 1;
            let sub_result = _dfs(params, &proba_state.state, next_depth, memo);
            score += sub_result.best_score * proba_state.probability;
            upper_bound -= (1. - sub_result.best_score) * proba_state.probability;
            sub_results.push(sub_result);
            if upper_bound < best_score {
                break;
            }
        }
        let sub_result = sub_results.into_iter().next().unwrap();
        let mut extended_path = vec![action];
        extended_path.extend(sub_result.best_action_path.into_iter());
        let updated_sub_result = DFSResult {
            best_score: score,
            best_action_path: extended_path
        };
        results.push(updated_sub_result);
        best_score = f64::max(best_score, score);
    }

    let result = results.into_iter().filter(|dfs_result| dfs_result.best_score == best_score).next().unwrap();
    memo.insert(state.clone(), result.clone());
    return result
}