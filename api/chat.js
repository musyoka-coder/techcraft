// /api/chat.js
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in Vercel
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Techcraft AI, a friendly, sharp assistant created by Tech Craft Limited. " +
            "You help users brainstorm ideas, solve coding challenges, and provide technical advice " +
            "with a professional but creative tone.",
        },
        ...messages,
      ],
    });

    res.status(200).json(completion);
  } catch (error) {
    console.error("Chat API error:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


