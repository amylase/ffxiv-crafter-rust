use rustc_hash::FxHashMap as HashMap;

use wasm_timer::Instant;

use crate::state::{CraftParameter, CraftState, CraftResult, StatusCondition};
use crate::action::{CraftAction, buff_turns, ProbabilisticResult, ProbabilisticState};
use crate::action::CraftAction::{BasicSynthesis, BasicTouch, MastersMend, Manipulation, Veneration, StandardTouch, Observe, Innovation, RapidSynthesis, ByregotBlessing, PreparatoryTouch, HastyTouch, PreciseTouch, GreatStrides, PrudentTouch, FinalAppraisal, WasteNot, WasteNotII, AdvancedTouch, TrainedFinesse};

#[derive(PartialOrd, PartialEq, Debug, Clone)]
pub struct DFSResult {
    pub best_score: f64,
    pub best_action_path: Vec<CraftAction>,
}


pub fn terminal_score(params: &CraftParameter, state: &CraftState) -> f64 {
    if state.result != CraftResult::SUCCESS {
        0.
    } else {
        let quality_ratio = (state.quality as f64) / (params.item.max_quality as f64);
        let turns_bonus = (1. / (state.turn as f64 + 1.)) / (params.item.max_quality as f64);
        return quality_ratio + turns_bonus;
    }
}

fn is_positive_durability_after_action(state: &CraftState, action: CraftAction) -> bool {
    state.durability - action.durability_cost(state) > 0
}

pub fn playout(params: &CraftParameter, state: &CraftState) -> CraftState {
    let mut state = state.clone();
    while state.result == CraftResult::ONGOING {
        let synthesis_playable = is_positive_durability_after_action(&state, BasicSynthesis);
        let touch_playable = BasicTouch.is_playable(&params, &state) && is_positive_durability_after_action(&state, BasicTouch);
        let mend_playable = MastersMend.is_playable(&params, &state);
        let action: CraftAction;
        if !(synthesis_playable || touch_playable || mend_playable) {
            action = *CraftAction::all_actions_slice().iter().filter(|action| action.is_playable(&params, &state)).next().unwrap();
        } else if !(synthesis_playable || touch_playable) {
            action = MastersMend
        } else if state.cp > 200 && state.manipulation == 0 {
            action = Manipulation
        } else {
            let calc_synthesis_progress = |state: &CraftState| {
                BasicSynthesis.apply(params, &state).get(0).unwrap().state.progress
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
        HastyTouch | PreciseTouch | Innovation | StandardTouch | GreatStrides |
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
    let mut memo: Memo = Memo::default();
    let (best_score, _) = _dfs(params, state, depth, &mut memo);
    DFSResult {
        best_score,
        best_action_path: best_action_path(params, state, &memo),
    }
}

/// Maps a state to its score and the action achieving it. The depth is
/// deliberately not part of the key: scores from shallower evaluations of the
/// same state are reused as an approximation, which is what keeps the search
/// tractable.
type Memo = HashMap<CraftState, (f64, Option<CraftAction>)>;

/// Distribution the search recurses into after playing `action`. Non terminal
/// states other than the expected next condition are folded into it, so that the
/// search does not branch on the status condition.
fn next_search_states(params: &CraftParameter, state: &CraftState, action: CraftAction) -> ProbabilisticResult {
    let next_states = action.play(params, state);
    if action == Observe {
        return next_states;
    }
    let next_condition = if action == FinalAppraisal {
        state.condition
    } else if state.condition == StatusCondition::EXCELLENT {
        StatusCondition::POOR
    } else {
        StatusCondition::NORMAL
    };
    let is_expected_ongoing = |proba_state: &ProbabilisticState| {
        proba_state.state.result == CraftResult::ONGOING && proba_state.state.condition == next_condition
    };
    let terminal_proba: f64 = next_states.iter()
        .filter(|proba_state| proba_state.state.result != CraftResult::ONGOING)
        .map(|proba_state| proba_state.probability).sum();
    let ongoing_proba = 1. - terminal_proba;
    let normal_proba: f64 = next_states.iter().filter(|p| is_expected_ongoing(p)).map(|p| p.probability).sum();

    let mut result = ProbabilisticResult::new();
    for proba_state in next_states.iter().filter(|p| is_expected_ongoing(p)) {
        result.push(ProbabilisticState {
            state: proba_state.state.clone(),
            probability: proba_state.probability * ongoing_proba / normal_proba,
        });
    }
    for proba_state in next_states.iter().filter(|p| p.state.result != CraftResult::ONGOING) {
        result.push(proba_state.clone());
    }
    result
}

/// Rebuilds the principal variation by following the memoized best actions along
/// the first successor of each node.
fn best_action_path(params: &CraftParameter, state: &CraftState, memo: &Memo) -> Vec<CraftAction> {
    let mut path = vec![];
    let mut state = state.clone();
    while let Some(&(_, Some(action))) = memo.get(&state) {
        path.push(action);
        match next_search_states(params, &state, action).into_iter().next() {
            Some(proba_state) => state = proba_state.state,
            None => break,
        }
    }
    path
}

fn _dfs(params: &CraftParameter, state: &CraftState, depth: i64, memo: &mut Memo) -> (f64, Option<CraftAction>) {
    if let Some(&entry) = memo.get(state) {
        return entry;
    }
    if state.result != CraftResult::ONGOING {
        let result = (terminal_score(params, state), None);
        memo.insert(state.clone(), result);
        return result;
    }
    if depth == 0 {
        let terminal_state = playout(params, state);
        let result = (terminal_score(params, &terminal_state), None);
        memo.insert(state.clone(), result);
        return result;
    }
    let is_completable_state = is_completable(params, state);

    let mut best_score = 0.;
    let mut best_action = None;
    for action in CraftAction::all_actions_slice().iter().copied() {
        if !action.is_playable(params, state) {
            continue
        }
        if !is_completable_state && is_quality_action(&action) {
            continue
        }
        if !is_meaningful_action(params, state, &action) {
            continue
        }
        let mut score = 0.;
        let mut upper_bound = 1.;
        for proba_state in next_search_states(params, state, action) {
            let (sub_score, _) = _dfs(params, &proba_state.state, depth - 1, memo);
            score += sub_score * proba_state.probability;
            upper_bound -= (1. - sub_score) * proba_state.probability;
            if upper_bound < best_score {
                break;
            }
        }
        if best_action.is_none() || score > best_score {
            best_score = f64::max(best_score, score);
            best_action = Some(action);
        }
    }

    let result = (best_score, best_action);
    memo.insert(state.clone(), result);
    result
}
