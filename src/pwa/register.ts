import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker(): void {
  registerSW({
    immediate: false,
    onRegisterError(error) {
      if (import.meta.env.DEV) {
        console.error('Service worker registration failed.', error);
      }
    },
  });
}
