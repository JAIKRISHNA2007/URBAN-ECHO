import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';
import '@/shared/i18n';
import '@/shared/theme/globals.css';
import { registerServiceWorker } from '@/pwa/register';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Application root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerServiceWorker();
