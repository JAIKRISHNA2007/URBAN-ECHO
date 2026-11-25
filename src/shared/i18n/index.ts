import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from './resources';

const storedLanguage = window.localStorage.getItem('preferred-language');
const initialLanguage = storedLanguage === 'ta' ? 'ta' : 'en';

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  supportedLngs: ['en', 'ta'],
  interpolation: {
    escapeValue: false,
  },
});

void i18n.on('languageChanged', (language) => {
  const normalizedLanguage = language === 'ta' ? 'ta' : 'en';
  document.documentElement.lang = normalizedLanguage;
  window.localStorage.setItem('preferred-language', normalizedLanguage);
});

document.documentElement.lang = initialLanguage;

export default i18n;
