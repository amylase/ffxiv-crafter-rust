use std::{time::SystemTime, ops::Range};
use crate::state::{CraftState, CraftParameter, CraftResult, PlayerParameter, ItemParameter};
use rand::{SeedableRng, Rng};
use rayon::iter::{IntoParallelIterator, ParallelIterator};

mod factor;
mod search;
mod action;
mod state;

fn run(params: &CraftParameter, initial_quality: i64, seed: u64, verbose: bool) -> CraftState {
    let mut state = params.initial_state(initial_quality);

    let mut rng = rand::rngs::StdRng::seed_from_u64(seed);
    if verbose { println!("{:?}", &params); }

    while state.result == CraftResult::ONGOING {
        if verbose { println!("{:?}", state); }
        let time = SystemTime::now();
        let dfs_result = search::adaptive_dfs(&params, &state);
        let elapsed_sec = time.elapsed().unwrap().as_secs_f64();
        if verbose {
            println!("{:?}, elapsed: {:.3}, score: {:.3} (predicted quality: {})", dfs_result.best_action_path, elapsed_sec, dfs_result.best_score, (dfs_result.best_score * params.item.max_quality as f64) as i64);
        }
        let next_action = dfs_result.best_action_path.into_iter().next().unwrap();
        let next_states = next_action.play(&params, &state);

        let choice: f64 = rng.gen();
        let mut accumulate: f64 = 0.;
        let mut next_state = None;
        for proba_state in next_states {
            accumulate += proba_state.probability;
            if choice <= accumulate {
                next_state = Some(proba_state.state);
                break;
            }
        }
        state = next_state.unwrap();
    }
    println!("{:?}", state);
    return state;
}

fn quality_score(params: &CraftParameter, state: &CraftState) -> f64 {
    if state.result != CraftResult::SUCCESS {
        return 0.
    } else {
        return state.quality as f64 / params.item.max_quality as f64
    }
}

fn max_quality_score(params: &CraftParameter, state: &CraftState) -> f64 {
    if state.result != CraftResult::SUCCESS {
        return 0.
    } else {
        return if state.quality == params.item.max_quality { 1. } else { 0. }
    }
}

fn main() {
    let player = PlayerParameter {
        job_level: 80,
        craftsmanship: 2978,
        control: 2787,
        max_cp: 655,
        unavailable_actions: vec![],
    };
    let item = ItemParameter {
        recipe_level: 516,
        max_durability: 55,
        max_progress: 5059,
        max_quality: 15474,
    };
    let params = CraftParameter {
        item,
        player
    };
    println!("{:?}", &params);

    let total_time = SystemTime::now();
    let samples = 100;
    let verbose = samples <= 1;
    let seeds: Range<u64> = 0..samples;
    let states: Vec<CraftState> = seeds.into_par_iter().map(|seed| run(&params, 0, seed, verbose)).collect();
    let average_quality: f64 = states.iter().map(|state| quality_score(&params, state)).sum::<f64>() / samples as f64;
    let max_quality_ratio: f64 = states.iter().map(|state| max_quality_score(&params, state)).sum::<f64>() / samples as f64;
    let total_time_elapsed = total_time.elapsed().unwrap().as_secs_f64();
    println!("done.");
    println!("average quality: {:.3}", average_quality);
    println!("max quality ratio: {:.3}", max_quality_ratio);
    println!("total time: {:.3}", total_time_elapsed);
}