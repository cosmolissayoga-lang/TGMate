import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StarsPeriod } from "@/types";

const labels: Record<StarsPeriod, string> = {
  today: "Сегодня",
  week: "Неделя",
  month: "Месяц",
};

type Props = {
  period: StarsPeriod;
  stars: number;
};

export function StatsCard({ period, stars }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium tg-hint">{labels[period]}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold tabular-nums">{stars}</p>
        <p className="text-xs tg-hint">Stars</p>
      </CardContent>
    </Card>
  );
}
