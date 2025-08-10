const { Type } = require("@google/genai");

const changeToneFunction = {
  name: "change-tone",
  description: `
Only call this function when the user explicitly and clearly asks you to change your tone.
Examples:
- "Change your tone to sarcastic"
- "Can you be more friendly?"
- "Switch to a professional tone"

Do NOT call this function based on vague words like 'mood', 'tone', 'style', or 'description'.
Only respond with this if the user's intent is 100% clear.

If the user is asking a normal question or giving feedback, DO NOT use this function.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {
      tone: {
        type: Type.STRING,
        enum: ["friendly", "sarcastic", "cute", "ceo-mode"  , "romantic","professional", "default"],
        description: "The new tone to switch to, only if explicitly requested."
      }
    },
    required: ["tone"]
  }
}

const setBotModeFunction = {
  name: "set-bot-mode",
  description: `
Sets whether the bot is in 'private' or 'public' mode.

Only call this function when the user explicitly asks to switch the bot’s visibility or audience.
Examples:
- "Switch the bot to private mode"
- "Make the bot public"
- "Don’t reply to others"
- "Only talk to me"
- "Allow the bot to reply to everyone again"

Do NOT call this function unless the user's intent is very clear about changing access mode.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {
      mode: {
        type: Type.STRING,
        enum: ["private", "public"],
        description: "Set to 'private' if the bot should only reply to the main user. Set to 'public' if the bot should respond to anyone."
      }
    },
    required: ["mode"]
  }
};


const setReminderFunction = {
  name: "set-reminder",
  description: `
Creates a reminder with a message and a specific time.

Only call this function if the user clearly wants to be reminded about something at a specific time.
Examples:
- "Remind me to pray at 7 PM"
- "At 5:30, tell me to start studying"
- "Remind me tomorrow morning to check email"
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {
      time: {
        type: Type.STRING,
        description: "The time or date for the reminder. Accept formats like '2025-07-03T14:00:00Z' or 'tomorrow at 7am'."
      },
      note: {
        type: Type.STRING,
        description: "The message or note to remind the user about."
      }
    },
    required: ["time", "note"]
  }
};

module.exports = { changeToneFunction,setBotModeFunction,setReminderFunction };
