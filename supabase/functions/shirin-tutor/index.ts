// Shirin AI tutor — Supabase Edge Function
// Required secret: GEMINI_API_KEY
// Optional secrets: GEMINI_MODEL (default gemini-2.5-flash), SHIRIN_ALLOWED_ORIGIN
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const MODEL = Deno.env.get("GEMINI_MODEL") ?? "gemini-2.5-flash";
const API_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const ALLOWED_ORIGIN = Deno.env.get("SHIRIN_ALLOWED_ORIGIN") ?? "";

const SYSTEM_INSTRUCTION = `
You are Shirin AI, a patient and accurate Uzbek-language study tutor.
Teach a Grade 11 learner whose current English is beginner level and who is
building foundations in mathematics. The learner's academic interests are
Government and Political Economy, with SAT preparation as a long-term goal.

Teaching rules:
- Reply in Uzbek by default. Use simple English examples when teaching English.
- Explain one idea at a time, then give a short example and one practice question.
- Do not simply give answers to homework; guide the learner through the reasoning.
- For mathematics, show clear, age-appropriate steps and check arithmetic.
- For SAT, teach concepts and original practice questions; never claim questions
  are official unless they are from an explicitly supplied official source.
- For Government and Political Economy, distinguish facts, interpretations,
  and opinions. Encourage fairness, evidence, and balanced reasoning.
- Never promise admission to Harvard or any university.
- Do not request sensitive personal information, passwords, or payment details.
- If unsure, say so clearly and suggest how to verify the point.
`.trim();

function corsHeaders(origin: string) {
  const allowed = ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : "";
  return {
    "Access-Control-Allow-Origin": allowed || "null",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=utf-8",
  };
}

function json(status: number, body: Record<string, unknown>, origin: string) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(origin) });
}

serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json(405, { error: "Faqat POST so‘rovi qabul qilinadi." }, origin);
  }
  if (!API_KEY) {
    return json(503, { error: "AI xizmati hali sozlanmagan. GEMINI_API_KEY server secret sifatida qo‘shilishi kerak." }, origin);
  }
  if (ALLOWED_ORIGIN && origin !== ALLOWED_ORIGIN) {
    return json(403, { error: "Bu manbadan so‘rov yuborishga ruxsat yo‘q." }, origin);
  }

  let payload: { message?: unknown; history?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "So‘rov JSON formatida bo‘lishi kerak." }, origin);
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!message || message.length > 2000) {
    return json(400, { error: "Savol 1–2000 belgi oralig‘ida bo‘lishi kerak." }, origin);
  }

  const rawHistory = Array.isArray(payload.history) ? payload.history.slice(-8) : [];
  const history = rawHistory.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const entry = item as { role?: unknown; text?: unknown };
    const role = entry.role === "model" ? "model" : entry.role === "user" ? "user" : "";
    const text = typeof entry.text === "string" ? entry.text.trim().slice(0, 1500) : "";
    return role && text ? [{ role, parts: [{ text }] }] : [];
  });

  const contents = [
    ...history,
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents,
          generationConfig: { temperature: 0.35, maxOutputTokens: 700 },
        }),
        signal: AbortSignal.timeout(25000),
      },
    );

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Gemini API error", response.status, JSON.stringify(result).slice(0, 1000));
      return json(502, { error: "AI xizmatidan javob olishda xatolik. Birozdan keyin qayta urinib ko‘ring." }, origin);
    }

    const answer = result?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => typeof part.text === "string" ? part.text : "")
      .join("\n")
      .trim();

    if (!answer) {
      return json(502, { error: "AI hozir javob qaytara olmadi. Savolni boshqacha yozib ko‘ring." }, origin);
    }
    return json(200, { answer, model: MODEL }, origin);
  } catch (error) {
    console.error("Tutor request failed", error);
    return json(504, { error: "AI xizmatiga ulanish vaqti tugadi. Qayta urinib ko‘ring." }, origin);
  }
});
