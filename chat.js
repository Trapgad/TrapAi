import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "developer",
          content:
            "You are TRAP AI, a helpful, intelligent and friendly AI assistant created by TRAP GAD."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return res.status(200).json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("TRAP AI ERROR:", error);

    return res.status(500).json({
      error: "TRAP AI could not generate a response."
    });
  }
}