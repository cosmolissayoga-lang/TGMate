import { useEffect, useState } from "react";

export type SubscriptionState =
  | { status: "unknown" }
  | { status: "active"; plan: string }
  | { status: "none" };

/** Заглушка: в продакшене здесь запрос к Supabase (таблица profiles / subscriptions). */
export function useSubscription(_userId: number | undefined) {
  const [state, setState] = useState<SubscriptionState>({ status: "unknown" });

  useEffect(() => {
    const t = window.setTimeout(() => {
      setState({ status: "active", plan: "TGMate Free" });
    }, 400);
    return () => window.clearTimeout(t);
  }, [_userId]);

  return state;
}
