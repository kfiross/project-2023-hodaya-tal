type Language = {
    dropdownValue: string
    countryName: string
};
export enum PageDirection {
    RTL = "rtl",
    LTR = "ltr"
};
export const defaultLanguage = "he";

export const supportedLanguagesMap: Record<string, Language> = {
    he: { dropdownValue: "עברית", countryName: "Israel" },
    // en: { dropdownValue: "English", countryName: "USA" }
}

export const supportedLanguages = Object.keys(supportedLanguagesMap)

export function humanReadableLanguage(key = defaultLanguage) {
    return supportedLanguagesMap[key].dropdownValue
}

export function getCountryName(key = defaultLanguage) {
    return supportedLanguagesMap[key]?.countryName
}
