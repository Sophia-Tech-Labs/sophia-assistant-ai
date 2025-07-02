const express = require("express");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Gemini route
app.post("/", async (req, res) => {
  try {

    
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Sophia AI server running on port ${PORT}`);
});
