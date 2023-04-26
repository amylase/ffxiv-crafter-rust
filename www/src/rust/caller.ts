import { CraftAction, CraftParameter, CraftState } from "../models/gamestate";
import { SupportedMethod } from "./const";

function run(message: any[]): Promise<any> {
    const worker = new Worker("./worker.js");
    
    return new Promise((resolve, reject) => {
        worker.onmessage = (event) => {
            if (event.data === "worker ready") {
                worker.postMessage(message);
                return;
            }
            worker.terminate();
            resolve(event.data as CraftAction[]);
        }
        worker.onerror = (event) => {
            worker.terminate();
            reject(event);
        }
        worker.onmessageerror = () => {
            worker.terminate();
        }
    })
}

export function plan_macro(params: CraftParameter, initial_quality: number, longer: boolean): Promise<CraftAction[]> {
    return run([SupportedMethod.PLAN_MACRO, params, initial_quality, longer]);
}

export function search_best_move(params: CraftParameter, state: CraftState): Promise<CraftAction> {
    return run([SupportedMethod.SEARCH_BEST_MOVE, params, state]);
}