const db = require("../db/db");
const { GoogleGenAI } = require("@google/genai");
const { getChatHistory, storeChatMessages } = require("./history");
const tools = require("./functions");
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
          thinkingBudget: 745
        },
        tools:[{
        	functionDeclarations:[tools.changeToneFunction]
        }]
      },
      history
    });

    const response = await chat.sendMessage({ message });
    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0]; // Assuming one function call
      console.log(`Function to call: ${functionCall.name}`);
      console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);
      return res.status(200).json({
      	status:200,
      	functionCalls:response.functionCalls
      })
}
    if (response.text) {
      await storeChatMessages(apikey, chatID, "user", message);
      await storeChatMessages(apikey, chatID, "model", response.text);
      return res.status(200).json({ status: 200, reply:response.text });
    }

    //return res.status(500).json({ status: 500, error: "No response from AI" });
  } catch (err) {
    console.error("Error while generating response:", err);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
}

module.exports = geminiAIReply;
