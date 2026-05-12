import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeaderboardRow } from "@/types";

type Props = {
  rows: LeaderboardRow[];
};

export function Leaderboard({ rows }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Таблица лидеров</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-[color:var(--tg-theme-hint-color)]/20">
          {rows.map((r) => (
            <li key={r.rank} className="flex items-center justify-between py-2 text-sm">
              <span className="tg-hint tabular-nums">#{r.rank}</span>
              <span className="flex-1 truncate px-3 text-left font-medium">{r.name}</span>
              <span className="tabular-nums">{r.score}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
