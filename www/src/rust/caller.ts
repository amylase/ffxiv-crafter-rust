import { CraftAction, CraftParameter, CraftState } from "../models/gamestate";
import { SupportedMethod } from "./const";

const worker = new Worker("./worker.js");

export function plan_macro(params: CraftParameter, initial_quality: number, longer: boolean): Promise<CraftAction[]> {
    return new Promise((resolve, reject) => {
        worker.onmessage = (event) => {
            resolve(event.data as CraftAction[]);
        }
        worker.onerror = reject
        worker.postMessage([SupportedMethod.PLAN_MACRO, params, initial_quality, longer]);
    })
}

export function search_best_move(params: CraftParameter, state: CraftState): Promise<CraftAction> {
    return new Promise((resolve, reject) => {
        worker.onmessage = (event) => {
            resolve(event.data as CraftAction);
        }
        worker.onerror = reject
        worker.postMessage([SupportedMethod.SEARCH_BEST_MOVE, params, state]);
    })
}