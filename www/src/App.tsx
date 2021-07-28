import React from "react";
import {call_wasm} from "./wasmExample";


export function App(props: {}) {
    return (
    <button onClick={() => call_wasm()}>
        call wasm
    </button>);
}