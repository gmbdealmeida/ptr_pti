import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import pt from './locale/pt.json'
import en from './locale/en.json'

const fallbackLng = ['pt'];
const availableLanguages = ['en', 'pt'];
const resources = {
  pt: pt, 
  en: en
}

i18n
  .use(Backend) // load translations using http (default /locale)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng, // fallback language is portuguese.

    detection: {
      checkWhitelist: true, // options for language detection
    },

    debug: true,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;