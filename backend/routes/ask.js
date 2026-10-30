const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// Keyword filter for fitness topics
const isFitnessQuery = (text) => {
  const fitnessKeywords = [
    "gym", "workout", "exercise", "fitness", "diet", "nutrition",
    "protein", "muscle", "fat", "weight", "cardio", "training",
    "chest", "back", "biceps", "triceps", "legs", "shoulder",
    "abs", "calories", "meal", "health", "body", "strength",
    "hi", "hello", "hey", "creatine", "supplement", "cut", "bulk",
    "squat", "bench", "deadlift", "run", "running", "walk", "stretch"
  ];

  const lowerText = text.toLowerCase();
  return fitnessKeywords.some((word) => lowerText.includes(word));
};

// Fallback intelligent fitness knowledge engine
const getFallbackFitnessAdvice = (query) => {
  const q = query.toLowerCase();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q === "start") {
    return "Hey! I'm FitBot, your MakeFit AI coach. Ask me anything about workout plans, fat loss, muscle building, protein intake, or nutrition!";
  }

  if (q.includes("lose weight") || q.includes("fat loss") || q.includes("cutting") || q.includes("burn fat")) {
    return "To lose weight sustainably, maintain a 300–500 calorie deficit below maintenance. Pair 3–4 days of resistance training with 8,000–10,000 daily steps. Keep protein high (1.6–2.2g per kg bodyweight) to preserve muscle mass while burning fat.";
  }

  if (q.includes("build muscle") || q.includes("hypertrophy") || q.includes("bulking") || q.includes("gain weight")) {
    return "To maximize muscle hypertrophy, train each muscle group 2x weekly with progressive overload in the 6–12 rep range. Eat at a slight surplus (+250-400 kcal) with 1.8-2.2g protein/kg, and ensure 7-9 hours of sleep nightly.";
  }

  if (q.includes("protein") || q.includes("supplement") || q.includes("creatine")) {
    return "Aim for 0.8–1g of protein per pound of bodyweight (1.6–2.2g/kg). Good sources include eggs, chicken breast, fish, paneer, lentils, Greek yogurt, and whey. For creatine, take 3–5g of Creatine Monohydrate daily with water for strength and muscle volume.";
  }

  if (q.includes("chest") || q.includes("bench")) {
    return "For complete chest development, perform Flat Barbell/Dumbbell Press (3x8-10), Incline Dumbbell Press (3x10-12) for upper chest, and Cable Flyes or Dips (3x12-15) for a deep stretch and pump. Control the eccentric lowering phase!";
  }

  if (q.includes("back") || q.includes("pull up") || q.includes("lat")) {
    return "For an aesthetic V-taper back, combine vertical pulling (Pull-ups or Lat Pulldowns 3x8-12) with horizontal rowing (Barbell or Seated Cable Rows 3x8-10) and Face Pulls (3x15) for rear delts and posture.";
  }

  if (q.includes("legs") || q.includes("squat")) {
    return "A powerful leg day includes Barbell Squats (3x6-8), Romanian Deadlifts (3x8-10 for hamstrings/glutes), Bulgarian Split Squats (3x10/leg), and Standing Calf Raises (4x15). Focus on full range of motion!";
  }

  if (q.includes("arms") || q.includes("bicep") || q.includes("tricep")) {
    return "Triceps make up 60% of your arm size—prioritize Overhead Cable Extensions and Dips. For biceps, combine Incline Dumbbell Curls (stretched position) with Preacher Curls (peak contraction). 6-8 direct weekly sets per muscle is plenty.";
  }

  if (q.includes("abs") || q.includes("belly")) {
    return "Visible abs are built through a caloric deficit to drop body fat below 12-15% (men) or 20-22% (women). Train them for hypertrophy 2-3x weekly using Hanging Leg Raises and Cable Crunches for 12-15 reps.";
  }

  if (q.includes("cardio") || q.includes("running") || q.includes("hiit")) {
    return "For fat loss and heart health without sacrificing muscle, Zone 2 cardio (brisk walking or stationary cycling at 60-70% max heart rate) for 30 minutes 3-4x weekly is ideal. Low impact preserves your recovery!";
  }

  return "Consistency is key to results. Focus on balanced whole-food nutrition, progressive overload with good form, staying hydrated (3+ liters of water daily), and allowing 48 hours between training the same muscle group.";
};

router.post("/ask", async (req, res) => {
  const userPrompt = req.body?.prompt;

  if (!userPrompt || typeof userPrompt !== "string") {
    return res.status(400).json({ error: "Please enter a valid question." });
  }

  // Block non-fitness queries
  if (!isFitnessQuery(userPrompt)) {
    return res.json({
      reply: "Sorry, I only answer fitness, gym, workout, diet, and health-related questions."
    });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (apiKey) {
    // Try multiple free/active models on OpenRouter
    const candidateModels = [
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemini-2.0-flash-exp:free",
      "meta-llama/llama-3.2-3b-instruct:free",
      "openrouter/free"
    ];

    for (const model of candidateModels) {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: model,
            messages: [
              {
                role: "system",
                content: "You are a professional fitness coach AI. Answer strictly about gym, workout, diet, nutrition, and health. Keep answers concise, actionable, and under 60 words.",
              },
              {
                role: "user",
                content: userPrompt,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": process.env.FRONTEND_URL || "https://gym-website.vercel.app",
              "X-Title": "FitBot AI",
            },
            timeout: 9000,
          }
        );

        const reply = response.data?.choices?.[0]?.message?.content;
        if (reply && reply.trim()) {
          return res.json({ reply: reply.trim() });
        }
      } catch (err) {
        console.warn(`Model ${model} failed, trying next or fallback:`, err.response?.status || err.message);
      }
    }
  }

  // Graceful fallback: immediate, high-quality fitness advice
  const fallbackReply = getFallbackFitnessAdvice(userPrompt);
  return res.json({ reply: fallbackReply });
});

module.exports = router;