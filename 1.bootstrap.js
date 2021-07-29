(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../pkg/ffxiv_crafter_rust.js":
/*!************************************!*\
  !*** ../pkg/ffxiv_crafter_rust.js ***!
  \************************************/
/*! exports provided: greet, search_best_move, apply_action, play_action, available_actions, __wbg_alert_78e0020f2c65fff5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ffxiv_crafter_rust_bg.wasm */ "../pkg/ffxiv_crafter_rust_bg.wasm");
/* harmony import */ var _ffxiv_crafter_rust_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ffxiv_crafter_rust_bg.js */ "../pkg/ffxiv_crafter_rust_bg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "greet", function() { return _ffxiv_crafter_rust_bg_js__WEBPACK_IMPORTED_MODULE_1__["greet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "search_best_move", function() { return _ffxiv_crafter_rust_bg_js__WEBPACK_IMPORTED_MODULE_1__["search_best_move"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "apply_action", function() { return _ffxiv_crafter_rust_bg_js__WEBPACK_IMPORTED_MODULE_1__["apply_action"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "play_action", function() { return _ffxiv_crafter_rust_bg_js__WEBPACK_IMPORTED_MODULE_1__["play_action"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "available_actions", function() { return _ffxiv_crafter_rust_bg_js__WEBPACK_IMPORTED_MODULE_1__["available_actions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_alert_78e0020f2c65fff5", function() { return _ffxiv_crafter_rust_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_alert_78e0020f2c65fff5"]; });




/***/ }),

/***/ "../pkg/ffxiv_crafter_rust_bg.js":
/*!***************************************!*\
  !*** ../pkg/ffxiv_crafter_rust_bg.js ***!
  \***************************************/
/*! exports provided: greet, search_best_move, apply_action, play_action, available_actions, __wbg_alert_78e0020f2c65fff5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "greet", function() { return greet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "search_best_move", function() { return search_best_move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apply_action", function() { return apply_action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "play_action", function() { return play_action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "available_actions", function() { return available_actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_alert_78e0020f2c65fff5", function() { return __wbg_alert_78e0020f2c65fff5; });
/* harmony import */ var _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ffxiv_crafter_rust_bg.wasm */ "../pkg/ffxiv_crafter_rust_bg.wasm");


const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetUint8Memory0 = new Uint8Array(_ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
*/
function greet() {
    _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["greet"]();
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

const u32CvtShim = new Uint32Array(2);

const int64CvtShim = new BigInt64Array(u32CvtShim.buffer);

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetInt32Memory0 = new Int32Array(_ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
    }
    return cachegetInt32Memory0;
}
/**
* @param {string} params_str
* @param {string} state_str
* @param {BigInt} depth
* @returns {string}
*/
function search_best_move(params_str, state_str, depth) {
    try {
        const retptr = _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_add_to_stack_pointer"](-16);
        var ptr0 = passStringToWasm0(params_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(state_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len1 = WASM_VECTOR_LEN;
        int64CvtShim[0] = depth;
        const low2 = u32CvtShim[0];
        const high2 = u32CvtShim[1];
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["search_best_move"](retptr, ptr0, len0, ptr1, len1, low2, high2);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_add_to_stack_pointer"](16);
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](r0, r1);
    }
}

/**
* @param {string} params_str
* @param {string} state_str
* @param {string} action_str
* @returns {string}
*/
function apply_action(params_str, state_str, action_str) {
    try {
        const retptr = _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_add_to_stack_pointer"](-16);
        var ptr0 = passStringToWasm0(params_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(state_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passStringToWasm0(action_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len2 = WASM_VECTOR_LEN;
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["apply_action"](retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_add_to_stack_pointer"](16);
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](r0, r1);
    }
}

/**
* @param {string} params_str
* @param {string} state_str
* @param {string} action_str
* @returns {string}
*/
function play_action(params_str, state_str, action_str) {
    try {
        const retptr = _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_add_to_stack_pointer"](-16);
        var ptr0 = passStringToWasm0(params_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(state_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passStringToWasm0(action_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len2 = WASM_VECTOR_LEN;
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["play_action"](retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_add_to_stack_pointer"](16);
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](r0, r1);
    }
}

/**
* @param {string} state_str
* @returns {string}
*/
function available_actions(state_str) {
    try {
        const retptr = _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_add_to_stack_pointer"](-16);
        var ptr0 = passStringToWasm0(state_str, _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"], _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"]);
        var len0 = WASM_VECTOR_LEN;
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["available_actions"](retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_add_to_stack_pointer"](16);
        _ffxiv_crafter_rust_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](r0, r1);
    }
}

function __wbg_alert_78e0020f2c65fff5(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "../pkg/ffxiv_crafter_rust_bg.wasm":
/*!*****************************************!*\
  !*** ../pkg/ffxiv_crafter_rust_bg.wasm ***!
  \*****************************************/
/*! exports provided: memory, greet, search_best_move, apply_action, play_action, available_actions, __wbindgen_add_to_stack_pointer, __wbindgen_malloc, __wbindgen_realloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(/*! ./ffxiv_crafter_rust_bg.js */ "../pkg/ffxiv_crafter_rust_bg.js");


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var CrafterGame_1 = __webpack_require__(/*! ./components/CrafterGame */ "./src/components/CrafterGame.tsx");
function App(props) {
    var itemParams = {
        internal_level: 490,
        max_durability: 55,
        max_progress: 12046,
        max_quality: 81447,
        standard_craftsmanship: 2180,
        standard_control: 2010,
        is_expert_recipe: true,
    };
    var playerParams = {
        raw_level: 80,
        craftsmanship: 2978,
        control: 2787,
        max_cp: 655,
    };
    var params = {
        player: playerParams,
        item: itemParams,
    };
    return (jsx_runtime_1.jsx("div", __assign({ className: "m-5" }, { children: jsx_runtime_1.jsx(CrafterGame_1.CrafterGame, { params: params }, void 0) }), void 0));
}
exports.App = App;


/***/ }),

/***/ "./src/components/CrafterGame.tsx":
/*!****************************************!*\
  !*** ./src/components/CrafterGame.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrafterGame = void 0;
var jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_bootstrap_1 = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
var gamestate_1 = __webpack_require__(/*! ../models/gamestate */ "./src/models/gamestate.ts");
var rustfuncs_1 = __webpack_require__(/*! ../rustfuncs */ "./src/rustfuncs.ts");
var GameStateView_1 = __webpack_require__(/*! ./GameStateView */ "./src/components/GameStateView.tsx");
function CrafterGame(props) {
    var params = props.params;
    var _a = react_1.useState(gamestate_1.initial_state(params)), craftState = _a[0], setCraftState = _a[1];
    var _b = react_1.useState(false), aiAdviceEnabled = _b[0], setAiAdviceEnabled = _b[1];
    var possible_actions = rustfuncs_1.available_actions(craftState);
    function onActionButtonClickFactory(action) {
        return function () {
            var rand = Math.random();
            var nextStates = rustfuncs_1.play_action(params, craftState, action);
            var accumulate = 0.;
            var sampledState;
            for (var _i = 0, nextStates_1 = nextStates; _i < nextStates_1.length; _i++) {
                var nextState = nextStates_1[_i];
                accumulate += nextState.probability;
                if (rand <= accumulate) {
                    sampledState = nextState.state;
                    break;
                }
            }
            setCraftState(sampledState);
        };
    }
    function onResetButtonClick() {
        setCraftState(gamestate_1.initial_state(params));
    }
    var aiAdvice;
    if (aiAdviceEnabled && craftState.result === "ONGOING") {
        aiAdvice = rustfuncs_1.search_best_move(params, craftState, 3);
    }
    ;
    var action_buttons = gamestate_1.craftActions.map(function (action) {
        var disabled;
        var variant;
        if (action === aiAdvice) {
            disabled = false;
            variant = "success";
        }
        else if (possible_actions.some(function (possible_action) { return possible_action == action; })) {
            disabled = false;
            variant = "primary";
        }
        else {
            disabled = true;
            variant = "secondary";
        }
        return jsx_runtime_1.jsx(react_bootstrap_1.Button, __assign({ variant: variant, disabled: disabled, onClick: onActionButtonClickFactory(action) }, { children: action }), action);
    });
    function onAiAdviceCheckChange(event) {
        setAiAdviceEnabled(event.target.value);
    }
    return jsx_runtime_1.jsxs(react_bootstrap_1.Form, { children: [jsx_runtime_1.jsx(GameStateView_1.GameStateView, { params: params, state: craftState }, void 0), jsx_runtime_1.jsx(react_bootstrap_1.Form.Group, __assign({ className: "mb-3" }, { children: action_buttons }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Form.Group, __assign({ className: "mb-3" }, { children: jsx_runtime_1.jsx(react_bootstrap_1.Form.Check, { type: "checkbox", label: "Enable AI Advice", onChange: onAiAdviceCheckChange }, void 0) }), void 0), aiAdviceEnabled ?
                jsx_runtime_1.jsxs(react_bootstrap_1.Form.Group, __assign({ className: "mb-3" }, { children: ["AI Advice: ", aiAdvice] }), void 0)
                : null, jsx_runtime_1.jsx(react_bootstrap_1.Button, __assign({ variant: "danger", onClick: onResetButtonClick }, { children: "Reset" }), void 0)] }, void 0);
}
exports.CrafterGame = CrafterGame;


/***/ }),

/***/ "./src/components/GameStateView.tsx":
/*!******************************************!*\
  !*** ./src/components/GameStateView.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStateView = void 0;
var jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function GameStateView(props) {
    var params = props.params, state = props.state;
    var buffs = ["inner_quiet", "innovation", "veneration", "muscle_memory", "waste_not", "great_strides", "final_appraisal", "manipulation"];
    var buffStatuses = [];
    for (var _i = 0, buffs_1 = buffs; _i < buffs_1.length; _i++) {
        var buffName = buffs_1[_i];
        if (state[buffName] > 0) {
            buffStatuses.push(buffName + ": " + state[buffName]);
        }
    }
    return jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsxs("p", { children: ["durability: ", state.durability, " / ", params.item.max_durability] }, void 0), jsx_runtime_1.jsxs("p", { children: ["progress: ", state.progress, " / ", params.item.max_progress] }, void 0), jsx_runtime_1.jsxs("p", { children: ["quality: ", state.quality, " / ", params.item.max_quality] }, void 0), jsx_runtime_1.jsxs("p", { children: ["cp: ", state.cp, " / ", params.player.max_cp] }, void 0), jsx_runtime_1.jsx("p", { children: buffStatuses.join(", ") }, void 0), jsx_runtime_1.jsxs("p", { children: ["condition: ", state.condition] }, void 0)] }, void 0);
}
exports.GameStateView = GameStateView;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
var App_1 = __webpack_require__(/*! ./App */ "./src/App.tsx");
react_dom_1.default.render(jsx_runtime_1.jsx(react_1.default.StrictMode, { children: jsx_runtime_1.jsx(App_1.App, {}, void 0) }, void 0), document.getElementById('root'));


/***/ }),

/***/ "./src/models/gamestate.ts":
/*!*********************************!*\
  !*** ./src/models/gamestate.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.initial_state = exports.craftActions = exports.craftResults = exports.statusConditions = void 0;
exports.statusConditions = [
    "NORMAL",
    "GOOD",
    "EXCELLENT",
    "POOR",
    "CENTRED",
    "PLIANT",
    "STURDY",
    "MALLEABLE",
    "PRIMED",
];
exports.craftResults = [
    "ONGOING",
    "FAILED",
    "SUCCESS",
];
exports.craftActions = [
    "BasicSynthesis",
    "BasicTouch",
    "MastersMend",
    "InnerQuiet",
    "DelicateSynthesis",
    "CarefulSynthesis",
    "Groundwork",
    "Observe",
    "ByregotBlessing",
    "PreparatoryTouch",
    "RapidSynthesis",
    "IntensiveSynthesis",
    "HastyTouch",
    "PreciseTouch",
    "PatientTouch",
    "TrickOfTheTrade",
    "Innovation",
    "Veneration",
    "MuscleMemory",
    "FocusedSynthesis",
    "StandardTouch",
    "FocusedTouch",
    "Reflect",
    "WasteNot",
    "WasteNotII",
    "PrudentTouch",
    "GreatStrides",
    "FinalAppraisal",
    "Manipulation",
];
function initial_state(params) {
    return {
        durability: params.item.max_durability,
        progress: 0,
        quality: 0,
        cp: params.player.max_cp,
        condition: "NORMAL",
        inner_quiet: 0,
        innovation: 0,
        veneration: 0,
        muscle_memory: 0,
        waste_not: 0,
        great_strides: 0,
        final_appraisal: 0,
        manipulation: 0,
        turn: 1,
        result: "ONGOING",
    };
}
exports.initial_state = initial_state;


/***/ }),

/***/ "./src/rustfuncs.ts":
/*!**************************!*\
  !*** ./src/rustfuncs.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.call_wasm = exports.available_actions = exports.play_action = exports.apply_action = exports.search_best_move = void 0;
var wasm = __importStar(__webpack_require__(/*! ffxiv-crafter-rust */ "../pkg/ffxiv_crafter_rust.js"));
function search_best_move(params, state, depth) {
    return JSON.parse(wasm.search_best_move(JSON.stringify(params), JSON.stringify(state), BigInt(depth)));
}
exports.search_best_move = search_best_move;
function apply_action(params, state, action) {
    var serialized_states = wasm.apply_action(JSON.stringify(params), JSON.stringify(state), action);
    return JSON.parse(serialized_states);
}
exports.apply_action = apply_action;
function play_action(params, state, action) {
    var serialized_states = wasm.play_action(JSON.stringify(params), JSON.stringify(state), action);
    return JSON.parse(serialized_states);
}
exports.play_action = play_action;
function available_actions(state) {
    var available_actions_str = wasm.available_actions(JSON.stringify(state));
    return JSON.parse(available_actions_str);
}
exports.available_actions = available_actions;
function call_wasm() {
    var item_params = {
        internal_level: 490,
        max_durability: 55,
        max_progress: 12046,
        max_quality: 81447,
        standard_craftsmanship: 2180,
        standard_control: 2010,
        is_expert_recipe: true,
    };
    var player_params = {
        raw_level: 80,
        craftsmanship: 2978,
        control: 2787,
        max_cp: 655,
    };
    var crafter_params = {
        player: player_params,
        item: item_params,
    };
    var state = {
        durability: item_params.max_durability,
        progress: 0,
        quality: 0,
        cp: player_params.max_cp,
        condition: "NORMAL",
        inner_quiet: 0,
        innovation: 0,
        veneration: 0,
        muscle_memory: 0,
        waste_not: 0,
        great_strides: 0,
        final_appraisal: 0,
        manipulation: 0,
        turn: 1,
        prev_action: "MuscleMemory",
        result: "ONGOING",
    };
    alert(state);
    var best_move = wasm.search_best_move(JSON.stringify(crafter_params), JSON.stringify(state), BigInt(3));
    alert(best_move);
}
exports.call_wasm = call_wasm;


/***/ })

}]);
//# sourceMappingURL=1.bootstrap.js.map