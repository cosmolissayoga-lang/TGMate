import { useCallback, useEffect, useState } from "react";
import { verifyInitData } from "@/lib/api";
import type { TelegramUser } from "@/types";

type AuthState =
  | { status: "idle" | "loading" }
  | { status: "authenticated"; user: TelegramUser }
  | { status: "guest"; reason: string }
  | { status: "error"; message: string };

export function useAuth(initData: string) {
  const [state, setState] = useState<AuthState>({ status: "idle" });

  const verify = useCallback(async () => {
    if (!initData) {
      setState({
        status: "guest",
        reason: "Нет initData — откройте приложение в Telegram или задайте переменные Supabase.",
      });
      return;
    }
    setState({ status: "loading" });
    const res = await verifyInitData(initData);
    if (res.ok && res.user && typeof res.user === "object" && "id" in res.user) {
      setState({ status: "authenticated", user: res.user as TelegramUser });
      return;
    }
    if (!res.ok) {
      setState({ status: "error", message: res.error });
      return;
    }
    setState({ status: "guest", reason: "Не удалось распознать пользователя" });
  }, [initData]);

  useEffect(() => {
    void verify();
  }, [verify]);

  return { state, verify };
}
