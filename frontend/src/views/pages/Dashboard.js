import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaDumbbell, FaBolt, FaBook, FaInfoCircle, FaUser, FaCrown } from "react-icons/fa";
import { useState } from "react";

export default function Dashboard() {
  const navigate= useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{width:"1400px"}} className="flex h-screen bg-gradient-to-br from-black to-gray-900 text-white">

      <div className="w-64 bg-gray-950 shadow-lg flex flex-col">
        <h1 className="text-2xl font-bold text-red-500 p-6">FitTracker</h1>
        <nav className="flex-1 px-4 space-y-4">
          <Link to="/" className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition">
            <FaHome /> Home
          </Link>
          <Link to="/workouts" className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition">
            <FaDumbbell /> Workout
          </Link>
          <Link to="/ai" className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition">
            <FaBolt /> Explore AI
          </Link>
          <Link to="/tutorials" className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition">
            <FaBook /> Tutorials
          </Link>
          <Link to="/about" className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition">
            <FaInfoCircle /> About Us
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-orange-400">Dashboard</h2>
          <div className="flex gap-3">
            <Link
              to="/plans"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition"
            >
              <FaCrown /> Go Premium
            </Link>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-orange-500 transition"
            >
              <FaUser /> {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-orange-400">Today's Workout</h3>
            <p className="mt-2 text-gray-400">{isLoggedIn ? "Chest & Triceps" : "--"}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-orange-400">Current BMI</h3>
            <p className="mt-2 text-gray-400">{isLoggedIn ? "22.5" : "--"}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-orange-400">Calories</h3>
            <p className="mt-2 text-gray-400">{isLoggedIn ? "1850 kcal" : "--"}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-orange-400 mb-4">Macronutrients</h3>

          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-1">Protein</p>
            <div className="w-full h-3 bg-gray-700 rounded-full">
              <div
                className={`h-3 bg-red-500 rounded-full transition-all duration-500`}
                style={{ width: isLoggedIn ? "50%" : "0%" }}
              ></div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-1">Carbs</p>
            <div className="w-full h-3 bg-gray-700 rounded-full">
              <div
                className={`h-3 bg-orange-500 rounded-full transition-all duration-500`}
                style={{ width: isLoggedIn ? "75%" : "0%" }}
              ></div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-300 mb-1">Fats</p>
            <div className="w-full h-3 bg-gray-700 rounded-full">
              <div
                className={`h-3 bg-gray-400 rounded-full transition-all duration-500`}
                style={{ width: isLoggedIn ? "33%" : "0%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
