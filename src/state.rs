use serde::{Deserialize, Serialize};
use std::cmp::max;

use num;
use crate::action::CraftAction;

#[derive(PartialEq, Eq, Clone, Copy, Hash, Debug, PartialOrd, Ord, Deserialize, Serialize)]
pub enum StatusCondition {
    NORMAL,
    GOOD,
    EXCELLENT,
    POOR,
    CENTRED,
    PLIANT,
    STURDY,
    MALLEABLE,
    PRIMED,
}

#[derive(PartialEq, Eq, Clone, Copy, Debug, Deserialize, Serialize)]
pub enum CraftResult {
    ONGOING,
    FAILED,
    SUCCESS,
}

#[derive(Debug, Deserialize)]
pub struct PlayerParameter {
    pub raw_level: i64,
    pub craftsmanship: i64,
    pub control: i64,
    pub max_cp: i64,
}

#[derive(Debug, Deserialize)]
pub struct ItemParameter {
    pub internal_level: i64,
    pub max_durability: i64,
    pub max_progress: i64,
    pub max_quality: i64,
    pub standard_craftsmanship: i64,
    pub standard_control: i64,
    pub is_expert_recipe: bool,
}

#[derive(Debug, Deserialize)]
pub struct CraftParameter {
    pub player: PlayerParameter,
    pub item: ItemParameter,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CraftState {
    pub durability: i64,
    pub progress: i64,
    pub quality: i64,
    pub cp: i64,
    pub condition: StatusCondition,

    pub inner_quiet: i64,
    pub innovation: i64,
    pub veneration: i64,
    pub muscle_memory: i64,
    pub waste_not: i64,
    pub great_strides: i64,
    pub final_appraisal: i64,
    pub manipulation: i64,
    pub turn: i64,

    pub prev_action: Option<CraftAction>,
    pub result: CraftResult,
}

impl CraftState {
    pub fn clip(& mut self, params: &CraftParameter) {
        self.durability = num::clamp(self.durability, 0, params.item.max_durability);
        self.progress = num::clamp(self.progress, 0, params.item.max_progress);
        self.quality = num::clamp(self.quality, 0, params.item.max_quality);
        self.cp = num::clamp(self.cp, 0, params.player.max_cp);

        self.inner_quiet = num::clamp(self.inner_quiet, 0, 11);
        self.innovation = max(0, self.innovation);
        self.veneration = max(0, self.veneration);
        self.muscle_memory = max(0, self.muscle_memory);
        self.waste_not = max(0, self.waste_not);
        self.great_strides = max(0, self.great_strides);
        self.final_appraisal = max(0, self.final_appraisal);
        self.manipulation = max(0, self.manipulation);
        self.turn = max(0, self.turn);
    }
}

impl CraftParameter {
    pub fn initial_state(&self) -> CraftState {
        CraftState {
            durability: self.item.max_durability,
            progress: 0,
            quality: 0,
            cp: self.player.max_cp,
            condition: StatusCondition::NORMAL,
            inner_quiet: 0,
            innovation: 0,
            veneration: 0,
            muscle_memory: 0,
            waste_not: 0,
            great_strides: 0,
            final_appraisal: 0,
            manipulation: 0,
            turn: 0,
            prev_action: None,
            result: CraftResult::ONGOING
        }
    }
}