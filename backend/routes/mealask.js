const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// Algorithmic fallback meal plan generator for 100% uptime
const generateCuratedMealPlan = (dietType = "vegetarian", dailyCalories = 2000, mealsPerDay = 3) => {
  const cals = Number(dailyCalories) || 2000;
  const numMeals = Math.min(Math.max(Number(mealsPerDay) || 3, 2), 6);
  const diet = dietType.toLowerCase();

  // Curated food database by category
  const foodDatabase = {
    vegetarian: {
      breakfast: [
        { food: "Rolled Oats with Almond Milk & Berries", ratio: 0.6 },
        { food: "Chia Seeds & Crushed Almonds", ratio: 0.25 },
        { food: "Boiled Eggs or Greek Yogurt", ratio: 0.15 }
      ],
      lunch: [
        { food: "Paneer / Tofu Tikka Stir Fry", ratio: 0.45 },
        { food: "Brown Rice or Whole Wheat Roti", ratio: 0.35 },
        { food: "Green Mixed Salad with Olive Oil", ratio: 0.2 }
      ],
      dinner: [
        { food: "Yellow Lentil Dal or Black Bean Curry", ratio: 0.4 },
        { food: "Steamed Quinoa or Sweet Potato", ratio: 0.35 },
        { food: "Sautéed Broccoli & Zucchini", ratio: 0.25 }
      ],
      snack: [
        { food: "Whey / Plant Protein Shake with Banana", ratio: 0.65 },
        { food: "Handful of Walnuts & Dark Chocolate", ratio: 0.35 }
      ]
    },
    vegan: {
      breakfast: [
        { food: "Oatmeal with Soy Milk, Peanut Butter & Flaxseeds", ratio: 0.7 },
        { food: "Sliced Banana & Blueberries", ratio: 0.3 }
      ],
      lunch: [
        { food: "Grilled Tofu with Quinoa Bowl", ratio: 0.5 },
        { food: "Steamed Asparagus, Avocado & Tahini", ratio: 0.3 },
        { food: "Chickpea Salad", ratio: 0.2 }
      ],
      dinner: [
        { food: "Lentil & Sweet Potato Coconut Curry", ratio: 0.5 },
        { food: "Brown Basmati Rice", ratio: 0.3 },
        { food: "Steamed Spinach & Hemp Seeds", ratio: 0.2 }
      ],
      snack: [
        { food: "Pea Protein Smoothie with Almond Butter", ratio: 0.65 },
        { food: "Roasted Edamame & Apple Slices", ratio: 0.35 }
      ]
    },
    keto: {
      breakfast: [
        { food: "3-Egg Omelet with Spinach & Cheddar", ratio: 0.7 },
        { food: "Half Sliced Avocado", ratio: 0.3 }
      ],
      lunch: [
        { food: "Grilled Chicken Thighs or Paneer Steak", ratio: 0.55 },
        { food: "Cauliflower Mash with Butter", ratio: 0.3 },
        { food: "Green Salad with Extra Virgin Olive Oil", ratio: 0.15 }
      ],
      dinner: [
        { food: "Wild Salmon or Tofu in Garlic Butter", ratio: 0.6 },
        { food: "Roasted Asparagus & Pecans", ratio: 0.4 }
      ],
      snack: [
        { food: "Macadamia Nuts & String Cheese", ratio: 0.7 },
        { food: "Keto Collagen Coffee Shake", ratio: 0.3 }
      ]
    },
    default: {
      breakfast: [
        { food: "Scrambled Eggs (3 whole) with Spinach", ratio: 0.5 },
        { food: "Whole Grain Toast with Peanut Butter", ratio: 0.35 },
        { food: "Fresh Orange Slices", ratio: 0.15 }
      ],
      lunch: [
        { food: "Grilled Chicken Breast or Lean Steak", ratio: 0.5 },
        { food: "Baked Sweet Potato or Brown Rice", ratio: 0.35 },
        { food: "Steamed Green Beans with Olive Oil", ratio: 0.15 }
      ],
      dinner: [
        { food: "Baked White Fish / Salmon Fillet", ratio: 0.5 },
        { food: "Quinoa Salad with Bell Peppers", ratio: 0.3 },
        { food: "Roasted Brussels Sprouts", ratio: 0.2 }
      ],
      snack: [
        { food: "Greek Yogurt with Honey & Walnuts", ratio: 0.6 },
        { food: "Whey Protein Shake", ratio: 0.4 }
      ]
    }
  };

  const dietKey = diet.includes("vegan") ? "vegan" : diet.includes("keto") ? "keto" : diet.includes("veg") ? "vegetarian" : "default";
  const selectedDb = foodDatabase[dietKey] || foodDatabase.default;

  // Determine meal proportions
  let mealDistributions = [];
  if (numMeals === 2) {
    mealDistributions = [
      { name: "Brunch / Meal 1", ratio: 0.5, pool: selectedDb.breakfast },
      { name: "Dinner / Meal 2", ratio: 0.5, pool: selectedDb.dinner }
    ];
  } else if (numMeals === 3) {
    mealDistributions = [
      { name: "Breakfast", ratio: 0.30, pool: selectedDb.breakfast },
      { name: "Lunch", ratio: 0.40, pool: selectedDb.lunch },
      { name: "Dinner", ratio: 0.30, pool: selectedDb.dinner }
    ];
  } else if (numMeals === 4) {
    mealDistributions = [
      { name: "Breakfast", ratio: 0.25, pool: selectedDb.breakfast },
      { name: "Lunch", ratio: 0.35, pool: selectedDb.lunch },
      { name: "Afternoon Snack", ratio: 0.15, pool: selectedDb.snack },
      { name: "Dinner", ratio: 0.25, pool: selectedDb.dinner }
    ];
  } else if (numMeals === 5) {
    mealDistributions = [
      { name: "Breakfast", ratio: 0.20, pool: selectedDb.breakfast },
      { name: "Morning Snack", ratio: 0.12, pool: selectedDb.snack },
      { name: "Lunch", ratio: 0.33, pool: selectedDb.lunch },
      { name: "Evening Snack", ratio: 0.12, pool: selectedDb.snack },
      { name: "Dinner", ratio: 0.23, pool: selectedDb.dinner }
    ];
  } else {
    mealDistributions = [
      { name: "Breakfast", ratio: 0.20, pool: selectedDb.breakfast },
      { name: "Morning Snack", ratio: 0.10, pool: selectedDb.snack },
      { name: "Lunch", ratio: 0.30, pool: selectedDb.lunch },
      { name: "Afternoon Snack", ratio: 0.10, pool: selectedDb.snack },
      { name: "Dinner", ratio: 0.22, pool: selectedDb.dinner },
      { name: "Pre-Bed Recovery", ratio: 0.08, pool: selectedDb.snack }
    ];
  }

  let runningTotal = 0;
  const meals = mealDistributions.map((m, index) => {
    const isLast = index === mealDistributions.length - 1;
    let targetMealCal = isLast ? (cals - runningTotal) : Math.round(cals * m.ratio);

    let mealItemTotal = 0;
    const items = m.pool.map((item, itemIdx) => {
      const isLastItem = itemIdx === m.pool.length - 1;
      let itemCal = isLastItem ? (targetMealCal - mealItemTotal) : Math.round(targetMealCal * item.ratio);
      if (itemCal < 30) itemCal = 30;
      mealItemTotal += itemCal;
      return {
        food: item.food,
        calories: itemCal
      };
    });

    const realMealTotal = items.reduce((acc, it) => acc + it.calories, 0);
    runningTotal += realMealTotal;

    return {
      name: m.name,
      items: items,
      totalCalories: realMealTotal
    };
  });

  const dailyTotal = meals.reduce((acc, m) => acc + m.totalCalories, 0);

  return {
    meals,
    dailyTotal
  };
};

router.post("/meal-planner", async (req, res) => {
  const { dietType, dailyCalories, mealsPerDay } = req.body;

  const calNum = Number(dailyCalories);

  // Validate calories
  if (calNum > 10000) {
    return res.status(400).json({
      error: "Calorie input exceeds safe limits (max 10,000 kcal).",
    });
  }

  if (calNum < 800) {
    return res.status(400).json({
      error: "Calorie input is too low (minimum 800 kcal required).",
    });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (apiKey) {
    const candidateModels = [
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemini-2.0-flash-exp:free",
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
                content: `You are a professional dietician AI. Return ONLY a valid JSON object matching this schema with no markdown:
{
  "meals": [
    {
      "name": "Breakfast",
      "items": [{ "food": "Item Name", "calories": 250 }],
      "totalCalories": 250
    }
  ],
  "dailyTotal": ${calNum}
}
Sum of meals MUST equal ${calNum}.`
              },
              {
                role: "user",
                content: `Create a ${dietType || "balanced"} meal plan. Daily Calories: ${calNum}. Meals per day: ${mealsPerDay || 3}.`
              }
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": process.env.FRONTEND_URL || "https://gym-website.vercel.app",
              "X-Title": "FitBot Meal Planner",
            },
            timeout: 10000,
          }
        );

        let reply = response.data?.choices?.[0]?.message?.content || "";
        reply = reply.replace(/```json/g, "").replace(/```/g, "").trim();

        const parsed = JSON.parse(reply);
        if (parsed?.meals && Array.isArray(parsed.meals) && parsed.meals.length > 0) {
          // Recalculate totals precisely
          const correctedMeals = parsed.meals.map((meal) => {
            const total = (meal.items || []).reduce((sum, item) => sum + Number(item.calories || 0), 0);
            return {
              ...meal,
              totalCalories: total || Number(meal.totalCalories || 0)
            };
          });

          const currentTotal = correctedMeals.reduce((sum, m) => sum + m.totalCalories, 0);
          return res.json({
            meals: correctedMeals,
            dailyTotal: currentTotal
          });
        }
      } catch (err) {
        console.warn(`Meal plan model ${model} failed, trying fallback:`, err.message);
      }
    }
  }

  // Guaranteed fallback plan: perfectly customized to user's diet, calories, and meals
  const curatedPlan = generateCuratedMealPlan(dietType, calNum, mealsPerDay);
  return res.json(curatedPlan);
});

module.exports = router;