use ffxiv_crafter_rust::{PlayerParameter, ItemParameter, CraftParameter};

use crate::macroplan::report;

mod macroplan;

fn main() {
    let player = PlayerParameter {
        job_level: 80,
        craftsmanship: 2978,
        control: 2787,
        max_cp: 655
    };
    let item = ItemParameter {
        recipe_level: 418,
        max_durability: 80,
        max_progress: 1710,
        max_quality: 4500,
    };
    let params = CraftParameter {
        item,
        player
    };
    println!("{:?}", &params);
    let result = macroplan::plan(&params);
    println!("done.");
    println!("{:?}", result);
 
    report(&params, &result);
}
