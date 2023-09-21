'use client'

import {defaultLanguage, supportedLanguages} from "@/constants/languages";
import {initReactI18next} from "react-i18next";
import * as translationFiles from "./locales";
import i18n from "i18next"


i18n
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        fallbackLng: defaultLanguage,
        supportedLngs: supportedLanguages,
        load: "currentOnly",
        lowerCaseLng: true,
        preload: [defaultLanguage, "en"],
        resources: {
            // 👇 Translations loaded from ./locales/**/*.json
            ...translationFiles
        }
    })
    .then(()=> console.log("i18 initialized"))
    .catch((err) => console.log(err))

export default i18n
