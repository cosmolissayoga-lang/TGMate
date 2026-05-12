import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function Settings() {
  const [haptics, setHaptics] = useState(true);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Настройки</h1>
        <p className="mt-1 text-sm tg-hint">Локальные переключатели (демо)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Оформление</CardTitle>
          <CardDescription>Тема берётся из Telegram (CSS-переменные tg-theme).</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <Label htmlFor="haptics" className="text-sm">
            Подсказки по вибрации (демо)
          </Label>
          <Switch id="haptics" checked={haptics} onCheckedChange={setHaptics} />
        </CardContent>
      </Card>
    </div>
  );
}
