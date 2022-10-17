use std::fs;

use serde::{Deserialize, Serialize};

use crate::state::CraftParameter;
use crate::macroplan::{report, AnnealingParams, plan_with_annealing_params, plan, MacroMetrics};
use crate::action::CraftAction;

mod factor;
mod action;
mod state;
mod macroplan;

#[derive(Deserialize)]
struct Params {
    pub craft_params: CraftParameter,
    pub annealing_params: Option<AnnealingParams>,
}

#[derive(Serialize)]
struct Result {
    pub actions: Vec<CraftAction>,
    pub metrics: MacroMetrics,
}

fn main() {
    let params_path = std::env::args().nth(1).unwrap();
    let params_str = fs::read_to_string(params_path).unwrap();

    let params: Params = serde_json::from_str(&params_str).unwrap();
    let initial_quality = 0;
    let result = match params.annealing_params {
        Some(annealing_params) => plan_with_annealing_params(&params.craft_params, initial_quality, annealing_params),
        None => plan(&params.craft_params, initial_quality, false),
    };
 
    let metrics = report(&params.craft_params, &result, initial_quality, false);
    let metrics_json = serde_json::to_string(&metrics).unwrap().to_string();

    let result_path = std::env::args().nth(2);
    match result_path {
        Some(path) => {fs::write(path, metrics_json).unwrap();},
        None => println!("{:?}", metrics_json),
    }
}

