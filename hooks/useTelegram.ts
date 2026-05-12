import { useEffect, useMemo, useState } from "react";
import WebApp from "@twa-dev/sdk";
import type { TelegramUser } from "@/types";

export function useTelegram() {
  const [initData, setInitData] = useState(WebApp.initData);
  const user = useMemo<TelegramUser | null>(() => {
    const u = WebApp.initDataUnsafe?.user;
    if (!u?.id) return null;
    return {
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      username: u.username,
      language_code: u.language_code,
      is_premium: u.is_premium,
    };
  }, []);

  useEffect(() => {
    setInitData(WebApp.initData);
  }, []);

  return {
    webApp: WebApp,
    initData,
    user,
    colorScheme: WebApp.colorScheme,
    themeParams: WebApp.themeParams,
  };
}
