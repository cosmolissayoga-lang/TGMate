import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import type { GeneratedPost } from "@/types";
import { PostPreview } from "./PostPreview";
import { SchedulingPanel } from "./SchedulingPanel";

const NICHES = ["юмор", "крипта", "бизнес", "лайфстайл"] as const;

function mockPosts(topic: string, niche: string): GeneratedPost[] {
  const base = topic.trim() || niche;
  return [
    {
      id: "1",
      title: `${base}: короткий хук`,
      emoji: "⚡",
      body: `🔥 ${base.toUpperCase()}\n\n3 вещи, которые стоит знать уже сегодня:\n\n1) Фокус > шум\n2) Маленький шаг каждый день\n3) Честность с аудиторией\n\nПишите в комментариях, что для вас важнее всего 👇`,
      mediaHint: "Вертикальное видео 9:16, 12–20 с, субтитры",
    },
    {
      id: "2",
      title: `Разбор: ${base}`,
      emoji: "🧠",
      body: `Разберём ${base} без воды.\n\nСуть в одном абзаце — дальше кейс и вывод.\n\n✅ Что работает\n❌ Что ломает вовлечение\n\nСохраните, чтобы не потерять.`,
      mediaHint: "Карусель 5–7 слайдов, обложка с крупным заголовком",
    },
    {
      id: "3",
      title: `История + урок`,
      emoji: "✨",
      body: `Я не ожидал(а), что ${base} окажется таким полезным уроком.\n\nБыло → стало → что изменил(а)\n\nЕсли узнали себя — репостните друзьям 🤝`,
      mediaHint: "Фото «до/после» или скрин переписки (с блюром данных)",
    },
  ];
}

type Props = {
  onToast?: (msg: string) => void;
};

export function ContentGenerator({ onToast }: Props) {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState<(typeof NICHES)[number]>("юмор");
  const [paid, setPaid] = useState(false);
  const [variants, setVariants] = useState<GeneratedPost[] | null>(null);
  const [activeTab, setActiveTab] = useState("1");

  const suggestedPrice = useMemo(() => {
    const t = topic.length + niche.length * 4;
    const base = 15 + (t % 40);
    return paid ? base : 0;
  }, [topic, niche, paid]);

  const generate = () => {
    setVariants(mockPosts(topic, niche));
    setActiveTab("1");
    onToast?.("Сгенерированы 3 варианта (демо-данные)");
  };

  const selected = variants?.find((v) => v.id === activeTab) ?? null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="topic">Тема</Label>
        <Input
          id="topic"
          placeholder="Например: запуск продукта, мем про понедельник…"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Ниша</Label>
        <div className="flex flex-wrap gap-2">
          {NICHES.map((n) => (
            <Button
              key={n}
              type="button"
              size="sm"
              variant={niche === n ? "default" : "outline"}
              className="rounded-full capitalize"
              onClick={() => setNiche(n)}
            >
              {n}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl border border-[color:var(--tg-theme-hint-color)]/30 p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Сделать платным</p>
          <p className="text-xs tg-hint">
            AI рекомендует: {paid ? `${suggestedPrice} ⭐` : "включите переключатель для оценки"}
          </p>
        </div>
        <Switch checked={paid} onCheckedChange={setPaid} />
      </div>

      <Button type="button" className="w-full tg-button h-11 rounded-xl" onClick={generate}>
        Сгенерировать 3 варианта
      </Button>

      {variants && (
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1">Вариант 1</TabsTrigger>
              <TabsTrigger value="2">Вариант 2</TabsTrigger>
              <TabsTrigger value="3">Вариант 3</TabsTrigger>
            </TabsList>
            {variants.map((v) => (
              <TabsContent key={v.id} value={v.id} className="mt-4">
                <PostPreview post={v} />
              </TabsContent>
            ))}
          </Tabs>

          {selected && (
            <SchedulingPanel
              onPublishNow={() => onToast?.("Публикация (демо)")}
              onSchedule={(iso) => onToast?.(`Запланировано на ${iso} (демо)`)}
            />
          )}
        </div>
      )}
    </div>
  );
}
