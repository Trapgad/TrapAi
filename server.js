const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve our website
app.use(express.static("."));

// TRAP AI chat endpoint
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required."
            });
        }

        // Temporary response
        // Real AI connection comes next.
        res.json({
            reply: `TRAP AI received: ${message}`
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "TRAP AI server error."
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
    console.log(`TRAP AI running on port ${PORT}`);
});