import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MiniGame as MiniGameModel } from "@/types";

type Props = {
  game: MiniGameModel;
  onPlay?: (id: string) => void;
};

export function MiniGame({ game, onPlay }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{game.title}</CardTitle>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2">
        <p className="text-sm tg-hint">Награда: {game.rewardStars} ⭐</p>
        <Button size="sm" variant="secondary" onClick={() => onPlay?.(game.id)}>
          Скоро
        </Button>
      </CardContent>
    </Card>
  );
}
