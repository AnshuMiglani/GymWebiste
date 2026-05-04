import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { FaLeaf, FaDrumstickBite } from "react-icons/fa";
import Navbar from "../Navbar";

const MealPlanner = () => {
  const [dietType, setDietType] = useState("veg");
  const [dailyCalories, setDailyCalories] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateMealPlan = async () => {
    if (!dailyCalories || !mealsPerDay) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/meal-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ dietType, dailyCalories, mealsPerDay }),
      });

      const data = await response.json();
      setMealPlan(data);
    } catch (err) {
      console.error("Error fetching meal plan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fit-maker-website-container">
      <div className="fit-maker-login-page-navbar">
        <Navbar />
      </div>

      <div className="mt-6 w-full text-white flex flex-col items-center p-10 border-2 border-white rounded-2xl shadow-xl">
        <div className="w-full max-w-5xl">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-orange-500 mb-10 tracking-wide drop-shadow-lg">
            Meal Planner
          </h1>

          {/* Diet Type */}
          <div className="flex justify-center space-x-6 mb-10">
            <button
              onClick={() => setDietType("veg")}
              className={`px-6 py-3 rounded-xl flex items-center space-x-2 shadow-md transition ${
                dietType === "veg"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <FaLeaf /> <span className="font-semibold">Veg</span>
            </button>
            <button
              onClick={() => setDietType("non-veg")}
              className={`px-6 py-3 rounded-xl flex items-center space-x-2 shadow-md transition ${
                dietType === "non-veg"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <FaDrumstickBite /> <span className="font-semibold">Non-Veg</span>
            </button>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-900/90 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto border border-gray-800">
            <label className="block mb-2 text-sm text-gray-300">
              Daily Calories
            </label>
            <input
              type="number"
              value={dailyCalories}
              onChange={(e) => setDailyCalories(e.target.value)}
              placeholder="e.g. 2000"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
            />

            <label className="block mb-2 text-sm text-gray-300">
              Meals Per Day
            </label>
            <input
              type="number"
              value={mealsPerDay}
              onChange={(e) => setMealsPerDay(e.target.value)}
              placeholder="e.g. 3"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={generateMealPlan}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 px-10 py-3 rounded-xl shadow-lg text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "⚡ Generating..." : "Generate Meal Plan"}
            </button>
          </div>

          {/* Tabs for Meals */}
          {mealPlan?.meals && mealPlan.meals.length > 0 && (
            <div className="mt-12 w-full max-w-4xl mx-auto">
              <Tab.Group>
                <Tab.List className="flex flex-wrap justify-center gap-4 mb-8">
                  {mealPlan.meals.map((meal, idx) => (
                    <Tab
                      key={idx}
                      className={({ selected }) =>
                        `px-5 py-2 rounded-lg font-medium shadow-md transition ${
                          selected
                            ? "bg-orange-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`
                      }
                    >
                      {meal.name}
                    </Tab>
                  ))}
                </Tab.List>

                <Tab.Panels>
                  {mealPlan.meals.map((meal, idx) => (
                    <Tab.Panel
                      key={idx}
                      className="bg-gray-900/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-800"
                    >
                      <h2 className="text-2xl font-bold text-orange-400 mb-6">
                        {meal.name}
                      </h2>
                      <ul className="space-y-3">
                        {meal.items?.map((item, i) => (
                          <li
                            key={i}
                            className="flex justify-between border-b border-gray-700 pb-2 text-gray-300"
                          >
                            <span>{item.food}</span>
                            <span className="text-sm">{item.calories} cal</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-sm text-gray-400 font-semibold">
                        Total: {meal.totalCalories} cal
                      </p>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          )}

          {/* Daily Total */}
          {mealPlan && (
            <div className="mt-10 bg-orange-600/90 backdrop-blur-md px-8 py-5 rounded-2xl shadow-lg border border-orange-700 text-center">
              <p className="text-xl font-bold text-white">
                🔥 Daily Total: {mealPlan.dailyTotal} cal
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
