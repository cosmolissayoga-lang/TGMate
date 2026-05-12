import { useState } from "react";
import { StarsBalance } from "@/components/Payments/StarsBalance";
import { WithdrawCard } from "@/components/Payments/WithdrawCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WalletTransaction, LinkedCard } from "@/types";
import { useTelegram } from "@/hooks/useTelegram";

const BALANCE = 0;

const TX: WalletTransaction[] = [
  { id: "t1", amountStars: 50, label: "Донат от подписчика", at: "2026-05-10 14:22" },
  { id: "t2", amountStars: -20, label: "Комиссия платформы (демо)", at: "2026-05-09 09:10" },
];

const CARDS: LinkedCard[] = [{ id: "c1", last4: "4242", brand: "Visa" }];

export function Wallet() {
  const [balance] = useState(BALANCE);
  const { webApp } = useTelegram();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Кошелёк</h1>
        <p className="mt-1 text-sm tg-hint">Stars, вывод и история</p>
      </div>

      <StarsBalance balance={balance} />

      <WithdrawCard
        balance={balance}
        onWithdraw={(amount) => {
          webApp.showAlert(`Запрос на вывод ${amount} ⭐ (демо, баланс 0)`);
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">История транзакций</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {TX.map((t) => (
              <li key={t.id} className="flex justify-between gap-2 border-b border-[color:var(--tg-theme-hint-color)]/15 py-2 last:border-0">
                <div>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-xs tg-hint">{t.at}</p>
                </div>
                <span className={t.amountStars < 0 ? "text-destructive" : "tg-link"}>
                  {t.amountStars > 0 ? "+" : ""}
                  {t.amountStars} ⭐
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Привязанные карты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {CARDS.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-lg border border-[color:var(--tg-theme-hint-color)]/25 px-3 py-2 text-sm"
            >
              <span>
                {c.brand} ·••• {c.last4}
              </span>
              <span className="text-xs tg-hint">по умолчанию</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
