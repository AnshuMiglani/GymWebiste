
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { PlayCircleIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const Workout = () => {
  const weeklyPlan = {
    1: { muscle: "Chest", path: "/tutorials/muscle/Chest" },
    2: { muscle: "Back", path: "/tutorials/muscle/Back" },
    3: { muscle: "Biceps", path: "/tutorials/muscle/Biceps" },
    4: { muscle: "Triceps", path: "/tutorials/muscle/Triceps" },
    5: { muscle: "Shoulders", path: "/tutorials/muscle/Shoulders" },
    6: { muscle: "Legs", path: "/tutorials/muscle/Legs" },
    0: { muscle: "Rest", path: "/workouts/rest" },
  };

  const today = new Date().getDay();
  const todayPlan = weeklyPlan[today];
  const [selectedMuscle, setSelectedMuscle] = useState(todayPlan.muscle);

  const exampleExercises = {
    Chest: [
      { name: "Bench Press", sets: "4 x 12" },
      { name: "Incline Dumbbell Press", sets: "3 x 12" },
      { name: "Chest Fly", sets: "3 x 15" },
    ],
    Back: [
      { name: "Pull Ups", sets: "4 x 10" },
      { name: "Deadlift", sets: "3 x 8" },
      { name: "Barbell Row", sets: "3 x 12" },
    ],
    Biceps: [
      { name: "Barbell Curl", sets: "4 x 12" },
      { name: "Hammer Curl", sets: "3 x 12" },
    ],
    Triceps: [
      { name: "Tricep Pushdown", sets: "4 x 12" },
      { name: "Overhead Extension", sets: "3 x 12" },
    ],
    Shoulders: [
      { name: "Overhead Press", sets: "4 x 10" },
      { name: "Lateral Raises", sets: "3 x 15" },
    ],
    Legs: [
      { name: "Squats", sets: "4 x 12" },
      { name: "Lunges", sets: "3 x 12/leg" },
      { name: "Leg Press", sets: "3 x 15" },
    ],
    Rest: [],
  };

  return (
    <div className="fit-maker-website-container">
      <div className="fit-maker-login-page-navbar">
        <Navbar />
      </div>
      <div style={{width:"800px", height:"8px", backgroundColor:"white", borderRadius:"10px", marginTop:"70px"}}></div>
      <div className=" flex justify-center gap-4 mb-12 flex-wrap mt-10">
        {Object.entries(weeklyPlan).map(([dayNum, info]) => (
          <button
            key={dayNum}
            onClick={() => setSelectedMuscle(info.muscle)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              parseInt(dayNum) === today
                ? "bg-red-600 text-white shadow-lg scale-105"
                : "bg-zinc-800 hover:bg-zinc-700 text-gray-300"
            } ${info.muscle === selectedMuscle ? "ring-2 ring-red-500" : ""}`}
          >
            {info.muscle}
          </button>
        ))}
      </div>
      <div className="text-white px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          {selectedMuscle === "Rest"
            ? "😴 Rest & Recover!"
            : selectedMuscle === todayPlan.muscle
            ? `Today is your ${selectedMuscle} Day`
            : `${selectedMuscle} Workouts`}
        </h1>

        {selectedMuscle === "Rest" ? (
          <p className="text-center text-gray-400 text-lg">
            Take a break, recover and come back stronger 💪
          </p>
        ) : (
          <div className="max-w-3xl mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Example Workouts:</h2>
            <div className="space-y-4">
              {exampleExercises[selectedMuscle].map((ex, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-red-500 transition"
                >
                  <div>
                    <p className="text-lg font-semibold">{ex.name}</p>
                    <p className="text-gray-400 text-sm">Sets/Reps: {ex.sets}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 flex flex-col gap-4 items-center">
              <Link
                to={weeklyPlan[
                  Object.keys(weeklyPlan).find(
                    (d) => weeklyPlan[d].muscle === selectedMuscle
                  )
                ].path}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-semibold transition"
              >
                <PlayCircleIcon className="h-6 w-6" />
                Go to {selectedMuscle} Tutorials
              </Link>
              {selectedMuscle !== todayPlan.muscle && (
                <button
                  onClick={() => setSelectedMuscle(todayPlan.muscle)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-lg font-semibold transition"
                >
                  <ArrowUturnLeftIcon className="h-6 w-6" />
                  Back to Today ({todayPlan.muscle} Day)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
       <div style={{width:"800px", height:"8px", backgroundColor:"white", borderRadius:"10px", marginBottom:"50px"}}></div>
    </div>
  );
};

export default Workout;
