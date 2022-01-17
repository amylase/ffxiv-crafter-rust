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

mod test {
    use super::available_actions;

    #[test]
    fn test_available_actions() {
        let params_str = r#"{"player":{"job_level":80,"craftsmanship":2978,"control":2787,"max_cp":655},"item":{"recipe_level":516,"max_durability":55,"max_progress":12046,"max_quality":81447}}"#;
        let state_str = r#"{"durability":55,"progress":0,"quality":0,"cp":655,"condition":"NORMAL","inner_quiet":0,"innovation":0,"veneration":0,"muscle_memory":0,"waste_not":0,"great_strides":0,"final_appraisal":0,"manipulation":0,"turn":1,"result":"ONGOING"}"#;
        let _actual = available_actions(params_str, state_str);
    }
}