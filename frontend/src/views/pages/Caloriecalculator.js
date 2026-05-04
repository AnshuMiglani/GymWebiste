import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../BodyMap.css";

const Caloriecalculator = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activity: "",
  });

  const [calories, setCalories] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const calculateCalories = (e) => {
    e.preventDefault();
    const { age, gender, weight, height, activity } = formData;

    if (!age || !gender || !weight || !height || !activity) {
      alert("Please fill in all fields");
      return;
    }

    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * parseFloat(activity);
    setCalories(Math.round(tdee));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
    <Link to="/"><img src={require("../../external/cross_14875490.png")} alt="abs" style={{position:"absolute", top:"30px", right:"500px",width:"30px",height:"30px"}}></img></Link>
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-500">
          Calorie Calculator
        </h2>
        <form onSubmit={calculateCalories} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              id="age"
              placeholder="Age (years)"
              value={formData.age}
              onChange={handleChange}
              className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white"
            />
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-3 rounded bg-gray-700 text-white"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="number"
              id="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white"
            />
            <input
              type="number"
              id="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white"
            />
          </div>

          <select
            id="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          >
            <option value="">Activity Level</option>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (1–3 days/week)</option>
            <option value="1.55">Moderately active (3–5 days/week)</option>
            <option value="1.725">Very active (6–7 days/week)</option>
            <option value="1.9">Super active (twice/day, etc.)</option>
          </select>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded text-white font-semibold"
          >
            Calculate Calories
          </button>
        </form>

        {calories !== null && (
          <div className="mt-6 text-center text-lg font-medium">
            Estimated daily calories:{" "}
            <span className="text-red-400 font-bold">{calories} kcal</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Caloriecalculator;
