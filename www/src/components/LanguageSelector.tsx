import React from "react";
import { Button } from "react-bootstrap";
import { useLanguage } from "../hooks/useLanguage";
import { supportedLanguages } from "../translation";

export function LanguageSelector() {
    const [language, setLanguage] = useLanguage();

    return <div>
        {supportedLanguages.map((lang) => {
            return <Button
                key={lang}
                variant={lang === language ? "secondary" : "outline-secondary"}
                onClick={(e) => setLanguage(lang)}
            >
                {lang}
            </Button>
        })}
    </div>
}