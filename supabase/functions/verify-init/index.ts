import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function hexLower(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmacSha256(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, data);
  return new Uint8Array(sig);
}

/** Валидация initData по https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app */
async function parseValidInitData(
  initData: string,
  botToken: string
): Promise<Record<string, string> | null> {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");

  const keys = [...new Set([...params.keys()])].sort();
  const enc = new TextEncoder();
  const dataCheckString = keys.map((k) => `${k}=${params.get(k) ?? ""}`).join("\n");

  const secretKey = await hmacSha256(enc.encode("WebAppData"), enc.encode(botToken));
  const digest = await hmacSha256(secretKey, enc.encode(dataCheckString));
  const computed = hexLower(digest.buffer);

  if (computed.toLowerCase() !== hash.toLowerCase()) return null;

  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = params.get(k);
    if (v !== null) out[k] = v;
  }
  return out;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!botToken) {
      return new Response(JSON.stringify({ ok: false, error: "TELEGRAM_BOT_TOKEN is not set" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as { initData?: unknown };
    const initData = body.initData;
    if (typeof initData !== "string" || !initData.length) {
      return new Response(JSON.stringify({ ok: false, error: "initData is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fields = await parseValidInitData(initData, botToken);
    if (!fields) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid initData signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authDate = Number(fields.auth_date);
    if (!Number.isFinite(authDate)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid auth_date" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 86400) {
      return new Response(JSON.stringify({ ok: false, error: "initData is too old" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let user: unknown = null;
    if (fields.user) {
      try {
        user = JSON.parse(fields.user);
      } catch {
        return new Response(JSON.stringify({ ok: false, error: "Invalid user JSON" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    return new Response(JSON.stringify({ ok: true, user }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
