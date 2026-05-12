import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { useAuthContext } from "@/context/AuthContext";
import type { PostMetric } from "@/types";

const MOCK_STATS = { today: 42, week: 180, month: 640 } as const;

const MOCK_POSTS: PostMetric[] = [
  { id: "p1", title: "3 привычки продуктивности", likes: 128, donationsStars: 12 },
  { id: "p2", title: "Мини-гайд по крипте", likes: 96, donationsStars: 0 },
];

export function Home() {
  const { state: auth, tgUser } = useAuthContext();

  const name =
    auth.status === "authenticated"
      ? auth.user.first_name
      : tgUser?.first_name ?? "друг";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Привет, {name}!</h1>
        <p className="mt-1 text-sm tg-hint">Дашборд и быстрые действия</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <StatsCard period="today" stars={MOCK_STATS.today} />
        <StatsCard period="week" stars={MOCK_STATS.week} />
        <StatsCard period="month" stars={MOCK_STATS.month} />
      </div>

      <QuickActions />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Последние посты</h2>
          <Link to="/studio" className="text-xs tg-link">
            В студию
          </Link>
        </div>
        <div className="space-y-2">
          {MOCK_POSTS.map((p) => (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium leading-snug">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4 text-xs tg-hint">
                <span>❤️ {p.likes}</span>
                <span>⭐ {p.donationsStars}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {auth.status === "error" && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
          Авторизация: {auth.message}
        </p>
      )}
    </div>
  );
}
