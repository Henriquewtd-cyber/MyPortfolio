import pt from "../locales/pt.json";
import en from "../locales/en.json";

const translations = { pt, en };

export function t(key, lang = "pt") {
    return translations[lang]?.[key] ?? "";
}