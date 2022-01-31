use std::mem::swap;
use std::{ops::Range};

use crate::state::{CraftParameter, CraftState, CraftResult, StatusCondition};
use crate::action::CraftAction;
use rand::{thread_rng, Rng, prelude::SliceRandom};
use serde::Serialize;

fn interpolate(x1: f64, y1: f64, x2: f64, y2: f64, x: f64) -> f64 {
    return (y2 - y1) / (x2 - x1) * (x - x1) + y1
}

// https://docs.google.com/spreadsheets/d/1P1YDa4KZu3eYeFXgLKKV5_9nYS_JhAOK0eS5y8UslGo/edit#gid=0
fn hq_chance(quality_ratio: f64) -> f64 {
    if quality_ratio < 0.7 {
        return interpolate(0., 0.01, 0.7, 0.3, quality_ratio)
    } else if quality_ratio < 0.8 {
        return interpolate(0.7, 0.3, 0.8, 0.7, quality_ratio)
    } else {
        return interpolate(0.8, 0.7, 1., 1., quality_ratio)
    }
} 

// optimizing expected HQ items per time
fn annealing_objective(params: &CraftParameter, state: &CraftState, actions: &Vec<CraftAction>) -> f64 {
    let progress_bonus = state.progress as f64 / params.item.max_progress as f64;
    let quality_ratio = (state.quality as f64) / (params.item.max_quality as f64);
    let turns_bonus = 10. / (actions.len() as f64 + 1.);
    if state.result != CraftResult::SUCCESS {
        progress_bonus
    } else {
        return progress_bonus + hq_chance(quality_ratio) * turns_bonus;
    }
}

fn actual_objective(params: &CraftParameter, state: &CraftState, actions: &Vec<CraftAction>) -> f64 {
    let progress_bonus = state.progress as f64 / params.item.max_progress as f64;
    let quality = state.quality.min(params.item.max_quality);
    let quality_ratio = (quality as f64) / (params.item.max_quality as f64);
    let turns_bonus = 10. / (actions.len() as f64 + 1.);
    if state.result != CraftResult::SUCCESS {
        progress_bonus
    } else if quality < params.item.max_quality {
        return progress_bonus + quality_ratio;
    } else {
        return progress_bonus + quality_ratio + turns_bonus;
    }
}

pub fn run_macro(params: &CraftParameter, actions: &Vec<CraftAction>, initial_quality: i64, force_normal: bool) -> CraftState {
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
        if force_normal {
            state.condition = StatusCondition::NORMAL;
        }
    }
    state
}

fn available_actions(params: &CraftParameter) -> Vec<CraftAction> {
    CraftAction::all_actions().into_iter()
        .filter(|action| params.player.job_level >= action.action_level())
        .filter(|action| *action != CraftAction::TrickOfTheTrade)
        .filter(|action| *action != CraftAction::PreciseTouch)
        .filter(|action| *action != CraftAction::IntensiveSynthesis)
        .filter(|action| *action != CraftAction::RapidSynthesis)
        .filter(|action| *action != CraftAction::HastyTouch)
        .filter(|action| *action != CraftAction::Observe)
        .filter(|action| *action != CraftAction::FocusedTouch)
        .filter(|action| *action != CraftAction::FocusedSynthesis)
        .collect()
}

fn tweak(params: &CraftParameter, actions: &Vec<CraftAction>) -> Vec<CraftAction> {
    let mut rng = thread_rng();
    let choice: f64 = rng.gen();
    let mut new_actions = vec![];
    if actions.len() <= 60 && (choice < 0.1 || actions.is_empty()) {
        // add
        let position = rng.gen_range(0..(actions.len() + 1));
        let new_action = *available_actions(params).choose(&mut rng).unwrap();
        
        new_actions.extend_from_slice(&actions[..position]);
        new_actions.push(new_action);
        new_actions.extend_from_slice(&actions[position..]);

    } else if choice < 0.2 {
        // remove
        let position = rng.gen_range(0..actions.len());

        new_actions.extend_from_slice(&actions[..position]);
        new_actions.extend_from_slice(&actions[(position + 1)..]);

    } else if actions.len() >= 2 && choice < 0.25 {
        // swap
        let mut position1 = rng.gen_range(0..(actions.len() - 1));
        let mut position2 = rng.gen_range(0..(actions.len() - 1));
        if position1 > position2 {
            swap(&mut position1, &mut position2)
        }
        if position1 == position2 {
            // todo: avoid duplicate
            return actions.clone();
        }
        new_actions.extend_from_slice(&actions[..position1]);
        new_actions.push(actions[position2]);
        new_actions.extend_from_slice(&actions[(position1 + 1)..position2]);
        new_actions.push(actions[position1]);
        new_actions.extend_from_slice(&actions[(position2 + 1)..]);
    } else {
        // replace
        let position = rng.gen_range(0..actions.len());
        let new_action = *available_actions(params).choose(&mut rng).unwrap();

        new_actions.extend_from_slice(&actions[..position]);
        new_actions.push(new_action);
        new_actions.extend_from_slice(&actions[(position + 1)..]);
    }
    return new_actions;
}

pub fn plan(orig_params: &CraftParameter, initial_quality: i64, longer: bool) -> Vec<CraftAction> {
    let mut params = &mut orig_params.clone();
    params.item.max_quality *= 11;
    params.item.max_quality /= 10;
    let steps = if longer { 5_000_000 } else { 1_000_000 };
    let start_temperature = 0.01;
    let end_temperature = 0.0001;

    let mut actions: Vec<CraftAction> = vec![];
    let init_state = run_macro(params, &actions, initial_quality, true);
    let mut score = annealing_objective(params, &init_state, &actions);
    let mut rng = thread_rng();
    let mut best_actions = actions.clone();
    let mut best_score = actual_objective(params, &init_state, &actions);
    for step in 0..steps {
        let temperature = start_temperature + (end_temperature - start_temperature) * step as f64 / steps as f64;
        if step % 50000 == 0 {
            println!("step: {step}");
            report(params, &best_actions, initial_quality, true);
            println!("");
        }
        let new_actions = tweak(params, &actions);
        let state = run_macro(params, &new_actions, initial_quality, true);
        let new_score = annealing_objective(params, &state, &new_actions);
        let new_actual_score = actual_objective(params, &state, &new_actions);
        if new_score > score || rng.gen::<f64>() < ((new_score - score) / temperature).exp() {
            score = new_score;
            actions = new_actions.clone();
        }
        if new_actual_score > best_score {
            best_score = new_actual_score;
            best_actions = new_actions.clone();
        }
    }
    return post_process(params, &best_actions);
}

fn post_process(params: &CraftParameter, actions: &Vec<CraftAction>) -> Vec<CraftAction> {
    let mut actions = actions.clone();
    actions = remove_unusable_actions(params, &actions);
    return actions;
}

fn remove_unusable_actions(params: &CraftParameter, actions: &Vec<CraftAction>) -> Vec<CraftAction> {
    let mut state = params.initial_state(0);
    let mut rng = thread_rng();

    let mut used_actions = vec![];
    for turn in 0..actions.len() {
        if state.result != CraftResult::ONGOING {
            break;
        }
        let next_action = actions[turn];
        if !next_action.is_playable(params, &state) {
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
        state.condition = StatusCondition::NORMAL;
        used_actions.push(next_action);
    }
    return used_actions;
}

#[derive(Serialize)]
pub struct MacroMetrics {
    pub success_rate: f64,
    pub max_quality_rate: f64,
    pub average_quality: f64,
    pub macro_length: usize,
}

pub fn report(params: &CraftParameter, actions: &Vec<CraftAction>, initial_quality: i64, verbose: bool) -> MacroMetrics {
    let state = run_macro(params, &actions, initial_quality, true);
    let annealing = annealing_objective(params, &state, &actions);
    let actual = actual_objective(params, &state, &actions);

    let samples = 1000;
    let seeds: Range<u64> = 0..samples;
    let states: Vec<CraftState> = seeds.into_iter().map(|_seed| run_macro(&params, &actions, initial_quality, false)).collect();
    let success_rate: f64 = states.iter().map(|state| success_score(&params, state)).sum::<f64>() / samples as f64;
    let max_quality_rate: f64 = states.iter().map(|state| max_quality_score(&params, state)).sum::<f64>() / samples as f64;
    let average_quality: f64 = states.iter().map(|state| quality_score(&params, state)).sum::<f64>() / samples as f64;

    if verbose {
        println!("annealing objective: {:.3}", annealing);
        println!("actual objective: {:.3}", actual);
        println!("non-stateful quality: {:.3}", quality_score(params, &state));
        println!("success rate: {:.3}", success_rate);
        println!("max quality rate: {:.3}", max_quality_rate);
        println!("average quality: {:.3}", average_quality);
        println!("macro length: {}", actions.len());
        println!("{:?}", actions);
        println!("{:?}", states[0]);    
    }
    return MacroMetrics {
        success_rate,
        max_quality_rate,
        average_quality,
        macro_length: actions.len(),
    }
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

fn max_quality_score(params: &CraftParameter, state: &CraftState) -> f64 {
    if state.result != CraftResult::SUCCESS {
        return 0.
    } else {
        return if state.quality == params.item.max_quality { 1. } else { 0. }
    }
}