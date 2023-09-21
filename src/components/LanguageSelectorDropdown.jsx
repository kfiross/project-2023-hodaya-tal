import {useTranslation} from "react-i18next";

function LanguageSelectorDropdown() {
  const { i18n } = useTranslation()

  const handleLanguageChange = (newLanguage) => {
    // 👇 Effectuate the language change
    i18n.changeLanguage(newLanguage)
  };

  return (
    { /** Dropdown JSX goes here */ }
  )
}

export default LanguageSelectorDropdown
