const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// ✅ simple keyword filter
const isFitnessQuery = (text) => {
  const fitnessKeywords = [
    "gym", "workout", "exercise", "fitness", "diet", "nutrition",
    "protein", "muscle", "fat", "weight", "cardio", "training",
    "chest", "back", "biceps", "triceps", "legs", "shoulder",
    "abs", "calories", "meal", "health", "body", "strength",
    "hi", "hello", "hey"
  ];

  const lowerText = text.toLowerCase();
  return fitnessKeywords.some((word) => lowerText.includes(word));
};

router.post("/ask", async (req, res) => {
  const userPrompt = req.body.prompt;

  // ❌ block non-fitness queries
  if (!isFitnessQuery(userPrompt)) {
    return res.json({
      reply:
        "Sorry, I only answer fitness, gym, diet, and health-related questions."
    });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a strict fitness coach AI. Only answer questions related to gym, diet, health, or workouts. If user asks anything outside this, reply: 'Sorry, I only answer fitness-related questions.' Keep answers under 50 words. Be helpful and clear.",
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.FRONTEND_URL,
          "X-Title": "FitBot AI",
        },
      }
    );

    const reply =
      response.data.choices?.[0]?.message?.content || "No response.";

    res.json({ reply });
  } catch (err) {
    console.error("OpenRouter Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

module.exports = router;