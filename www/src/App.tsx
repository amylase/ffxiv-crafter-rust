import React from "react";
import { CrafterGame } from "./components/CrafterGame";
import { LanguageSelector } from "./components/LanguageSelector";


export function App(props: {}) {
    return (
        <div className={"m-5"}>
            <LanguageSelector/>
            <CrafterGame/>
        </div>
    );
}