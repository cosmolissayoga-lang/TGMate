import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onPublishNow: () => void;
  onSchedule: (iso: string) => void;
};

export function SchedulingPanel({ onPublishNow, onSchedule }: Props) {
  const [when, setWhen] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 30);
    return d.toISOString().slice(0, 16);
  });

  return (
    <div className="space-y-3 rounded-xl border border-[color:var(--tg-theme-hint-color)]/30 p-4 tg-secondary-bg">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="button" className="flex-1 tg-button" onClick={onPublishNow}>
          Опубликовать сейчас
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={() => onSchedule(new Date(when).toISOString())}>
          Запланировать
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="schedule-at">Время публикации</Label>
        <Input
          id="schedule-at"
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
        />
      </div>
    </div>
  );
}
