mod utils;
mod state;
mod factor;
mod action;
mod search;

use crate::state::CraftState;
use crate::state::CraftParameter;
use crate::search::dfs;
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