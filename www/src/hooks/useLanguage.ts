import {SupportedLanguage} from "../translation";

const searchKey = "lang";
const localStorageKey = "ffxiv-crafter-language";

export function useLanguage(): [SupportedLanguage, (SupportedLanguage) => void] {
    let language = new URLSearchParams(window.location.search.substring(1)).get(searchKey);
    if (!language) {
        language = localStorage.getItem(localStorageKey); 
    }
    if (!language) {
        language = "en";
    }
    function setLanguage(newLanguage: SupportedLanguage) {
        localStorage.setItem(localStorageKey, newLanguage);
        location.search = `?lang=${newLanguage}`;
    }
    return [language, setLanguage];
}