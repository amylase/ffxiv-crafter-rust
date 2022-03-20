use crate::{macroplan::report, state::{PlayerParameter, ItemParameter, CraftParameter}};

mod factor;
mod action;
mod state;
mod macroplan;

fn main() {
    let player = PlayerParameter {
        job_level: 90,
        craftsmanship: 3252,
        control: 3174,
        max_cp: 577
    };
    let item = ItemParameter {
        recipe_level: 580,
        max_durability: 70,
        max_progress: 3900,
        max_quality: 10920,
    };
    let initial_quality = 5460;
    let params = CraftParameter {
        item,
        player
    };
    println!("{:?}", &params);
    let result = macroplan::plan(&params, initial_quality, false);
    println!("done.");
    println!("{:?}", result);
 
    report(&params, &result, initial_quality, true);
}
