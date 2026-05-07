import { useState } from "react";
import axios from "axios";
import "../fit-maker-website.css";
import Navbar from "../Navbar";

const Meal = () => {
  const [form, setForm] = useState({
    dietType: "vegetarian",
    dailyCalories: "",
    mealsPerDay: "",
  });

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePlan = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/meal-planner`,
        form
      );

      setPlan(res.data);
    }  catch (err) {
  setError(
    err.response?.data?.error ||
    "Unable to generate meal plan. Please try again."
  );
  setPlan(null);
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="fit-maker-website-container">
      <div className="fit-maker-login-page-navbar">
        <Navbar presentab="Programs" />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="w-full max-w-6xl px-6 py-10">

  {/* 🔥 HERO */}
  <div className="text-center mb-10">
    <h1 className="text-5xl font-bold text-orange-500 tracking-wide">
      Meal Planner
    </h1>
    <p className="text-gray-400 mt-3 text-sm">
      Generate smart, AI-powered meal plans tailored to your fitness goals
    </p>
  </div>

  {/* 🔥 FORM CARD */}
  <div className="relative bg-white/5 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-4 justify-center items-center">

    {/* glow effect */}
    <div className="absolute inset-0 rounded-2xl bg-orange-500/5 blur-2xl opacity-30"></div>

    <select
      name="dietType"
      onChange={handleChange}
      className="z-10 bg-black/60 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 transition"
    >
      <option value="vegetarian">Vegetarian</option>
      <option value="non-vegetarian">Non-Vegetarian</option>
      <option value="vegan">Vegan</option>
    </select>

    <input
      type="number"
      name="dailyCalories"
      placeholder="Calories (e.g. 2000)"
      onChange={handleChange}
      className="z-10 bg-black/60 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 transition"
    />

    <input
      type="number"
      name="mealsPerDay"
      placeholder="Meals per day"
      onChange={handleChange}
      className="z-10 bg-black/60 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 transition"
    />

    <button
      onClick={generatePlan}
      disabled={loading}
      className="z-10 bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/40 disabled:opacity-50"
    >
      {loading ? "Generating..." : "Generate Plan"}
    </button>
  </div>

  {/* 🔥 EMPTY STATE */}
  {!plan && !loading && (
    <div className="mt-16 text-center text-gray-500">
      <div className="bg-white/5 border border-gray-700 rounded-xl px-8 py-10 inline-block backdrop-blur-md">
        <p className="text-lg mb-2">No Meal Plan Yet</p>
        <p className="text-sm text-gray-400">
          Select your preferences and generate your personalized plan
        </p>
      </div>
    </div>
  )}

  {/* 🔥 LOADING STATE */}
  {loading && (
    <div className="mt-16 text-center text-orange-400 animate-pulse">
      Generating your personalized meal plan...
    </div>
  )}

  {/* 🔥 RESULT */}
  {plan && (
    <div className="mt-14">

      <h2 className="text-center text-xl text-orange-400 mb-8 font-medium">
        Total Calories: {plan.dailyTotal}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.meals.map((meal, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-orange-500/20 rounded-xl p-5 shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              {meal.name}
            </h3>

            <div className="space-y-2">
              {meal.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm text-gray-300"
                >
                  <span>{item.food}</span>
                  <span>{item.calories} kcal</span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right text-orange-400 font-semibold">
              {meal.totalCalories} kcal
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
      {error && (
  <div className="mt-6 flex justify-center">
    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-3 rounded-xl backdrop-blur-md max-w-xl text-center">
      {error}
    </div>
  </div>
)}
    </div>
  );
};

export default Meal;