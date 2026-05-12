import { getSupabase } from "./supabase";

export type VerifyInitResponse =
  | { ok: true; user: unknown }
  | { ok: false; error: string };

export async function verifyInitData(initData: string): Promise<VerifyInitResponse> {
  const supabase = getSupabase();
  if (!supabase) {
    return { ok: false, error: "Supabase не настроен (VITE_SUPABASE_*)" };
  }
  const { data, error } = await supabase.functions.invoke<VerifyInitResponse>("verify-init", {
    body: { initData },
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  if (!data) {
    return { ok: false, error: "Пустой ответ" };
  }
  return data;
}
