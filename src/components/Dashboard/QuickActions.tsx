import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="flex flex-col gap-3">
      <Button className="h-12 w-full rounded-xl tg-button text-base font-semibold shadow-md" asChild>
        <Link to="/studio">
          <Sparkles className="size-5" />
          Создать пост с AI
        </Link>
      </Button>
    </div>
  );
}
