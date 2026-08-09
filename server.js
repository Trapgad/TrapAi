const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON requests
app.use(express.json());

// Serve TRAP AI frontend
app.use(express.static(__dirname));

// Test route
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "TRAP AI backend is running 🚀"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`TRAP AI is running at http://localhost:${PORT}`);
});