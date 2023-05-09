import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contextApi/AuthContext';
import './index.scss';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

const root = ReactDOM.createRoot(document.getElementById('root'));

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  fallbackLng: 'es',
  resources: {
    en: {
      translation: require('./locales/en/translation.json'),
    },
    es: {
      translation: require('./locales/es/translation.json'),
    },
  },
});


root.render(
  <React.StrictMode>

    {/* wrap AuthProvider in App to pass value */}
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
      <App />
      </I18nextProvider>,
    </AuthProvider>


  </React.StrictMode>
);

