use std::hint::black_box;
use std::time::Instant;

use crate::action::CraftAction;
use crate::action::CraftAction::*;
use rand::{rngs::SmallRng, SeedableRng};

use crate::factor::{crafting_level, progress_div, progress_mod, quality_div, quality_mod, transition_probabilities, Factors};
use crate::macroplan::{run_macro, plan_with_annealing_params, AnnealingParams};
use crate::state::{CraftParameter, CraftState, ItemParameter, PlayerParameter};

mod action;
mod factor;
mod macroplan;
mod search;
mod state;

fn params() -> CraftParameter {
    CraftParameter {
        player: PlayerParameter {
            job_level: 90,
            craftsmanship: 3252,
            control: 3174,
            max_cp: 577,
            unavailable_actions: vec![],
        },
        item: ItemParameter {
            recipe_level: 580,
            max_durability: 70,
            max_progress: 3900,
            max_quality: 10920,
        },
    }
}

/// A representative macro produced by the annealer for the parameters above.
fn sample_macro() -> Vec<CraftAction> {
    vec![
        MuscleMemory, Manipulation, Veneration, WasteNotII, Groundwork, Groundwork,
        BasicTouch, StandardTouch, Innovation, PreparatoryTouch, PreparatoryTouch,
        BasicTouch, StandardTouch, Innovation, DelicateSynthesis, AdvancedTouch,
        GreatStrides, ByregotBlessing, BasicSynthesis,
    ]
}

fn bench_run_macro(params: &CraftParameter) {
    let actions = sample_macro();
    let turns = actions.len();
    let iters = 200_000;

    // warm up
    let mut sink: i64 = 0;
    for _ in 0..10_000 {
        sink += run_macro(params, &actions, 0, true).quality;
    }

    let start = Instant::now();
    for _ in 0..iters {
        sink += run_macro(params, &actions, 0, true).quality;
    }
    let elapsed = start.elapsed().as_secs_f64();

    println!(
        "run_macro   : {:>8.0} ns/call  {:>6.1} ns/turn   ({:.2}s / {} iters, sink={})",
        elapsed / iters as f64 * 1e9,
        elapsed / (iters * turns) as f64 * 1e9,
        elapsed,
        iters,
        sink
    );
}

fn default_annealing_params(steps: i64) -> AnnealingParams {
    AnnealingParams {
        steps,
        max_quality_scaling: 1.1,
        start_temperature: 0.01,
        end_temperature: 0.00005,
        add_proba: 0.3,
        remove_proba: 0.3,
        swap_proba: 0.35,
    }
}

fn bench_annealing(params: &CraftParameter) {
    let steps = 200_000;
    let annealing_params = default_annealing_params(steps);

    let start = Instant::now();
    let result = plan_with_annealing_params(params, 0, &annealing_params);
    let elapsed = start.elapsed().as_secs_f64();

    println!(
        "annealing   : {:>8.0} ns/step  ({:.2}s / {} steps, result len={})",
        elapsed / steps as f64 * 1e9,
        elapsed,
        steps,
        result.len()
    );
}

/// A mid-craft state: 10 actions into the sample macro.
fn mid_state(params: &CraftParameter) -> CraftState {
    let prefix: Vec<CraftAction> = sample_macro()[..10].to_vec();
    run_macro(params, &prefix, 0, true)
}

fn time_it<F: FnMut()>(label: &str, iters: u64, per_turn_calls: f64, mut f: F) {
    for _ in 0..iters / 10 {
        f();
    }
    let start = Instant::now();
    for _ in 0..iters {
        f();
    }
    let ns = start.elapsed().as_secs_f64() / iters as f64 * 1e9;
    println!(
        "  {:<28}: {:>7.1} ns/call  x{:<4} = {:>6.1} ns/turn",
        label,
        ns,
        per_turn_calls,
        ns * per_turn_calls
    );
}

/// Breaks a single simulated turn down into its components. The `x N` column is
/// how many times each is invoked per turn of `run_macro`.
fn bench_breakdown(params: &CraftParameter) {
    let state = mid_state(params);
    println!("turn breakdown (state: turn={}, iq={}, cp={}):", state.turn, state.inner_quiet, state.cp);

    time_it("CraftState::clone", 2_000_000, 8., || {
        black_box(black_box(&state).clone());
    });
    time_it("is_playable", 2_000_000, 1., || {
        black_box(BasicTouch.is_playable(black_box(params), black_box(&state)));
    });
    time_it("factor table lookups", 2_000_000, 6., || {
        black_box(
            crafting_level(black_box(90))
                + progress_div(black_box(580))
                + progress_mod(black_box(580))
                + quality_div(black_box(580))
                + quality_mod(black_box(580)),
        );
    });
    time_it("transition_probabilities", 2_000_000, 1., || {
        black_box(transition_probabilities(black_box(params), black_box(&state)));
    });
    // was called once per `tweak` (i.e. once per annealing step) before hoisting
    time_it("available_actions", 1_000_000, 1., || {
        black_box(macroplan::available_actions(black_box(params)));
    });
    let factors = Factors::new(params);
    time_it("play_normal (BasicTouch)", 2_000_000, 1., || {
        black_box(BasicTouch.play_normal(black_box(params), black_box(&factors), black_box(&state)));
    });
    time_it("apply (BasicTouch)", 1_000_000, 1., || {
        black_box(BasicTouch.apply(black_box(params), black_box(&state)));
    });
    time_it("play (BasicTouch)", 1_000_000, 1., || {
        black_box(BasicTouch.play(black_box(params), black_box(&state)));
    });

    // once per annealing step, alongside one `run_macro`
    let annealing_params = default_annealing_params(1);
    let available = macroplan::available_actions(params);
    let actions = sample_macro();
    let mut rng = SmallRng::seed_from_u64(0);
    let mut buffer: Vec<CraftAction> = Vec::with_capacity(64);
    time_it("tweak", 2_000_000, 1., || {
        macroplan::tweak(&available, &actions, &state, &annealing_params, &mut rng, &mut buffer);
        black_box(&buffer);
    });
}

/// The DFS shares `apply` / `play` with the annealer, so it needs watching for
/// regressions. Uses a fixed depth rather than `adaptive_dfs`, whose runtime is
/// self-limiting and therefore useless as a benchmark.
fn bench_dfs(params: &CraftParameter) {
    let state = params.initial_state(0);
    let depth = 5;

    let start = Instant::now();
    let result = search::dfs(params, &state, depth);
    let elapsed = start.elapsed().as_secs_f64();

    println!(
        "dfs(depth={}) : {:>8.3} s   (score={:.6}, first={:?})",
        depth,
        elapsed,
        result.best_score,
        result.best_action_path.first()
    );
}

fn main() {
    let params = params();
    bench_breakdown(&params);
    bench_run_macro(&params);
    bench_annealing(&params);
    bench_dfs(&params);
}
