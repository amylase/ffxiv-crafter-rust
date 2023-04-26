import { plan_macro, search_best_move } from "./rustfuncs";
import { SupportedMethod } from "./const";

self.onmessage = function(e) {
    const [method_name, ...args] = e.data;
    if (method_name === SupportedMethod.PLAN_MACRO) {
        const params = args[0];
        const initial_quality = args[1];
        const longer = args[2];
        const result = plan_macro(params, initial_quality, longer);
        this.postMessage(result, undefined);
    } else if (method_name === SupportedMethod.SEARCH_BEST_MOVE) {
        const params = args[0];
        const state = args[1];
        const result = search_best_move(params, state);
        this.postMessage(result, undefined);
    } else {
        this.postMessage("undefined method name: " + method_name, undefined);
    }
}

self.postMessage("worker ready", undefined);
