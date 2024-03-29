import { CraftConfiguration } from "../models/gamestate";

const localStorageKey = "ffxiv-crafter-craft-configuration";

export function useCraftConfiguration() {
    function getConfig() {
        let config;
        if (localStorage.getItem(localStorageKey)) {
            config = JSON.parse(localStorage.getItem(localStorageKey))
        } else {
            const itemParams = {
                recipe_level: 516,
                max_durability: 55,
                max_progress: 5059,
                max_quality: 15474,
            };
            const playerParams = {
                job_level: 80,
                craftsmanship: 2978,
                control: 2787,
                max_cp: 655,
                unavailable_actions: [],
            };
            const craftParameter = {
                player: playerParams,
                item: itemParams,
            };
            config = {
                params: craftParameter,
                initialQuality: 0
            }
        }
        if (!config.params.player.unavailable_actions) {
            config.params.player.unavailable_actions = [];
        }
        return config;    
    }

    function setConfig(newValue: CraftConfiguration) {
        localStorage.setItem(localStorageKey, JSON.stringify(newValue));
    }
    return {getCraftConfig: getConfig, setCraftConfig: setConfig};

}