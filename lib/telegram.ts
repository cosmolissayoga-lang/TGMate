import WebApp from "@twa-dev/sdk";

export function getTelegramWebApp() {
  return WebApp;
}

export function initTelegramApp() {
  WebApp.ready();
  WebApp.expand();
}
