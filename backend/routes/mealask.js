const express = require("express");
const router = express.Router();
const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post("/meal-planner", async (req, res) => {
  const { dietType, dailyCalories, mealsPerDay } = req.body;

  // ✅ BLOCK unrealistic calories
  if (dailyCalories > 10000) {
    return res.status(400).json({
      error:
        "Calorie input exceeds safe limits. Our platform is designed for realistic fitness goals, and values above 10,000 kcal are not supported.",
    });
  }

  // optional lower bound too
  if (dailyCalories < 800) {
    return res.status(400).json({
      error:
        "Calorie input is too low. Please enter a realistic value for a healthy meal plan.",
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
            content: `
You are a professional dietician AI.

Generate a structured meal plan.

STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No markdown
- No extra text

Format:
{
  "meals": [
    {
      "name": "Breakfast",
      "items": [
        { "food": "Oats", "calories": 250 }
      ],
      "totalCalories": 350
    }
  ],
  "dailyTotal": 2000
}
  Ensure:
- Sum of all meal totalCalories MUST equal dailyTotal
- Each meal totalCalories must equal sum of its items
- Use realistic calorie values
`
          },
          {
            role: "user",
            content: `
Create a ${dietType} meal plan.
Calories: ${dailyCalories}
Meals per day: ${mealsPerDay}
`
          }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.FRONTEND_URL,
          "X-Title": "FitBot Meal Planner",
        },
      }
    );

    let reply =
      response.data.choices?.[0]?.message?.content || "";

    // 🔥 CLEAN RESPONSE (important)
    reply = reply
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let mealPlan;

    try {
      mealPlan = JSON.parse(reply);
    } catch (e) {
      console.log("❌ RAW AI RESPONSE:", reply);
      return res.status(500).json({
        error: "AI returned invalid JSON",
      });
    }

    // 🔥 FIX CALCULATIONS (SOURCE OF TRUTH)
let correctedMeals = mealPlan.meals.map((meal) => {
  const total = meal.items.reduce((sum, item) => sum + item.calories, 0);
  return {
    ...meal,
    totalCalories: total,
  };
});

const correctedDailyTotal = correctedMeals.reduce(
  (sum, meal) => sum + meal.totalCalories,
  0
);

res.json({
  meals: correctedMeals,
  dailyTotal: correctedDailyTotal,
});

  } catch (err) {
    console.error("OpenRouter Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate meal plan" });
  }
});

module.exports = router;