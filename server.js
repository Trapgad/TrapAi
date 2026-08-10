const express = require("express");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message is required."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: [
                {
                    role: "system",
                    content:
                        "You are TRAP AI, a helpful, intelligent and friendly AI assistant."
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
        success: true,
        message: "TRAP AI backend is running 🚀"
    });

});

app.listen(PORT, () => {

    console.log(
        `TRAP AI is running at http://localhost:${PORT}`
    );

});