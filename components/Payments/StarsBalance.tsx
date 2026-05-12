import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  balance: number;
};

export function StarsBalance({ balance }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium tg-hint">Баланс Stars</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tabular-nums">{balance}</p>
        <p className="text-xs tg-hint">обновляется в реальном времени (демо)</p>
      </CardContent>
    </Card>
  );
}
