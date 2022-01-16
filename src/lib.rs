mod utils;
mod state;
mod factor;
mod action;
mod search;

use crate::action::CraftAction;
use crate::state::CraftState;
use crate::state::CraftParameter;
use crate::search::dfs;
use std::str::FromStr;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, ffxiv-crafter-rust!");
}

#[wasm_bindgen]
pub fn search_best_move(params_str: &str, state_str: &str, depth: i64) -> String {
    let params: CraftParameter = serde_json::from_str(params_str).unwrap();
    let state: CraftState = serde_json::from_str(state_str).unwrap();

    let dfs_result = dfs(&params, &state, depth);
    serde_json::to_string(&dfs_result.best_action_path[0]).unwrap().to_string()
}

#[wasm_bindgen]
pub fn apply_action(params_str: &str, state_str: &str, action_str: &str) -> String {
    let params: CraftParameter = serde_json::from_str(params_str).unwrap();
    let state: CraftState = serde_json::from_str(state_str).unwrap();
    let action: CraftAction = CraftAction::from_str(action_str).unwrap();

    let next_states = action.apply(&params, &state);
    serde_json::to_string(&next_states).unwrap().to_string()
}

#[wasm_bindgen]
pub fn play_action(params_str: &str, state_str: &str, action_str: &str) -> String {
    let params: CraftParameter = serde_json::from_str(params_str).unwrap();
    let state: CraftState = serde_json::from_str(state_str).unwrap();
    let action: CraftAction = CraftAction::from_str(action_str).unwrap();

    let next_states = action.play(&params, &state);
    serde_json::to_string(&next_states).unwrap().to_string()
}

#[wasm_bindgen]
pub fn available_actions(params_str: &str, state_str: &str) -> String {
    let params: CraftParameter = serde_json::from_str(params_str).unwrap();
    let state: CraftState = serde_json::from_str(state_str).unwrap();

    let available_actions: Vec<CraftAction> = CraftAction::all_actions().into_iter().filter(|action| action.is_playable(&params, &state)).collect();
    serde_json::to_string(&available_actions).unwrap().to_string()
}