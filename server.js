import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is missing from .env");
    process.exit(1);
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
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

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error("TRAP AI ERROR:", error);

        res.status(500).json({
            error: "TRAP AI could not generate a response."
        });
    }
});

app.get("/api/status", (req, res) => {
    res.json({
        online: true,
        name: "TRAP AI"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 TRAP AI is running on http://localhost:${PORT}`);
});