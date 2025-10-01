const db = require("../db/db");

async function getChatHistory(apiKey, chatId) {
  try {
    if(!apiKey) return;
    
    const checkUser = await db.query(
      `SELECT id FROM users WHERE api_key = $1`,
      [apiKey]
    );
    if(checkUser.length === 0) return;
    const userID = checkUser[0].id;
    
    // Clear old messages before fetching (older than 24 hours)
    await clearOldMessages(userID, chatId);
    
    const results = await db.query(
      `SELECT role, content FROM chat_history
        WHERE user_id = $1 AND chat_id = $2
        ORDER BY timestamp ASC`,
      [userID, chatId]
    );
    
    return results.map(row => ({
      role: row.role,
      parts: [{ text: row.content }]
    }));
  } catch (err) {
    console.error("Error fetching chat history:", err);
    return [];
  }
}

async function storeChatMessages(apiKey, chatId, role, content) {
  try { 
    if(!apiKey) return;
    
    const checkUser = await db.query(
      `SELECT id FROM users WHERE api_key = $1`,
      [apiKey]
    );
    if(checkUser.length === 0) return;
    const userID = checkUser[0].id;
    
    const timestamp = new Date().toISOString();
    
    await db.query(
      `INSERT INTO chat_history (user_id, chat_id, role, content, timestamp)
        VALUES ($1, $2, $3, $4, $5)`,
      [userID, chatId, role, content, timestamp]
    );
  } catch (err) {
    console.error("Error storing chat message:", err);
  }
}

// Clear messages older than 24 hours for a specific user/chat
async function clearOldMessages(userID, chatId) {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    await db.query(
      `DELETE FROM chat_history 
        WHERE user_id = $1 AND chat_id = $2 AND timestamp < $3`,
      [userID, chatId, twentyFourHoursAgo]
    );
  } catch (err) {
    console.error("Error clearing old messages:", err);
  }
}

module.exports = { 
  getChatHistory,
  storeChatMessages
};