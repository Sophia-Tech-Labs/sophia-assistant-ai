const db = require("../db/db");
async function getChatHistory(apiKey, chatId) {
  try {
  if(!apiKey) return;

  const checkUser = await db.query(
  	`SELECT id FROM users WHERE apiKey = $1`,
  	[apiKey]
  );
  if(checkUser.length === 0) return;
  const userID = checkUser[0].id;
    const results = await db.query(
      `SELECT role, content FROM chat_history 
       WHERE user_id = $1 AND chat_id = $2 
       ORDER BY timestamp ASC`,
      [userID, chatId]
    );

    return results.map(row => ({
      role: role,
      parts: [{ text: content }]
    }));
  } catch (err) {
    console.error("Error fetching chat history:", err);
    return [];
  }
}

async function storeChatMessage(apiKey, chatId, role, content) {
  try {
if(!apiKey) return;

  const checkUser = await db.query(
  	`SELECT id FROM users WHERE apiKey = $1`,
  	[apiKey]
  );
  if(checkUser.length === 0) return;
  const userID = checkUser[0].id;
const timestamp = new Date().toISOString(); // returns ISO 8601 format
// Example: "2025-07-01T21:53:45.654Z"
    await db.query(
      `INSERT INTO chat_history (user_id, chat_id, role, content, timestamp) 
       VALUES ($1, $2, $3, $4, $5`,
      [userID, chatId, role, content,timestamp ]
    );
  } catch (err) {
    console.error("Error storing chat message:", err);
  }
}

module.exports= { getChatHistory,storeChatMessage }
