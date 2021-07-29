import React from "react";
import { CrafterGame } from "./components/CrafterGame";
import {call_wasm} from "./rustfuncs";


export function App(props: {}) {
    let itemParams = {
        internal_level: 490,
        max_durability: 55,
        max_progress: 12046,
        max_quality: 81447,
        standard_craftsmanship: 2180,
        standard_control: 2010,
        is_expert_recipe: true,
    };
    let playerParams = {
        raw_level: 80,
        craftsmanship: 2978,
        control: 2787,
        max_cp: 655,
    };
    let params = {
        player: playerParams,
        item: itemParams,
    };

    return (
        <div className={"m-5"}>
            <CrafterGame params={params}/>
        </div>
    );
}