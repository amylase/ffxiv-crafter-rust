use std::mem::swap;
use std::{ops::Range};

use crate::state::{CraftParameter, CraftState, CraftResult, StatusCondition};
use crate::action::CraftAction;
use rand::{thread_rng, Rng, prelude::SliceRandom};

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
        .filter(|action| *action != CraftAction::FocusedTouch)
        .filter(|action| *action != CraftAction::FocusedSynthesis)
        .filter(|action| *action != CraftAction::HastyTouch)
        .collect()
}

fn tweak(params: &CraftParameter, actions: &Vec<CraftAction>) -> Vec<CraftAction> {
    let mut rng = thread_rng();
    let choice: f64 = rng.gen();
    if actions.len() <= 60 && (choice < 0.1 || actions.is_empty()) {
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
        let mut new_actions = vec![];
        new_actions.extend_from_slice(&actions[..position1]);
        new_actions.push(actions[position2]);
        new_actions.extend_from_slice(&actions[(position1 + 1)..position2]);
        new_actions.push(actions[position1]);
        new_actions.extend_from_slice(&actions[(position2 + 1)..]);

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
    let steps = 5000000;
    let start_temperature = 0.01;
    let end_temperature = 0.0001;

    let mut actions: Vec<CraftAction> = vec![];
    let init_state = run_macro(params, &actions, 0, true);
    let mut score = annealing_objective(params, &init_state, &actions);
    let mut rng = thread_rng();
    let mut best_actions = actions.clone();
    let mut best_score = actual_objective(params, &init_state, &actions);
    for step in 0..steps {
        let temperature = start_temperature + (end_temperature - start_temperature) * step as f64 / steps as f64;
        if step % 50000 == 0 {
            println!("step: {step}");
            report(params, &actions);
            println!("");
        }
        let new_actions = tweak(params, &actions);
        let state = run_macro(params, &new_actions, 0, true);
        let new_score = annealing_objective(params, &state, &new_actions);
        let new_actual_score = actual_objective(params, &state, &new_actions);
        if new_score > score || rng.gen::<f64>() < ((new_score - score) / temperature).exp() {
            score = new_score;
            actions = new_actions;
        }
        if new_actual_score > best_score {
            best_score = new_actual_score;
            best_actions = actions.clone();
        }
    }
    return best_actions;
}

pub fn report(params: &CraftParameter, actions: &Vec<CraftAction>) {
    let samples = 1000;
    let seeds: Range<u64> = 0..samples;
    let states: Vec<CraftState> = seeds.into_iter().map(|_seed| run_macro(&params, &actions, 0, false)).collect();
    let success_rate: f64 = states.iter().map(|state| success_score(&params, state)).sum::<f64>() / samples as f64;
    let average_quality: f64 = states.iter().map(|state| quality_score(&params, state)).sum::<f64>() / samples as f64;
    println!("success rate: {:.3}", success_rate);
    println!("average quality: {:.3}", average_quality);
    println!("macro length: {}", actions.len());
    // println!("{:?}", actions)
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