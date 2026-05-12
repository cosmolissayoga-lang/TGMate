import { Outlet, Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { cn } from "@/lib/utils";

export function Layout() {
  const { state: auth, tgUser } = useAuthContext();
  const userId =
    tgUser?.id ?? (auth.status === "authenticated" ? auth.user.id : undefined);
  const sub = useSubscription(userId);

  const displayName =
    auth.status === "authenticated"
      ? auth.user.first_name
      : tgUser?.first_name ?? "Гость";

  return (
    <div className="flex min-h-full flex-col">
      <header
        className={cn(
          "sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-[color:var(--tg-theme-hint-color,hsl(var(--border)))]/30",
          "bg-[color:var(--tg-theme-bg-color,hsl(var(--background)))]/90 px-4 py-3 backdrop-blur-md pt-[max(0.75rem,env(safe-area-inset-top))]"
        )}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">TGMate</p>
          <p className="truncate text-xs tg-hint">
            {displayName}
            {sub.status === "active" ? ` · ${sub.plan}` : sub.status === "none" ? " · без подписки" : ""}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0 rounded-full" asChild>
          <Link to="/settings" aria-label="Настройки">
            <Settings />
          </Link>
        </Button>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-28 pt-4">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
