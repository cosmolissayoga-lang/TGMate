import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GeneratedPost } from "@/types";

type Props = {
  post: GeneratedPost;
};

export function PostPreview({ post }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="text-2xl" aria-hidden>
            {post.emoji}
          </span>
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{post.body}</pre>
        <p className="rounded-md border border-dashed border-[color:var(--tg-theme-hint-color)]/40 p-2 text-xs tg-hint">
          Медиа: {post.mediaHint}
        </p>
      </CardContent>
    </Card>
  );
}
