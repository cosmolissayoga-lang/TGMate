import { createContext, useContext, type ReactNode } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import { useAuth } from "@/hooks/useAuth";
import type { TelegramUser } from "@/types";

type AuthContextValue = ReturnType<typeof useAuth> & {
  tgUser: TelegramUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { initData, user: tgUser } = useTelegram();
  const auth = useAuth(initData);
  const value: AuthContextValue = { ...auth, tgUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
