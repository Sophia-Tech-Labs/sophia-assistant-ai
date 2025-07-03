require("dotenv").config();
const express = require("express");
const cors = require("cors");
const geminiAIReply = require("./lib/gemini")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Gemini route
app.post("/ai/reply",geminiAIReply);

app.listen(PORT, () => {
  console.log(`Sophia AI server running on port ${PORT}`);
});
