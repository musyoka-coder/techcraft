// Server-side Techcraft AI endpoint. Configure OPENAI_API_KEY in Vercel project settings.
const MAX_BODY = 24000;
const ALLOWED_ROLES = new Set(["user", "assistant"]);
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({error:{message:"Method not allowed"}}); }
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin) {
    try { if (new URL(origin).host !== host) return res.status(403).json({error:{message:"Origin not allowed"}}); }
    catch { return res.status(403).json({error:{message:"Invalid origin"}}); }
  }
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(503).json({error:{message:"AI service is not configured."}});
  const body = req.body;
  if (!body || JSON.stringify(body).length > MAX_BODY || !Array.isArray(body.messages))
    return res.status(400).json({error:{message:"Invalid request"}});
  const history = body.messages.filter(m => m && ALLOWED_ROLES.has(m.role) && typeof m.content === "string" && m.content.trim().length && m.content.length <= 4000).slice(-12);
  if (!history.length || history[history.length-1].role !== "user") return res.status(400).json({error:{message:"A user message is required"}});
  const messages = [{role:"system",content:"You are Techcraft AI, the professional assistant for Tech Craft Limited, Kenya. Help with software development, networking, business services, and technology. Never use emojis. Be concise and accurate. Never invent prices or claim an action was performed. Company website: https://techcraftlimited.me. For quotations direct users to techcraft.bookings@gmail.com."},...history];
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 18000);
    let response;
    try { response = await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL || "gpt-4o-mini",messages,max_tokens:700}),signal:controller.signal}); }
    finally { clearTimeout(timer); }
    if (!response.ok) { console.error("AI upstream HTTP",response.status); return res.status(502).json({error:{message:"AI provider unavailable"}}); }
    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) return res.status(502).json({error:{message:"Empty AI response"}});
    return res.status(200).json({answer:answer.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu,"").trim()});
  } catch (error) { console.error("Techcraft AI request failed",error?.name || "Error"); return res.status(504).json({error:{message:"AI request timed out or failed"}}); }
}
