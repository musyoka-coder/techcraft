// api/chat.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = req.body.messages || [];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    res.status(200).json(completion);
  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({
      error: "AI server crashed. Check OpenAI key or model.",
      details: error.message,
    });
  }
}






