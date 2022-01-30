use std::{ops::Range};

use ffxiv_crafter_rust::{CraftParameter, CraftState, CraftResult, CraftAction};
use rand::{thread_rng, Rng, prelude::SliceRandom};

fn objective_function(params: &CraftParameter, state: &CraftState, actions: &Vec<CraftAction>) -> f64 {
    let progress_bonus = state.progress as f64 / params.item.max_progress as f64;
    // todo: adjust.
    let quality_ratio = (state.quality as f64) / (params.item.max_quality as f64);
    let turns_bonus = 5. / (actions.len() as f64 + 1.);
    if state.result != CraftResult::SUCCESS {
        progress_bonus
    } else {
        return progress_bonus + quality_ratio * turns_bonus;
    }
}

pub fn run_macro(params: &CraftParameter, actions: &Vec<CraftAction>, initial_quality: i64) -> CraftState {
    let mut state = params.initial_state(initial_quality);
    let mut rng = thread_rng();

    for turn in 0..actions.len() {
        if state.result != CraftResult::ONGOING {
            break;
        }
        let next_action = actions[turn];
        if !next_action.is_playable(params, &state) {
            // emulating invalid action handling
            state.turn += 1;
            continue;
        }
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
    state
}

fn evaluate(params: &CraftParameter, actions: &Vec<CraftAction>, samples: u64) -> f64 {
    let mut sum_score: f64 = 0.;
    for _ in 0..samples {
        let state = run_macro(params, actions, 0);
        sum_score += objective_function(params, &state, actions)
    }
    return sum_score / samples as f64;
}

fn available_actions(params: &CraftParameter) -> Vec<CraftAction> {
    CraftAction::all_actions().into_iter()
        .filter(|action| params.player.job_level >= action.action_level())
        .filter(|action| *action != CraftAction::TrickOfTheTrade)
        .filter(|action| *action != CraftAction::PreciseTouch)
        .filter(|action| *action != CraftAction::IntensiveSynthesis)
        .collect()
}

fn tweak(params: &CraftParameter, actions: &Vec<CraftAction>) -> Vec<CraftAction> {
    let mut rng = thread_rng();
    let choice: f64 = rng.gen();
    if choice < 0.1 || actions.is_empty() {
        // add
        let position = rng.gen_range(0..(actions.len() + 1));
        let new_action = *available_actions(params).choose(&mut rng).unwrap();
        
        let mut new_actions = vec![];
        new_actions.extend_from_slice(&actions[..position]);
        new_actions.push(new_action);
        new_actions.extend_from_slice(&actions[position..]);

        return new_actions;
    } else if choice < 0.2 {
        // remove
        let position = rng.gen_range(0..actions.len());

        let mut new_actions = vec![];
        new_actions.extend_from_slice(&actions[..position]);
        new_actions.extend_from_slice(&actions[(position + 1)..]);

        return new_actions;
    } else {
        // replace
        let position = rng.gen_range(0..actions.len());
        let new_action = *available_actions(params).choose(&mut rng).unwrap();

        let mut new_actions = vec![];
        new_actions.extend_from_slice(&actions[..position]);
        new_actions.push(new_action);
        new_actions.extend_from_slice(&actions[(position + 1)..]);

        return new_actions;
    }
}

pub fn plan(params: &CraftParameter) -> Vec<CraftAction> {
    let evaluate_samples = 200;
    let steps = 50000;
    let start_temperature = 0.01;
    let end_temperature = 0.001;

    let mut actions: Vec<CraftAction> = vec![];
    let mut score = evaluate(params, &actions, evaluate_samples);
    let mut rng = thread_rng();
    for step in 0..steps {
        let temperature = start_temperature + (end_temperature - start_temperature) * step as f64 / steps as f64;
        if step % 500 == 0 {
            println!("step: {step}");
            report(params, &actions);
            println!("");
        }
        let new_actions = tweak(params, &actions);
        let new_score = evaluate(params, &new_actions, evaluate_samples);
        if new_score > score || rng.gen::<f64>() < ((new_score - score) / temperature).exp() {
            score = new_score;
            actions = new_actions;
        }
    }
    return actions;
}

pub fn report(params: &CraftParameter, actions: &Vec<CraftAction>) {
    let samples = 1000;
    let seeds: Range<u64> = 0..samples;
    let states: Vec<CraftState> = seeds.into_iter().map(|_seed| run_macro(&params, &actions, 0)).collect();
    let success_rate: f64 = states.iter().map(|state| success_score(&params, state)).sum::<f64>() / samples as f64;
    let average_quality: f64 = states.iter().map(|state| quality_score(&params, state)).sum::<f64>() / samples as f64;
    println!("success rate: {:.3}", success_rate);
    println!("average quality: {:.3}", average_quality);
    println!("macro length: {}", actions.len());
}

fn quality_score(params: &CraftParameter, state: &CraftState) -> f64 {
    if state.result != CraftResult::SUCCESS {
        return 0.
    } else {
        return state.quality as f64 / params.item.max_quality as f64
    }
}

fn success_score(_params: &CraftParameter, state: &CraftState) -> f64 {
    if state.result != CraftResult::SUCCESS {
        return 0.
    } else {
        return 1.
    }
}