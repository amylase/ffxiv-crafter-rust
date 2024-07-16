import React from "react";
import { CrafterGame } from "./components/CrafterGame";
import { LanguageSelector } from "./components/LanguageSelector";
import { translationProvider } from "./translation";
import { useLanguage } from "./hooks/useLanguage";
import { Alert } from "react-bootstrap";


export function App(props: {}) {
    const [language, setLanguage] = useLanguage();
    const t = translationProvider(language)
    return (
        <>
            <Alert variant="warning">
                {t("ThisIsEndwalker")}
            </Alert>
            <div className={"m-5"}>
                <LanguageSelector/>
                <CrafterGame/>
            </div>
            <div className={"ml-5 mb-2"}>
                © 2023 <a href="https://github.com/amylase">amylase</a> (Shigure Hash@Typhon) and contributors. <a href="https://github.com/amylase/ffxiv-crafter-rust/issues">{t("ReportBug")}</a>
            </div>
        </>
    );
}