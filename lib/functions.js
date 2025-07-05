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

module.exports = { changeToneFunction };
