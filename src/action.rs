use serde::{Deserialize, Serialize};
use crate::state::{CraftParameter, CraftResult, CraftState, StatusCondition};
use crate::factor::{transition_probabilities, progress_div, crafting_level, progress_mod, quality_div, quality_mod};
use strum_macros::{EnumString, AsRefStr};

#[derive(PartialEq, Eq, PartialOrd, Ord, Copy, Clone, Hash, Debug, Deserialize, Serialize, EnumString, AsRefStr)]
pub enum CraftAction {
    BasicSynthesis,
    BasicTouch,
    MastersMend,
    DelicateSynthesis,
    CarefulSynthesis,
    Groundwork,
    Observe,
    ByregotBlessing,
    PreparatoryTouch,
    RapidSynthesis,
    IntensiveSynthesis,
    HastyTouch,
    PreciseTouch,
    TrickOfTheTrade,
    Innovation,
    Veneration,
    MuscleMemory,
    FocusedSynthesis,
    StandardTouch,
    FocusedTouch,
    Reflect,
    WasteNot,
    WasteNotII,
    PrudentTouch,
    GreatStrides,
    FinalAppraisal,
    Manipulation,
    AdvancedTouch,
    PrudentSynthesis,
    TrainedFinesse,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ProbabilisticState {
    pub state: CraftState,
    pub probability: f64,
}

pub type ProbabilisticResult = Vec<ProbabilisticState>;

fn deterministic(state: CraftState) -> ProbabilisticResult {
    vec![ProbabilisticState {
        probability: 1.,
        state,
    }]
}

fn tick(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    debug_assert!(state.result == CraftResult::ONGOING);
    debug_assert!(state.cp >= 0);

    let mut state = state.clone();
    state.clip(params);

    if state.prev_action.is_some() && state.prev_action.unwrap() == CraftAction::FinalAppraisal {
        return deterministic(state);
    }

    if state.progress >= params.item.max_progress {
        if state.final_appraisal <= 0 {
            state.result = CraftResult::SUCCESS;
            return deterministic(state);
        } else {
            state.final_appraisal = 0;
            state.progress = params.item.max_progress - 1;
        }
    }

    if state.durability <= 0 {
        state.result = CraftResult::FAILED;
        return deterministic(state);
    }

    state.innovation -= 1;
    state.veneration -= 1;
    state.muscle_memory -= 1;
    state.waste_not -= 1;
    state.great_strides -= 1;
    state.final_appraisal -= 1;
    if state.manipulation > 0 && (state.prev_action.is_none() || state.prev_action.unwrap() != CraftAction::Manipulation) {
        state.durability += 5;
    }
    state.manipulation -= 1;
    state.turn += 1;
    state.clip(params);

    let mut result = vec![];
    let mut condition_probas: Vec<(StatusCondition, f64)> = transition_probabilities(params, &state).into_iter().collect();
    condition_probas.sort_by_key(|&(sc, _p)| sc);
    for &(status_condition, probability) in condition_probas.iter() {
        let mut next_state = state.clone();
        next_state.condition = status_condition;
        result.push(ProbabilisticState {
            probability,
            state: next_state,
        });
    }
    result
}

// https://docs.google.com/document/d/1Fl5X16oPF-4X29v5PukCkVgcPhZsbzhKcoq6Us7fhKU/edit#
fn produce_progress(params: &CraftParameter, state: &mut CraftState, base_efficiency: f64) {
    let crafting_level = crafting_level(params.player.job_level);
    let recipe_level = params.item.recipe_level;
    let p1 = params.player.craftsmanship as f64 * 10. / progress_div(recipe_level) as f64 + 2.;
    let penalty = if crafting_level < recipe_level { progress_mod(recipe_level) as f64 / 100. } else { 1. };
    let p2 = p1 * penalty;
    let condition = if state.condition == StatusCondition::MALLEABLE { 1.5 } else { 1. };
    let mut buffs = 1.;
    if state.veneration > 0 {
        buffs += 0.5
    }
    if state.muscle_memory > 0 {
        buffs += 1.;
    }
    let efficiency = base_efficiency * buffs;
    let progress = ((p2 as i64) as f64 * condition * efficiency / 100.) as i64;

    state.progress += progress;
    state.muscle_memory = 0;
}

fn produce_quality(params: &CraftParameter, state: &mut CraftState, base_efficiency: f64, inner_quiet_progress: i64) {
    let crafting_level = crafting_level(params.player.job_level);
    let recipe_level = params.item.recipe_level;
    let q1 = params.player.control as f64 * 10. / quality_div(recipe_level) as f64 + 35.;
    let penalty = if crafting_level < recipe_level { quality_mod(recipe_level) as f64 / 100. } else { 1. };
    let q2 = q1 * penalty;
    let condition = if state.condition == StatusCondition::POOR {
        0.5
    } else if state.condition == StatusCondition::GOOD {
        1.5
    } else if state.condition == StatusCondition::EXCELLENT {
        4.
    } else {
        1.
    };
    let mut buffs: f64 = 1.;
    if state.innovation > 0 {
        buffs += 0.5;
    }
    if state.great_strides > 0 {
        buffs += 1.;
    }

    let efficiency = base_efficiency * (1. + state.inner_quiet as f64 / 10.) * buffs;
    let quality = ((q2 as i64) as f64 * condition * efficiency / 100.) as i64;

    state.quality += quality as i64;
    state.inner_quiet += inner_quiet_progress;
    if state.great_strides > 0 {
        state.great_strides = 0;
    }
}

pub fn buff_turns(state: &CraftState, base_turn: i64) -> i64 {
    if state.condition == StatusCondition::PRIMED {
        base_turn + 2
    } else {
        base_turn
    }
}

fn binary_result_states(success_result: CraftState, failed_result: CraftState, current_state: &CraftState, base_success_proba: f64) -> ProbabilisticResult {
    let success_proba = base_success_proba + if current_state.condition == StatusCondition::CENTRED { 0.25 } else { 0. };
    return vec![
        ProbabilisticState { probability: success_proba, state: success_result },
        ProbabilisticState { probability: 1. - success_proba, state: failed_result }
    ];
}

fn apply_basic_synthesis(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    let efficiency = if params.player.job_level >= 31 { 120. } else { 100. };
    produce_progress(params, &mut next_state, efficiency);
    deterministic(next_state)
}

fn apply_basic_touch(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_quality(params, &mut next_state, 100., 1);
    deterministic(next_state)
}

fn apply_masters_mend(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.durability += 30;
    deterministic(next_state)
}

fn apply_delicate_synthesis(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_progress(params, &mut next_state, 100.);
    produce_quality(params, &mut next_state, 100., 1);
    deterministic(next_state)
}

fn apply_careful_synthesis(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    let efficiency = if params.player.job_level >= 82 { 180. } else { 150. };
    produce_progress(params, &mut next_state, efficiency);
    deterministic(next_state)
}

fn apply_groundwork(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    let base_efficiency = if params.player.job_level >= 86 { 360. } else { 300. };
    let efficiency = if state.durability < 0 { base_efficiency / 2. } else { base_efficiency };
    produce_progress(params, &mut next_state, efficiency);
    deterministic(next_state)
}

fn apply_observe(state: &CraftState) -> ProbabilisticResult {
    deterministic(state.clone())
}

fn apply_byregot_blessing(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    let efficiency = 20. * state.inner_quiet as f64 + 100.;
    produce_quality(params, &mut next_state, efficiency, 0);
    next_state.inner_quiet = 0;
    deterministic(next_state)
}

fn apply_preparatory_touch(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_quality(params, &mut next_state, 200., 2);
    deterministic(next_state)
}

fn apply_rapid_synthesis(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let failed_state = state.clone();
    let mut success_state = state.clone();
    let efficiency = if params.player.job_level >= 63 { 500. } else { 250. };  // todo: check if this number is correct
    produce_progress(params, &mut success_state, efficiency);
    binary_result_states(success_state, failed_state, state, 0.5)
}

fn apply_intensive_synthesis(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_progress(params, &mut next_state, 400.);
    return deterministic(next_state);
}

fn apply_hasty_touch(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let failed_state = state.clone();
    let mut success_state = state.clone();
    produce_quality(params, &mut success_state, 100., 1);
    return binary_result_states(success_state, failed_state, state, 0.6);
}

fn apply_precise_touch(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_quality(params, &mut next_state, 150., 2);
    deterministic(next_state)
}

fn apply_tricks_of_the_trade(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.cp += 20;
    deterministic(next_state)
}

fn apply_innovation(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.innovation = buff_turns(state, 4) + 1;
    deterministic(next_state)
}

fn apply_veneration(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.veneration = buff_turns(state, 4) + 1;
    deterministic(next_state)
}

fn apply_muscle_memory(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_progress(params, &mut next_state, 300.);
    next_state.muscle_memory = buff_turns(state, 5) + 1;
    deterministic(next_state)
}

fn apply_focused_synthesis(params: &CraftParameter, state: &CraftState, prev_action: &Option<CraftAction>) -> ProbabilisticResult {
    let mut success_state = state.clone();
    produce_progress(params, &mut success_state, 200.);
    if prev_action == &Some(CraftAction::Observe) {
        deterministic(success_state)
    } else {
        let failed_state = state.clone();
        binary_result_states(success_state, failed_state, state, 0.5)
    }
}

fn apply_standard_touch(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_quality(params, &mut next_state, 125., 1);
    deterministic(next_state)
}

fn apply_focused_touch(params: &CraftParameter, state: &CraftState, prev_action: &Option<CraftAction>) -> ProbabilisticResult {
    let mut success_state = state.clone();
    produce_quality(params, &mut success_state, 150., 1);
    if prev_action == &Some(CraftAction::Observe) {
        deterministic(success_state)
    } else {
        let failed_state = state.clone();
        binary_result_states(success_state, failed_state, state, 0.5)
    }
}

fn apply_reflect(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_quality(params, &mut next_state, 100., 0);
    next_state.inner_quiet = 2;
    deterministic(next_state)
}

fn apply_waste_not(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.waste_not = buff_turns(state, 4) + 1;
    deterministic(next_state)
}

fn apply_waste_not_ii(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.waste_not = buff_turns(state, 8) + 1;
    deterministic(next_state)
}

fn apply_prudent_touch(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_quality(params, &mut next_state, 100., 1);
    deterministic(next_state)
}

fn apply_great_strides(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.great_strides = buff_turns(state, 3) + 1;
    deterministic(next_state)
}

fn apply_final_appraisal(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.final_appraisal = buff_turns(state, 5);
    deterministic(next_state)
}

fn apply_manipulation(state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    next_state.manipulation = buff_turns(state, 8) + 1;
    deterministic(next_state)
}

fn apply_advanced_touch(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_quality(params, &mut next_state, 150., 1);
    deterministic(next_state)
}

fn apply_prudent_synthesis(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_progress(params, &mut next_state, 180.);
    deterministic(next_state)
}

fn apply_trained_finesse(params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
    let mut next_state = state.clone();
    produce_quality(params, &mut next_state, 100., 1);
    deterministic(next_state)
}

impl CraftAction {
    fn base_cp_cost(&self, state: &CraftState) -> i64 {
        match self {
            CraftAction::BasicSynthesis => 0,
            CraftAction::BasicTouch => 18,
            CraftAction::MastersMend => 88,
            CraftAction::DelicateSynthesis => 32,
            CraftAction::CarefulSynthesis => 7,
            CraftAction::Groundwork => 18,
            CraftAction::Observe => 7,
            CraftAction::ByregotBlessing => 24,
            CraftAction::PreparatoryTouch => 40,
            CraftAction::RapidSynthesis => 0,
            CraftAction::IntensiveSynthesis => 6,
            CraftAction::HastyTouch => 0,
            CraftAction::PreciseTouch => 18,
            CraftAction::TrickOfTheTrade => 0,
            CraftAction::Innovation => 18,
            CraftAction::Veneration => 18,
            CraftAction::MuscleMemory => 6,
            CraftAction::FocusedSynthesis => 5,
            CraftAction::StandardTouch => if state.prev_action.is_some() && state.prev_action.unwrap() == CraftAction::BasicTouch { 18 } else { 32 },
            CraftAction::FocusedTouch => 18,
            CraftAction::Reflect => 6,
            CraftAction::WasteNot => 56,
            CraftAction::WasteNotII => 98,
            CraftAction::PrudentTouch => 25,
            CraftAction::GreatStrides => 32,
            CraftAction::FinalAppraisal => 1,
            CraftAction::Manipulation => 96,
            CraftAction::AdvancedTouch => if state.prev_action.is_some() && state.prev_action.unwrap() == CraftAction::StandardTouch { 18 } else { 46 },
            CraftAction::PrudentSynthesis => 18,
            CraftAction::TrainedFinesse => 32,
        }
    }

    fn cp_cost(&self, state: &CraftState) -> i64 {
        let base_cost = self.base_cp_cost(state);
        if state.condition == StatusCondition::PLIANT {
            (base_cost + 1) / 2
        } else {
            base_cost
        }
    }

    fn base_durability_cost(&self) -> i64 {
        match self {
            CraftAction::BasicSynthesis => 10,
            CraftAction::BasicTouch => 10,
            CraftAction::MastersMend => 0,
            CraftAction::DelicateSynthesis => 10,
            CraftAction::CarefulSynthesis => 10,
            CraftAction::Groundwork => 20,
            CraftAction::Observe => 0,
            CraftAction::ByregotBlessing => 10,
            CraftAction::PreparatoryTouch => 20,
            CraftAction::RapidSynthesis => 10,
            CraftAction::IntensiveSynthesis => 10,
            CraftAction::HastyTouch => 10,
            CraftAction::PreciseTouch => 10,
            CraftAction::TrickOfTheTrade => 0,
            CraftAction::Innovation => 0,
            CraftAction::Veneration => 0,
            CraftAction::MuscleMemory => 10,
            CraftAction::FocusedSynthesis => 10,
            CraftAction::StandardTouch => 10,
            CraftAction::FocusedTouch => 10,
            CraftAction::Reflect => 10,
            CraftAction::WasteNot => 0,
            CraftAction::WasteNotII => 0,
            CraftAction::PrudentTouch => 5,
            CraftAction::GreatStrides => 0,
            CraftAction::FinalAppraisal => 0,
            CraftAction::Manipulation => 0,
            CraftAction::AdvancedTouch => 10,
            CraftAction::PrudentSynthesis => 5,
            CraftAction::TrainedFinesse => 0,
        }
    }

    fn durability_cost(&self, state: &CraftState) -> i64 {
        let mut cost = self.base_durability_cost();
        if state.waste_not > 0 {
            cost = (cost + 1) / 2
        }
        if state.condition == StatusCondition::STURDY {
            cost = (cost + 1) / 2
        }
        cost
    }

    fn action_level(&self) -> i64 {
        match self {
            CraftAction::BasicSynthesis => 1,
            CraftAction::BasicTouch => 5,
            CraftAction::MastersMend => 7,
            CraftAction::DelicateSynthesis => 76,
            CraftAction::CarefulSynthesis => 62,
            CraftAction::Groundwork => 72,
            CraftAction::Observe => 13,
            CraftAction::ByregotBlessing => 50,
            CraftAction::PreparatoryTouch => 71,
            CraftAction::RapidSynthesis => 9,
            CraftAction::IntensiveSynthesis => 78,
            CraftAction::HastyTouch => 30,
            CraftAction::PreciseTouch => 53,
            CraftAction::TrickOfTheTrade => 13,
            CraftAction::Innovation => 26,
            CraftAction::Veneration => 15,
            CraftAction::MuscleMemory => 54,
            CraftAction::FocusedSynthesis => 67,
            CraftAction::StandardTouch => 18,
            CraftAction::FocusedTouch => 68,
            CraftAction::Reflect => 69,
            CraftAction::WasteNot => 15,
            CraftAction::WasteNotII => 47,
            CraftAction::PrudentTouch => 66,
            CraftAction::GreatStrides => 21,
            CraftAction::FinalAppraisal => 42,
            CraftAction::Manipulation => 65,
            CraftAction::AdvancedTouch => 84,
            CraftAction::PrudentSynthesis => 88,
            CraftAction::TrainedFinesse => 90,
        }
    }

    pub fn is_playable(&self, params: &CraftParameter, state: &CraftState) -> bool {
        if params.player.job_level < self.action_level() {
            return false;
        }
        if state.result != CraftResult::ONGOING {
            return false;
        }
        if self.cp_cost(state) > state.cp {
            return false;
        }
        match self {
            Self::ByregotBlessing => state.inner_quiet > 0,
            Self::IntensiveSynthesis => state.condition == StatusCondition::GOOD || state.condition == StatusCondition::EXCELLENT,
            Self::PreciseTouch => state.condition == StatusCondition::GOOD || state.condition == StatusCondition::EXCELLENT,
            Self::TrickOfTheTrade => state.condition == StatusCondition::GOOD || state.condition == StatusCondition::EXCELLENT,
            Self::MuscleMemory => state.prev_action.is_none(),
            Self::Reflect => state.prev_action.is_none(),
            Self::PrudentTouch => state.waste_not <= 0,
            Self::PrudentSynthesis => state.waste_not <= 0,
            Self::TrainedFinesse => state.inner_quiet == 10,
            _ => true
        }
    }

    pub fn apply(&self, params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
        let prev_action = state.prev_action;
        let mut state = state.clone();
        state.cp -= self.cp_cost(&state);
        state.durability -= self.durability_cost(&state);
        state.prev_action = Some(*self);

        match self {
            Self::BasicSynthesis => apply_basic_synthesis(params, &state),
            Self::BasicTouch => apply_basic_touch(params, &state),
            Self::MastersMend => apply_masters_mend(&state),
            Self::DelicateSynthesis => apply_delicate_synthesis(params, &state),
            Self::CarefulSynthesis => apply_careful_synthesis(params, &state),
            Self::Groundwork => apply_groundwork(params, &state),
            Self::Observe => apply_observe(&state),
            Self::ByregotBlessing => apply_byregot_blessing(params, &state),
            Self::PreparatoryTouch => apply_preparatory_touch(params, &state),
            Self::RapidSynthesis => apply_rapid_synthesis(params, &state),
            Self::IntensiveSynthesis => apply_intensive_synthesis(params, &state),
            Self::HastyTouch => apply_hasty_touch(params, &state),
            Self::PreciseTouch => apply_precise_touch(params, &state),
            Self::TrickOfTheTrade => apply_tricks_of_the_trade(&state),
            Self::Innovation => apply_innovation(&state),
            Self::Veneration => apply_veneration(&state),
            Self::MuscleMemory => apply_muscle_memory(params, &state),
            Self::FocusedSynthesis => apply_focused_synthesis(params, &state, &prev_action),
            Self::StandardTouch => apply_standard_touch(params, &state),
            Self::FocusedTouch => apply_focused_touch(params, &state, &prev_action),
            Self::Reflect => apply_reflect(params, &state),
            Self::WasteNot => apply_waste_not(&state),
            Self::WasteNotII => apply_waste_not_ii(&state),
            Self::PrudentTouch => apply_prudent_touch(params, &state),
            Self::GreatStrides => apply_great_strides(&state),
            Self::FinalAppraisal => apply_final_appraisal(&state),
            Self::Manipulation => apply_manipulation(&state),
            Self::AdvancedTouch => apply_advanced_touch(params, &state),
            Self::PrudentSynthesis => apply_prudent_synthesis(params, &state),
            Self::TrainedFinesse => apply_trained_finesse(params, &state),
        }
    }

    pub fn play(&self, params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
        let mut result: ProbabilisticResult = vec![];
        for applied_state in self.apply(params, state).iter() {
            for ticked_state in tick(params, &applied_state.state).iter() {
                result.push(ProbabilisticState {
                    probability: ticked_state.probability * applied_state.probability,
                    state: ticked_state.state.clone(),
                })
            }
        }
        result
    }

    pub fn all_actions() -> Vec<CraftAction> {
        vec![
            Self::BasicSynthesis,
            Self::BasicTouch,
            Self::MastersMend,
            Self::DelicateSynthesis,
            Self::CarefulSynthesis,
            Self::Groundwork,
            Self::Observe,
            Self::ByregotBlessing,
            Self::PreparatoryTouch,
            Self::RapidSynthesis,
            Self::IntensiveSynthesis,
            Self::HastyTouch,
            Self::PreciseTouch,
            Self::TrickOfTheTrade,
            Self::Innovation,
            Self::Veneration,
            Self::MuscleMemory,
            Self::FocusedSynthesis,
            Self::StandardTouch,
            Self::FocusedTouch,
            Self::Reflect,
            Self::WasteNot,
            Self::WasteNotII,
            Self::PrudentTouch,
            Self::GreatStrides,
            Self::FinalAppraisal,
            Self::Manipulation,
            Self::AdvancedTouch,
            Self::PrudentSynthesis,
            Self::TrainedFinesse,
        ]
    }
}
