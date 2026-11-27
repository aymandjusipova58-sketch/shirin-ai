const MODEL = "gemini-2.5-flash";
const SYSTEM = `You are Shirin AI, a patient and accurate Uzbek-language study tutor.
Teach a school-age learner. Reply in Uzbek by default; use simple English examples for English lessons.
Teach one idea at a time, give a short example, then one practice question.
Guide the learner through homework reasoning instead of only giving answers.
For math, show clear steps and verify calculations.
For SAT, create original practice questions; never claim they are official.
For Government and Political Economy, distinguish facts, interpretations and opinions; encourage balanced, evidence-based reasoning.
Never request sensitive personal information, passwords or payment details. If unsure, say so clearly.`;

const allowedOrigins = new Set([
  "https://aymandjusipova58-sketch.github.io",
  "https://shirin-ai.pages.dev",
  "capacitor://localhost",
  "http://localhost",
  "https://localhost"
]);

function headers(origin) {
  const permitted = allowedOrigins.has(origin);
  return {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": permitted ? origin : "null",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "vary": "Origin",
    "cache-control": "no-store"
  };
}
function reply(status, body, origin) {
  return new Response(JSON.stringify(body), { status, headers: headers(origin) });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(origin) });
    if (request.method !== "POST") return reply(405, { error: "Faqat POST so‘rovi qabul qilinadi." }, origin);
    if (!allowedOrigins.has(origin)) return reply(403, { error: "Bu manbaga ruxsat berilmagan." }, origin);
    if (!env.GEMINI_API_KEY) return reply(503, { error: "Gemini kaliti serverda sozlanmagan." }, origin);

    let body;
    try { body = await request.json(); } catch { return reply(400, { error: "JSON so‘rov yuboring." }, origin); }
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message || message.length > 2000) return reply(400, { error: "Savol 1–2000 belgi bo‘lishi kerak." }, origin);

    const history = Array.isArray(body.history) ? body.history.slice(-8).flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const role = item.role === "model" ? "model" : item.role === "user" ? "user" : "";
      const text = typeof item.text === "string" ? item.text.trim().slice(0, 1200) : "";
      return role && text ? [{ role, parts: [{ text }] }] : [];
    }) : [];

    try {
      const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [...history, { role: "user", parts: [{ text: message }] }],
          generationConfig: { temperature: 0.35, maxOutputTokens: 700 }
        }),
        signal: AbortSignal.timeout(25000)
      });
      const result = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        console.error("Gemini upstream error", upstream.status);
        return reply(502, { error: "Gemini javobida xatolik. Birozdan keyin qayta urinib ko‘ring." }, origin);
      }
      const answer = result?.candidates?.[0]?.content?.parts?.map(p => typeof p.text === "string" ? p.text : "").join("\n").trim();
      if (!answer) return reply(502, { error: "Gemini hozir javob qaytara olmadi." }, origin);
      return reply(200, { answer, model: MODEL }, origin);
    } catch (error) {
      console.error("Tutor request failed", error);
      return reply(504, { error: "AI xizmatiga ulanish vaqti tugadi." }, origin);
    }
  }
};
