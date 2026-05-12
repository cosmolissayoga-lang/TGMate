import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MiniGame } from "@/components/Gamification/MiniGame";
import { Leaderboard } from "@/components/Gamification/Leaderboard";
import type { MiniGame as MiniGameModel, LeaderboardRow } from "@/types";

const GAMES: MiniGameModel[] = [
  {
    id: "g1",
    kind: "predictions",
    title: "Предсказания",
    description: "Угадай исход и получи Stars подписчиков.",
    rewardStars: 5,
  },
  {
    id: "g2",
    kind: "wheel",
    title: "Колесо фортуны",
    description: "Крути колесо — случайная награда.",
    rewardStars: 10,
  },
  {
    id: "g3",
    kind: "quiz",
    title: "Викторина",
    description: "Быстрые вопросы на знание ниши.",
    rewardStars: 7,
  },
];

const BOARD: LeaderboardRow[] = [
  { rank: 1, name: "Анна", score: 1200 },
  { rank: 2, name: "Макс", score: 980 },
  { rank: 3, name: "Лиза", score: 940 },
  { rank: 4, name: "Иван", score: 860 },
];

export function Games() {
  const [reward, setReward] = useState("5");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Игры и задания</h1>
        <p className="mt-1 text-sm tg-hint">Мини-игры и таблица лидеров (заглушки)</p>
      </div>

      <div className="space-y-2 rounded-xl border border-[color:var(--tg-theme-hint-color)]/30 p-4 tg-secondary-bg">
        <Label htmlFor="reward">Награда по умолчанию (Stars)</Label>
        <Input
          id="reward"
          inputMode="numeric"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
        <p className="text-xs tg-hint">В продакшене значения пойдут в Supabase и настройки бота.</p>
      </div>

      <div className="space-y-3">
        {GAMES.map((g) => (
          <MiniGame key={g.id} game={{ ...g, rewardStars: Number(reward) || g.rewardStars }} />
        ))}
      </div>

      <Leaderboard rows={BOARD} />
    </div>
  );
}
