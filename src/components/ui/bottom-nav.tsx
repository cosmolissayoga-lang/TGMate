import { NavLink } from "react-router-dom";
import { Home, Sparkles, Gamepad2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/studio", label: "AI", icon: Sparkles },
  { to: "/games", label: "Игры", icon: Gamepad2 },
  { to: "/wallet", label: "Кошелёк", icon: Wallet },
] as const;

export function BottomNav() {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-[color:var(--tg-theme-hint-color,hsl(var(--border)))]/40",
        "bg-[color:var(--tg-theme-bg-color,hsl(var(--background)))]/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      )}
      aria-label="Основная навигация"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around gap-1 px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"} className="flex-1">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "h-12 w-full flex-col gap-0.5 rounded-xl text-[11px] font-medium",
                  isActive && "tg-secondary-bg"
                )}
              >
                <Icon className="size-5" aria-hidden />
                <span>{label}</span>
              </Button>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
