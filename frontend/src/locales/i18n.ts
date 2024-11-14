import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translation.json';
import translationKO from './ko/translation.json';

const resources = {
  'ko-KR': {
    translation: translationKO,
  },
  'en-US': {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US', // 번역 파일에서 찾을 수 없는 경우 기본 언어
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
