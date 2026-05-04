const express = require("express");
const router = express.Router();
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
router.post("/meal-planner", async (req, res) => {
  const { dietType, dailyCalories, mealsPerDay } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a meal planning assistant.
Generate a structured ${dietType} meal plan for ${mealsPerDay} meals per day.
Target total calories: ${dailyCalories}.
Each meal should have:
- Meal name
- List of food items with calories

Return JSON only in this format:
{
  "meals": [
    {
      "name": "Breakfast",
      "items": [
        { "food": "Oats with milk", "calories": 250 },
        { "food": "Banana", "calories": 100 }
      ],
      "totalCalories": 350
    }
  ],
  "dailyTotal": 2000
}
`
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

    // Try parsing JSON
    const cleanedText = reply
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
    let mealPlan;
    try {
      mealPlan = JSON.parse(cleanedText);
    } catch (e) {
      return res.status(500).json({ error: "Invalid response format from Gemini." });
    }
    res.json(mealPlan);
  } catch (err) {
    console.error("Error from Gemini API:", err.message);
    res.status(500).json({ error: "Failed to get meal plan from Gemini API." });
  }
});

module.exports = router;
