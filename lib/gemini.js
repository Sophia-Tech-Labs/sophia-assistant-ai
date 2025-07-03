const db = require("../db/db");
const { GoogleGenAI } = require("@google/genai");
const { getChatHistory, storeChatMessages } = require("./history");

const ai = new GoogleGenAI({});

async function geminiAIReply(req, res) {
  try {
    let apikey = req.headers["authorization"];
    if (!apikey) {
      return res.status(400).json({ status: 400, message: "Missing API key in headers" });
    }

    if (apikey.startsWith("Bearer ")) {
      apikey = apikey.split(" ")[1];
    }

    const { chatID, message, system } = req.body;
    if (!apikey || !chatID || !message) {
      return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    const checkUser = await db.query("SELECT * FROM users WHERE api_key = $1", [apikey]);
    if (checkUser.length === 0) {
      return res.status(403).json({ status: 403, message: "Invalid API key" });
    }

    const history = await getChatHistory(apikey, chatID);
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: system || "You are a helpful assistant.",
        thinkingConfig: {
          thinkingBudget: 0
        }
      },
      history
    });

    const response = await chat.sendMessage({ message });

    if (response.text) {
      await storeChatMessages(apikey, chatID, "user", message);
      await storeChatMessages(apikey, chatID, "model", response.text);
      return res.status(200).json({ status: 200, results:response.text,response });
    }

    return res.status(500).json({ status: 500, error: "No response from AI" });
  } catch (err) {
    console.error("Error while generating response:", err);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
}

module.exports = geminiAIReply;
