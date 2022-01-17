use std::time::SystemTime;
use rand::{SeedableRng, Rng};

mod state;
mod factor;
mod search;
mod action;


fn main() {
    let player = state::PlayerParameter {
        job_level: 80,
        craftsmanship: 2978,
        control: 2787,
        max_cp: 655
    };
    let item = state::ItemParameter {
        recipe_level: 516,
        max_durability: 55,
        max_progress: 5059,
        max_quality: 15474,
        is_expert_recipe: true
    };
    let params = state::CraftParameter {
        item,
        player
    };
    let mut state = params.initial_state();

    let depth = 3;
    let seed = 0;

    let mut rng = rand::rngs::StdRng::seed_from_u64(seed);
    println!("{:?}", &params);

    let total_time = SystemTime::now();
    while state.result == state::CraftResult::ONGOING {
        println!("{:?}", state);
        let current_score = search::terminal_score(&params, &search::playout(&params, &state));
        println!("score: {:.3} (predicted quality: {})", current_score, (current_score * params.item.max_quality as f64) as i64);
        let time = SystemTime::now();
        let dfs_result = search::dfs(&params, &state, depth);
        let elapsed_sec = time.elapsed().unwrap().as_secs_f64();
        println!("{:?}, elapsed: {:.3}, score: {:.3} (predicted quality: {})", dfs_result.best_action_path, elapsed_sec, dfs_result.best_score, (dfs_result.best_score * params.item.max_quality as f64) as i64);

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
    let total_time_elapsed = total_time.elapsed().unwrap().as_secs_f64();
    println!("done.");
    println!("{:?}", state);
    println!("total time: {:.3}", total_time_elapsed);
}