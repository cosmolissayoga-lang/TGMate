import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  balance: number;
  onWithdraw?: (amount: number) => void;
};

export function WithdrawCard({ balance, onWithdraw }: Props) {
  const [amount, setAmount] = useState("");

  const submit = () => {
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return;
    onWithdraw?.(n);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Вывод на карту</CardTitle>
        <CardDescription>Интеграция Stars → Stripe / ЮMoney (заглушка UI).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="wd-amount">Сумма (Stars)</Label>
          <Input
            id="wd-amount"
            inputMode="numeric"
            placeholder="Например: 100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-xs tg-hint">Доступно: {balance} ⭐</p>
        </div>
        <Button type="button" className="w-full tg-button" onClick={submit}>
          Вывести на карту
        </Button>
      </CardContent>
    </Card>
  );
}
