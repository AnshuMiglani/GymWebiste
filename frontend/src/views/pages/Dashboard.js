import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaDumbbell, FaBolt, FaBook, FaInfoCircle, FaCrown } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const navigate= useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState(null);
const [dashboardData, setDashboardData] = useState({});

useEffect(() => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/auth-status`, { withCredentials: true })
    .then((res) => {
      console.log("AUTH 👉", res.data);

      if (res.data.Ispresent) {
        setIsLoggedIn(true);
        setUser(res.data);

        // ✅ ONLY fetch dashboard if logged in
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/dashboard-data`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("DASHBOARD 👉", res.data);
            setDashboardData(res.data || {});
          })
          .catch((err) => {
            console.log("DASHBOARD ERROR 👉", err);
            setDashboardData({});
          });
      } else {
        setIsLoggedIn(false);
        setDashboardData({});
      }
    })
    .catch((err) => {
      console.log("AUTH ERROR 👉", err);
      setIsLoggedIn(false);
      setDashboardData({});
    });
}, []);

const weeklyPlan = {
  1: "Chest",
  2: "Back",
  3: "Biceps",
  4: "Triceps",
  5: "Shoulders",
  6: "Legs",
  0: "Rest",
};

const today = new Date().getDay();
const todayWorkout = weeklyPlan[today];

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
            {isLoggedIn ? (
  <div className="flex items-center gap-3 bg-gray-800 px-3 py-1 rounded-full">
  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold text-white">
    {user?.name?.charAt(0).toUpperCase()}
  </div>
  <span className="text-sm text-gray-200">
    {user?.name}
  </span>
</div>
) : (
  <button onClick={() => navigate("/login")} className="...">
    Login
  </button>
)}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-orange-400">Today's Workout</h3>
            <p className="mt-2 text-gray-400">
  {isLoggedIn ? todayWorkout : "--"}
</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-orange-400">Current BMI</h3>
            <p className="mt-2 text-gray-400">
  {isLoggedIn ? dashboardData?.bmi || "--" : "--"}
</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-orange-400">Calories</h3>
            <p className="mt-2 text-gray-400">
  {isLoggedIn ? (dashboardData?.calories ? dashboardData.calories + " kcal" : "--") : "--"}
</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
  <h3 className="text-lg font-semibold text-orange-400 mb-4">Macronutrients</h3>

  {/* Protein */}
  <div className="mb-4">
    <p className="text-sm text-gray-300 mb-1">
      Protein: {isLoggedIn ? dashboardData?.macros?.protein || "--" : "--"}g
    </p>
    <div className="w-full h-3 bg-gray-700 rounded-full">
      <div
        className="h-3 bg-red-500 rounded-full transition-all duration-500"
        style={{
          width: isLoggedIn && dashboardData?.macros?.protein
            ? `${Math.min(dashboardData.macros.protein / 2, 100)}%`
            : "0%",
        }}
      ></div>
    </div>
  </div>

  {/* Carbs */}
  <div className="mb-4">
    <p className="text-sm text-gray-300 mb-1">
      Carbs: {isLoggedIn ? dashboardData?.macros?.carbs || "--" : "--"}g
    </p>
    <div className="w-full h-3 bg-gray-700 rounded-full">
      <div
        className="h-3 bg-orange-500 rounded-full transition-all duration-500"
        style={{
          width: isLoggedIn && dashboardData?.macros?.carbs
            ? `${Math.min(dashboardData.macros.carbs / 3, 100)}%`
            : "0%",
        }}
      ></div>
    </div>
  </div>

  {/* Fats */}
  <div>
    <p className="text-sm text-gray-300 mb-1">
      Fats: {isLoggedIn ? dashboardData?.macros?.fat || "--" : "--"}g
    </p>
    <div className="w-full h-3 bg-gray-700 rounded-full">
      <div
        className="h-3 bg-gray-400 rounded-full transition-all duration-500"
        style={{
          width: isLoggedIn && dashboardData?.macros?.fat
            ? `${Math.min(dashboardData.macros.fat * 2, 100)}%`
            : "0%",
        }}
      ></div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
