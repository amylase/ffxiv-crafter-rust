import React, { useState } from "react";
import { CrafterGame } from "./components/CrafterGame";
import { LanguageSelector } from "./components/LanguageSelector";
import { translationProvider } from "./translation";
import { useLanguage } from "./hooks/useLanguage";
import { Alert } from "react-bootstrap";


export function App(props: {}) {
    const [language, setLanguage] = useLanguage();
    const [showAlert, setShowAlert] = useState(true);
    const t = translationProvider(language)
    return (
        <>
            <div className={"m-5"}>
                {showAlert ? <Alert variant="primary" onClose={() => setShowAlert(false)} dismissible>
                    <p>
                        {t("DawntrailReleased")}
                    </p>
                    <div>
                        <Alert.Link href="https://github.com/amylase/ffxiv-crafter-rust/issues/">{t("ReportBug")}</Alert.Link>
                    </div>
                    <div>
                        <Alert.Link href="https://www.shigure-hash.com/ffxiv-crafter-rust/endwalker/">{t("EndwalkerHere")}</Alert.Link>
                        <span> {t("EndwalkerForKoreaChina")}</span>
                    </div>
                </Alert> : null}
                <LanguageSelector/>
                <CrafterGame/>
            </div>
            <div className={"ml-5 mb-2"}>
                © 2024 <a href="https://github.com/amylase">amylase</a> (Shigure Hash@Typhon) and contributors. <a href="https://github.com/amylase/ffxiv-crafter-rust/issues">{t("ReportBug")}</a>
            </div>
        </>
    );
}