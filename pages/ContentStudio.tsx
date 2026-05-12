import { ContentGenerator } from "@/components/ContentAI/ContentGenerator";
import { useTelegram } from "@/hooks/useTelegram";

export function ContentStudio() {
  const { webApp } = useTelegram();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Studio</h1>
        <p className="mt-1 text-sm tg-hint">Тема, ниша и три варианта поста (демо)</p>
      </div>
      <ContentGenerator
        onToast={(msg) => {
          webApp.showAlert(msg);
        }}
      />
    </div>
  );
}
