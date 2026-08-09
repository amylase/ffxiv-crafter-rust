use serde::{Deserialize, Serialize};
use crate::state::{CraftParameter, CraftResult, CraftState, StatusCondition};
use crate::factor::{transition_probabilities, Factors};
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
    StandardTouch,
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
    RefinedTouch,
    DaringTouch,
    ImmaculateMend,
    TrainedPerfection,
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
    state.advanced_touch_ready = state.standard_touch_ready && (state.prev_action == Some(CraftAction::StandardTouch) || state.prev_action == Some(CraftAction::Observe));
    state.standard_touch_ready = state.prev_action == Some(CraftAction::BasicTouch);

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
    state.expedience -= 1;
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

/// `tick`, specialised to a caller that pins the condition to NORMAL.
///
/// Mirrors `tick` line for line up to the point where `tick` splits into one
/// state per status condition; those states differ only in `condition`, so
/// pinning it here yields the same result without the HashMap, the sort and the
/// per-condition clones.
fn tick_normal(params: &CraftParameter, state: &mut CraftState) {
    debug_assert!(state.result == CraftResult::ONGOING);
    debug_assert!(state.cp >= 0);

    state.clip(params);
    state.advanced_touch_ready = state.standard_touch_ready && (state.prev_action == Some(CraftAction::StandardTouch) || state.prev_action == Some(CraftAction::Observe));
    state.standard_touch_ready = state.prev_action == Some(CraftAction::BasicTouch);
    state.condition = StatusCondition::NORMAL;

    if state.prev_action == Some(CraftAction::FinalAppraisal) {
        return;
    }

    if state.progress >= params.item.max_progress {
        if state.final_appraisal <= 0 {
            state.result = CraftResult::SUCCESS;
            return;
        } else {
            state.final_appraisal = 0;
            state.progress = params.item.max_progress - 1;
        }
    }

    if state.durability <= 0 {
        state.result = CraftResult::FAILED;
        return;
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
    state.expedience -= 1;
    state.turn += 1;
    state.clip(params);
}

// https://docs.google.com/document/d/1Fl5X16oPF-4X29v5PukCkVgcPhZsbzhKcoq6Us7fhKU/edit#
fn produce_progress(factors: &Factors, state: &mut CraftState, base_efficiency: f64) {
    let condition = if state.condition == StatusCondition::MALLEABLE { 1.5 } else { 1. };
    let mut buffs = 1.;
    if state.veneration > 0 {
        buffs += 0.5
    }
    if state.muscle_memory > 0 {
        buffs += 1.;
    }
    let efficiency = base_efficiency * buffs;
    let progress = (factors.progress_base * condition * efficiency / 100.) as i64;

    state.progress += progress;
    state.muscle_memory = 0;
}

fn produce_quality(factors: &Factors, state: &mut CraftState, base_efficiency: f64, inner_quiet_progress: i64) {
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
    let quality = (factors.quality_base * condition * efficiency / 100.) as i64;

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

fn apply_basic_synthesis(params: &CraftParameter, factors: &Factors, state: &mut CraftState) {
    let efficiency = if params.player.job_level >= 31 { 120. } else { 100. };
    produce_progress(factors, state, efficiency);
}

fn apply_basic_touch(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 100., 1);
}

fn apply_masters_mend(state: &mut CraftState) {
    state.durability += 30;
}

fn apply_delicate_synthesis(params: &CraftParameter, factors: &Factors, state: &mut CraftState) {
    let progress_efficiency = if params.player.job_level >= 94 { 150. } else { 100. };
    produce_progress(factors, state, progress_efficiency);
    produce_quality(factors, state, 100., 1);
}

fn apply_careful_synthesis(params: &CraftParameter, factors: &Factors, state: &mut CraftState) {
    let efficiency = if params.player.job_level >= 82 { 180. } else { 150. };
    produce_progress(factors, state, efficiency);
}

fn apply_groundwork(params: &CraftParameter, factors: &Factors, state: &mut CraftState) {
    let base_efficiency = if params.player.job_level >= 86 { 360. } else { 300. };
    let efficiency = if state.durability < 0 { base_efficiency / 2. } else { base_efficiency };
    produce_progress(factors, state, efficiency);
}

fn apply_observe(_state: &mut CraftState) {}

fn apply_byregot_blessing(factors: &Factors, state: &mut CraftState) {
    let efficiency = 20. * state.inner_quiet as f64 + 100.;
    produce_quality(factors, state, efficiency, 0);
    state.inner_quiet = 0;
}

fn apply_preparatory_touch(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 200., 2);
}

fn apply_rapid_synthesis(params: &CraftParameter, factors: &Factors, state: &mut CraftState) {
    let efficiency = if params.player.job_level >= 63 { 500. } else { 250. };  // todo: check if this number is correct
    produce_progress(factors, state, efficiency);
}

fn apply_intensive_synthesis(factors: &Factors, state: &mut CraftState) {
    produce_progress(factors, state, 400.);
}

fn apply_hasty_touch(params: &CraftParameter, factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 100., 1);
    if params.player.job_level >= 96 {
        state.expedience = 1 + 1;
    }
}

fn apply_precise_touch(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 150., 2);
}

fn apply_tricks_of_the_trade(state: &mut CraftState) {
    state.cp += 20;
}

fn apply_innovation(state: &mut CraftState) {
    state.innovation = buff_turns(state, 4) + 1;
}

fn apply_veneration(state: &mut CraftState) {
    state.veneration = buff_turns(state, 4) + 1;
}

fn apply_muscle_memory(factors: &Factors, state: &mut CraftState) {
    let muscle_memory = buff_turns(state, 5) + 1;
    produce_progress(factors, state, 300.);
    state.muscle_memory = muscle_memory;
}

fn apply_standard_touch(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 125., 1);
}

fn apply_reflect(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 300., 0);
    state.inner_quiet = 2;
}

fn apply_waste_not(state: &mut CraftState) {
    state.waste_not = buff_turns(state, 4) + 1;
}

fn apply_waste_not_ii(state: &mut CraftState) {
    state.waste_not = buff_turns(state, 8) + 1;
}

fn apply_prudent_touch(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 100., 1);
}

fn apply_great_strides(state: &mut CraftState) {
    state.great_strides = buff_turns(state, 3) + 1;
}

fn apply_final_appraisal(state: &mut CraftState) {
    state.final_appraisal = buff_turns(state, 5);
}

fn apply_manipulation(state: &mut CraftState) {
    state.manipulation = buff_turns(state, 8) + 1;
}

fn apply_advanced_touch(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 150., 1);
}

fn apply_prudent_synthesis(factors: &Factors, state: &mut CraftState) {
    produce_progress(factors, state, 180.);
}

fn apply_trained_finesse(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 100., 1);
}

fn apply_refined_touch(factors: &Factors, state: &mut CraftState) {
    let inner_quiet_progress = if state.standard_touch_ready { 2 } else { 1 };
    produce_quality(factors, state, 100., inner_quiet_progress);
}

fn apply_daring_touch(factors: &Factors, state: &mut CraftState) {
    produce_quality(factors, state, 150., 1);
}

fn apply_immaculate_mend(params: &CraftParameter, state: &mut CraftState) {
    state.durability = params.item.max_durability;
}

fn apply_trained_perfection(state: &mut CraftState) {
    state.trained_perfection = 1;
    state.trained_perfection_remain -= 1;
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
            CraftAction::StandardTouch => if state.standard_touch_ready { 18 } else { 32 },
            CraftAction::Reflect => 6,
            CraftAction::WasteNot => 56,
            CraftAction::WasteNotII => 98,
            CraftAction::PrudentTouch => 25,
            CraftAction::GreatStrides => 32,
            CraftAction::FinalAppraisal => 1,
            CraftAction::Manipulation => 96,
            CraftAction::AdvancedTouch => if state.advanced_touch_ready { 18 } else { 46 },
            CraftAction::PrudentSynthesis => 18,
            CraftAction::TrainedFinesse => 32,
            CraftAction::RefinedTouch => 24,
            CraftAction::DaringTouch => 0,
            CraftAction::ImmaculateMend => 112,
            CraftAction::TrainedPerfection => 0,
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
            CraftAction::StandardTouch => 10,
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
            CraftAction::RefinedTouch => 10,
            CraftAction::DaringTouch => 10,
            CraftAction::ImmaculateMend => 0,
            CraftAction::TrainedPerfection => 0,
        }
    }

    fn durability_cost(&self, state: &CraftState) -> i64 {
        if state.trained_perfection > 0 {
            return 0;
        }
        let mut cost = self.base_durability_cost();
        if state.waste_not > 0 {
            cost = (cost + 1) / 2
        }
        if state.condition == StatusCondition::STURDY {
            cost = (cost + 1) / 2
        }
        cost
    }

    pub fn action_level(&self) -> i64 {
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
            CraftAction::StandardTouch => 18,
            CraftAction::Reflect => 69,
            CraftAction::WasteNot => 15,
            CraftAction::WasteNotII => 47,
            CraftAction::PrudentTouch => 66,
            CraftAction::GreatStrides => 21,
            CraftAction::FinalAppraisal => 42,
            CraftAction::Manipulation => 65,
            CraftAction::AdvancedTouch => 68,
            CraftAction::PrudentSynthesis => 88,
            CraftAction::TrainedFinesse => 90,
            CraftAction::RefinedTouch => 92,
            CraftAction::DaringTouch => 96,
            CraftAction::ImmaculateMend => 98,
            CraftAction::TrainedPerfection => 100,
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
        if params.player.unavailable_actions.contains(self) {
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
            Self::DaringTouch => state.expedience > 0,
            Self::TrainedPerfection => state.trained_perfection_remain > 0,
            _ => true
        }
    }

    /// Probability that the action takes effect. Only Rapid Synthesis, Hasty
    /// Touch and Daring Touch can fail; everything else always succeeds.
    fn success_probability(&self, state: &CraftState) -> f64 {
        let base_success_proba = match self {
            Self::RapidSynthesis => 0.5,
            Self::HastyTouch | Self::DaringTouch => 0.6,
            _ => return 1.,
        };
        base_success_proba + if state.condition == StatusCondition::CENTRED { 0.25 } else { 0. }
    }

    /// Pays the action's CP and durability cost and records it as the previous
    /// action. Must run before `apply_effect`, which reads the paid-up state.
    fn pay_costs(&self, state: &mut CraftState) {
        state.cp -= self.cp_cost(state);
        state.durability -= self.durability_cost(state);
        if self.base_durability_cost() > 0 && state.trained_perfection > 0 {
            state.trained_perfection -= 1;
        }
        state.prev_action = Some(*self);
    }

    /// Applies the action's effect in place, assuming it succeeds. Both the
    /// probabilistic and the deterministic simulation paths go through here, so
    /// action behaviour lives in exactly one place.
    fn apply_effect(&self, params: &CraftParameter, factors: &Factors, state: &mut CraftState) {
        match self {
            Self::BasicSynthesis => apply_basic_synthesis(params, factors, state),
            Self::BasicTouch => apply_basic_touch(factors, state),
            Self::MastersMend => apply_masters_mend(state),
            Self::DelicateSynthesis => apply_delicate_synthesis(params, factors, state),
            Self::CarefulSynthesis => apply_careful_synthesis(params, factors, state),
            Self::Groundwork => apply_groundwork(params, factors, state),
            Self::Observe => apply_observe(state),
            Self::ByregotBlessing => apply_byregot_blessing(factors, state),
            Self::PreparatoryTouch => apply_preparatory_touch(factors, state),
            Self::RapidSynthesis => apply_rapid_synthesis(params, factors, state),
            Self::IntensiveSynthesis => apply_intensive_synthesis(factors, state),
            Self::HastyTouch => apply_hasty_touch(params, factors, state),
            Self::PreciseTouch => apply_precise_touch(factors, state),
            Self::TrickOfTheTrade => apply_tricks_of_the_trade(state),
            Self::Innovation => apply_innovation(state),
            Self::Veneration => apply_veneration(state),
            Self::MuscleMemory => apply_muscle_memory(factors, state),
            Self::StandardTouch => apply_standard_touch(factors, state),
            Self::Reflect => apply_reflect(factors, state),
            Self::WasteNot => apply_waste_not(state),
            Self::WasteNotII => apply_waste_not_ii(state),
            Self::PrudentTouch => apply_prudent_touch(factors, state),
            Self::GreatStrides => apply_great_strides(state),
            Self::FinalAppraisal => apply_final_appraisal(state),
            Self::Manipulation => apply_manipulation(state),
            Self::AdvancedTouch => apply_advanced_touch(factors, state),
            Self::PrudentSynthesis => apply_prudent_synthesis(factors, state),
            Self::TrainedFinesse => apply_trained_finesse(factors, state),
            Self::RefinedTouch => apply_refined_touch(factors, state),
            Self::DaringTouch => apply_daring_touch(factors, state),
            Self::ImmaculateMend => apply_immaculate_mend(params, state),
            Self::TrainedPerfection => apply_trained_perfection(state),
        }
    }

    pub fn apply(&self, params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
        self.apply_with(params, &Factors::new(params), state)
    }

    pub fn apply_with(&self, params: &CraftParameter, factors: &Factors, state: &CraftState) -> ProbabilisticResult {
        let mut state = state.clone();
        self.pay_costs(&mut state);

        let success_proba = self.success_probability(&state);
        if success_proba >= 1. {
            self.apply_effect(params, factors, &mut state);
            return deterministic(state);
        }

        let failed_state = state.clone();
        let mut success_state = state;
        self.apply_effect(params, factors, &mut success_state);
        vec![
            ProbabilisticState { probability: success_proba, state: success_state },
            ProbabilisticState { probability: 1. - success_proba, state: failed_state },
        ]
    }

    pub fn play(&self, params: &CraftParameter, state: &CraftState) -> ProbabilisticResult {
        self.play_with(params, &Factors::new(params), state)
    }

    pub fn play_with(&self, params: &CraftParameter, factors: &Factors, state: &CraftState) -> ProbabilisticResult {
        let mut result: ProbabilisticResult = vec![];
        for applied_state in self.apply_with(params, factors, state).iter() {
            for ticked_state in tick(params, &applied_state.state).iter() {
                result.push(ProbabilisticState {
                    probability: ticked_state.probability * applied_state.probability,
                    state: ticked_state.state.clone(),
                })
            }
        }
        result
    }

    /// Plays one turn with the status condition pinned to NORMAL, allocating
    /// nothing and computing no transition probabilities.
    ///
    /// This is exactly what `run_macro(.., force_normal = true)` does: the
    /// outcomes `tick` produces differ only in their `condition` field, which
    /// the caller immediately overwrites with NORMAL, so sampling among them is
    /// a no-op. Returns `None` for the three actions that can genuinely fail —
    /// there the caller must fall back to `play`.
    pub fn play_normal(&self, params: &CraftParameter, factors: &Factors, state: &CraftState) -> Option<CraftState> {
        if self.success_probability(state) < 1. {
            return None;
        }
        let mut next_state = state.clone();
        self.pay_costs(&mut next_state);
        self.apply_effect(params, factors, &mut next_state);
        tick_normal(params, &mut next_state);
        Some(next_state)
    }

    #[cfg(test)]
    fn is_deterministic(&self) -> bool {
        !matches!(self, Self::RapidSynthesis | Self::HastyTouch | Self::DaringTouch)
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
            Self::StandardTouch,
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
            Self::RefinedTouch,
            Self::DaringTouch,
            Self::ImmaculateMend,
            Self::TrainedPerfection,
        ]
    }
}

#[cfg(test)]
mod test {
    use rand::prelude::SliceRandom;
    use rand::{rngs::SmallRng, SeedableRng};

    use super::*;
    use crate::factor::Factors;
    use crate::state::{ItemParameter, PlayerParameter};

    fn craft_params(job_level: i64, recipe_level: i64) -> CraftParameter {
        CraftParameter {
            player: PlayerParameter {
                job_level,
                craftsmanship: 3252,
                control: 3174,
                max_cp: 577,
                unavailable_actions: vec![],
            },
            item: ItemParameter {
                recipe_level,
                max_durability: 70,
                max_progress: 3900,
                max_quality: 10920,
            },
        }
    }

    /// The annealer's fast path assumes that pinning the status condition to
    /// NORMAL makes a turn deterministic, because `tick`'s outcomes differ only
    /// in their `condition` field. This walks random macros and asserts that
    /// every outcome `play` can produce collapses onto what `play_normal`
    /// returns, which is the property the fast path rests on.
    #[test]
    fn play_normal_matches_every_outcome_of_play() {
        // 580 is a normal recipe, 641 and 516 are expert recipes.
        let all_params = [
            craft_params(90, 580),
            craft_params(100, 580),
            craft_params(100, 641),
            craft_params(80, 516),
            craft_params(62, 390),
        ];

        let mut checked_turns = 0;
        for params in all_params.iter() {
            let factors = Factors::new(params);
            let candidates: Vec<CraftAction> = CraftAction::all_actions()
                .into_iter()
                .filter(|action| params.player.job_level >= action.action_level())
                .filter(|action| action.is_deterministic())
                .collect();

            for seed in 0..300u64 {
                let mut rng = SmallRng::seed_from_u64(seed);
                let mut state = params.initial_state(0);

                for _ in 0..60 {
                    if state.result != CraftResult::ONGOING {
                        break;
                    }
                    let action = *candidates.choose(&mut rng).unwrap();
                    if !action.is_playable(params, &state) {
                        state.turn += 1;
                        continue;
                    }

                    let fast = action
                        .play_normal(params, &factors, &state)
                        .expect("deterministic action must take the fast path");
                    let outcomes = action.play(params, &state);
                    assert!(!outcomes.is_empty());
                    for proba_state in outcomes.iter() {
                        let mut pinned = proba_state.state.clone();
                        pinned.condition = StatusCondition::NORMAL;
                        assert_eq!(
                            pinned, fast,
                            "mismatch for {:?} at turn {} (rlv {})",
                            action, state.turn, params.item.recipe_level
                        );
                    }

                    checked_turns += 1;
                    state = fast;
                }
            }
        }
        assert!(checked_turns > 10_000, "weak coverage: {} turns", checked_turns);
    }

    /// `apply` must still describe the same distribution for the actions that
    /// can fail, which no longer go through a dedicated `binary_result_states`.
    #[test]
    fn failing_actions_keep_their_probabilities() {
        let params = craft_params(100, 580);
        let mut state = params.initial_state(0);
        state.prev_action = Some(CraftAction::BasicSynthesis);
        state.expedience = 2;

        for (action, expected) in [
            (CraftAction::RapidSynthesis, 0.5),
            (CraftAction::HastyTouch, 0.6),
            (CraftAction::DaringTouch, 0.6),
        ] {
            for (condition, bonus) in [(StatusCondition::NORMAL, 0.), (StatusCondition::CENTRED, 0.25)] {
                let mut state = state.clone();
                state.condition = condition;
                let outcomes = action.apply(&params, &state);
                assert_eq!(outcomes.len(), 2, "{:?}", action);
                assert!((outcomes[0].probability - (expected + bonus)).abs() < 1e-9, "{:?}", action);
                assert!((outcomes[1].probability - (1. - expected - bonus)).abs() < 1e-9, "{:?}", action);
                assert!(action.play_normal(&params, &Factors::new(&params), &state).is_none());
            }
        }
    }
}
