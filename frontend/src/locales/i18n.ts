import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translation.json';
import translationJP from './jp/translation.json';
import translationKO from './ko/translation.json';

const resources = {
  'ko-KR': {
    translation: translationKO,
  },
  ko: {
    translation: translationKO,
  },
  'en-US': {
    translation: translationEN,
  },
  en: {
    translation: translationEN,
  },
  'ja-JP': {
    translation: translationJP,
  },
  ja: {
    translation: translationJP,
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
    detection: {
      order: ['navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
