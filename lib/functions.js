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

const startWCGFunction = {
  name: "start-wcg",
  description: `
Only call this function when the user explicitly asks to start the Word Chain Game.
This includes cases where they want to begin, initiate, or start playing the game.

Trigger phrases include:
- "start wcg"
- "begin wcg"
- "play word chain game"
- "start the word chain"
- ".wcg start"

Do NOT call this if the user is asking about rules or just mentioning the game without wanting to start it.
Only respond with this if the intent is 100% to start the game.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: []
  }
};

const endWCGFunction = {
  name: "end-wcg",
  description: `
Only call this function when the user explicitly asks to end or stop the Word Chain Game.
This includes when they want to quit, finish, or terminate the session.

Trigger phrases include:
- "end wcg"
- "stop wcg"
- "quit word chain"
- ".wcg end"

Do NOT call this if the user is only pausing, checking rules, or talking about a past game.
Only respond with this if the intent is 100% to end the game.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: []
  }
};

const turnOnAntilinkFunction = {
  name: "turn-on-antilink",
  description: `
Only call this function when the user explicitly asks to enable or activate the Anti-Link tool in a group.
This includes when they say things like:
- "turn on antilink"
- "enable anti link"
- "activate anti-link"
- "antilink on"

Do NOT call this if the user is asking what Anti-Link is, checking its status, or talking about it in general terms.
Only call this if the user’s clear intent is to turn it ON.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: []
  }
};

const turnOffAntilinkFunction = {
  name: "turn-off-antilink",
  description: `
Only call this function when the user explicitly asks to disable or deactivate the Anti-Link tool in a group.
This includes when they say things like:
- "turn off antilink"
- "disable anti link"
- "antilink off"
- "deactivate anti-link"

Do NOT call this if the user is asking what Anti-Link is, checking its status, or mentioning it casually.
Only call this if the user’s clear intent is to turn it OFF.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: []
  }
};


const wcgStatusFunction = {
  name: "wcg-status",
  description: `
Only call this function when the user explicitly asks about the current status of the Word Chain Game.
This includes checking if the game is running, active, or what the current game state is.

Trigger phrases include:
- "wcg status"
- "word chain status"
- "is wcg running?"
- ".wcg status"

Do NOT call this if the user is asking how to play or talking about unrelated topics.
Only respond with this if the intent is 100% to check the current game status.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: []
  }
};


const tagAllFunction = {
  name: "tag-all",
  description: `
Only call this function when the user explicitly and clearly asks you to tag or mention all group members.
Examples:
- "Tag everyone"
- "Mention all members"
- "Ping everybody in the group"
Do NOT call this for vague words like "alert people", "everyone should know", etc. unless they explicitly request tagging all members.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: []
  }
};

const unlockViewOnceToDMFunction = {
  name: "unlock-view-once-to-dm",
  description: `
Only call this function when the user explicitly asks you to unlock or view a "view once" message and send to his dm or personal message.
This includes images, videos, or media that can normally only be viewed one time.

Trigger phrases include:
- "unlock view once to dm"
- "view once to dm"
- "open view once to dm"
- "vv2"
- ".vv2"

Do NOT call this for unrelated messages or vague references to viewing something.
Only respond with this if the intent is about unlocking or viewing 'view once' media.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: []
  }
};
const unlockViewOnceFunction = {
  name: "unlock-view-once",
  description: `
Only call this function when the user explicitly asks you to unlock or view a "view once" message.
This includes images, videos, or media that can normally only be viewed one time.

Trigger phrases include:
- "unlock view once"
- "view once"
- "open view once"
- "vv"
- ".vv"

Do NOT call this for unrelated messages or vague references to viewing something.
Only respond with this if the intent is about unlocking or viewing 'view once' media.
  `.trim(),
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: []
  }
};


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

module.exports = { changeToneFunction,unlockViewOnceToDMFunction,turnOffAntilinkFunction,turnOnAntilinkFunction,endWCGFunction,startWCGFunction,wcgStatusFunction,unlockViewOnceFunction,tagAllFunction,setBotModeFunction,setReminderFunction };
