import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { 
  FaDumbbell, 
  FaFire, 
  FaHome, 
  FaChartLine, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaAppleAlt, 
  FaClock, 
  FaArrowLeft,
  FaRobot,
  FaCalculator
} from "react-icons/fa";

const programData = {
  "losing-weight": {
    id: "losing-weight",
    title: "Losing Weight & Fat Loss",
    tagline: "Shed Stubborn Fat While Preserving Lean Muscle",
    badge: "Fat Loss Transformation",
    icon: <FaFire className="text-red-500 text-3xl" />,
    heroGradient: "from-red-600/30 via-orange-600/20 to-transparent",
    overview:
      "Our scientific fat loss program is engineered to create a sustainable calorie deficit without starving your body. By combining metabolic resistance training with targeted Zone-2 cardio and high-protein nutrition, you will burn body fat while keeping your hard-earned muscle and energy levels high.",
    stats: [
      { label: "Target Deficit", value: "300 - 500 kcal" },
      { label: "Training Days", value: "4 - 5 Days / Week" },
      { label: "Daily Steps", value: "8,000 - 12,000" },
      { label: "Protein Target", value: "1.8 - 2.2g / kg" }
    ],
    pillars: [
      {
        title: "Calculated Caloric Deficit",
        desc: "Eat 300 to 500 calories below your Total Daily Energy Expenditure (TDEE). This enables healthy, steady loss of 0.5 to 1 kg per week without crashing your metabolism."
      },
      {
        title: "High-Protein Muscle Shield",
        desc: "Protein has the highest Thermic Effect of Food (TEF) and signals your body to burn fat for energy while sparing skeletal muscle tissue during a deficit."
      },
      {
        title: "Metabolic Resistance Training",
        desc: "Lifting weights while losing weight burns calories during and after workouts (EPOC) and prevents the 'skinny-fat' look by maintaining tone and firmness."
      },
      {
        title: "Low-Impact Zone-2 Cardio",
        desc: "Brisk walking or stationary cycling kept at 60-70% max heart rate burns pure fat without spiking cortisol or making you overwhelmingly hungry."
      }
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Upper Body Hypertrophy + 20 min Incline Walk", exercises: ["Dumbbell Bench Press: 3x10", "Seated Cable Rows: 3x12", "Overhead Press: 3x10", "Face Pulls: 3x15"] },
      { day: "Tuesday", focus: "Lower Body Strength + Core", exercises: ["Barbell Squats: 3x8", "Romanian Deadlifts: 3x10", "Walking Lunges: 3x12/leg", "Hanging Leg Raises: 3x12"] },
      { day: "Wednesday", focus: "Active Recovery & Mobility", exercises: ["45 min Outdoor Brisk Walk", "Full Body Static & Dynamic Stretching", "Hydration Focus (3.5L water)"] },
      { day: "Thursday", focus: "Push / Chest & Shoulders + HIIT Finisher", exercises: ["Incline Dumbbell Press: 3x10", "Dips or Pushups: 3xMax", "Lateral Raises: 4x15", "10 min HIIT Sprints"] },
      { day: "Friday", focus: "Pull & Glutes / Hamstrings", exercises: ["Lat Pulldowns: 3x10", "Dumbbell Rows: 3x12", "Hip Thrusts: 3x12", "Plank Holds: 3x60s"] },
      { day: "Saturday", focus: "Zone-2 Fat Burn Cardio", exercises: ["45 min Steady Cycling or Jogging", "Foam Rolling & Recovery"] },
      { day: "Sunday", focus: "Full Rest & Meal Prep", exercises: ["Rest Day", "Plan meals & grocery shop for the upcoming week"] }
    ],
    dos: [
      "Track your food with our Macro Calculator to ensure you remain in deficit",
      "Drink 3 to 4 liters of clean water daily to reduce water retention",
      "Prioritize 7-8 hours of uninterrupted sleep for cortisol reduction",
      "Weigh yourself weekly under consistent conditions (morning after restroom)"
    ],
    donts: [
      "Don't perform crash diets under 1,000 calories—it destroys your metabolism",
      "Don't skip resistance training to do hours of endless cardio",
      "Don't drink liquid calories (sodas, sugary coffee drinks, juices)",
      "Don't give up if the scale stalls for 2-3 days—fat loss is non-linear"
    ]
  },
  "building-muscle": {
    id: "building-muscle",
    title: "Building Muscle & Hypertrophy",
    tagline: "Maximize Lean Muscle Mass With Progressive Overload",
    badge: "Muscle Growth Blueprint",
    icon: <FaDumbbell className="text-red-500 text-3xl" />,
    heroGradient: "from-orange-600/30 via-red-600/20 to-transparent",
    overview:
      "Building muscle requires targeted mechanical tension, progressive overload, and an anabolic nutritional environment. This program guides you through compound lifting mechanics, optimal training volume, and smart caloric surplus strategies to add lean mass without excessive fat gain.",
    stats: [
      { label: "Caloric Surplus", value: "+250 - 400 kcal" },
      { label: "Training Split", value: "Push / Pull / Legs" },
      { label: "Optimal Reps", value: "6 - 12 Reps" },
      { label: "Weekly Sets", value: "12 - 18 per muscle" }
    ],
    pillars: [
      {
        title: "Progressive Overload Principle",
        desc: "Continually challenge your muscles by increasing weight, reps, or controlling tempo week over week. Without progression, there is no signal for growth."
      },
      {
        title: "Mechanical Tension & Form",
        desc: "Focus on strict form and controlling the eccentric (lowering) phase for 2-3 seconds to trigger deep micro-tears and muscle fiber recruitment."
      },
      {
        title: "Clean Lean Bulking Surplus",
        desc: "Fuel muscle synthesis with a controlled 250-400 kcal surplus rich in complex carbs (oats, rice, sweet potatoes) and healthy fats."
      },
      {
        title: "Anabolic Sleep & Recovery",
        desc: "Growth hormone peaks during deep REM sleep. Muscles don't grow in the gym; the gym provides the stimulus, and sleep builds the tissue."
      }
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Push (Chest, Shoulders, Triceps)", exercises: ["Barbell Bench Press: 4x6-8", "Incline Dumbbell Press: 3x8-10", "Dumbbell Lateral Raises: 4x12", "Overhead Tricep Extension: 3x12"] },
      { day: "Tuesday", focus: "Pull (Back, Rear Delts, Biceps)", exercises: ["Weighted or Bodyweight Pull-ups: 3x8", "Barbell Bent-Over Row: 4x8-10", "Face Pulls: 3x15", "Incline Dumbbell Curls: 3x10"] },
      { day: "Wednesday", focus: "Legs & Abs (Quads, Hamstrings, Calves)", exercises: ["Barbell Back Squat: 4x6-8", "Romanian Deadlift: 3x8-10", "Leg Press: 3x12", "Calf Raises: 4x15"] },
      { day: "Thursday", focus: "Active Rest & Upper Mobility", exercises: ["Light 20 min walk", "Rotator cuff & hip mobility drills"] },
      { day: "Friday", focus: "Push B (Hypertrophy Focus)", exercises: ["Dumbbell Incline Bench Press: 4x10", "Dips: 3x10", "Cable Flyes: 3x15", "Skullcrushers: 3x12"] },
      { day: "Saturday", focus: "Pull B & Arms Focus", exercises: ["Seated Cable Row: 4x10", "Lat Pulldown: 3x12", "Barbell Bicep Curl: 3x10", "Hammer Curls: 3x12"] },
      { day: "Sunday", focus: "Rest Day & High-Protein Feast", exercises: ["Full Rest", "Hit your target surplus and hydrate"] }
    ],
    dos: [
      "Keep a workout log to track your weights and ensure progressive overload",
      "Consume 25-40g of protein within 2 hours post-workout",
      "Take 3-5g of Creatine Monohydrate daily to increase ATP and cellular hydration",
      "Eat complex carbohydrates around workouts for maximum glycogen stores"
    ],
    donts: [
      "Don't 'dirty bulk' on fast food—excess fat is much harder to burn off later",
      "Don't train to absolute failure on every single set (leaves 1-2 reps in reserve)",
      "Don't change your exercises every week—stick to core movements for 8-12 weeks",
      "Don't neglect warm-up sets before your working weight"
    ]
  },
  "training-in-home": {
    id: "training-in-home",
    title: "Training In Home",
    tagline: "Build Elite Fitness & Shred Fat With Zero Heavy Equipment",
    badge: "Home Workout Master",
    icon: <FaHome className="text-red-500 text-3xl" />,
    heroGradient: "from-zinc-700/40 via-red-700/20 to-transparent",
    overview:
      "You don't need an expensive gym membership or bulky iron machines to get into the best shape of your life. This dedicated Home Training program uses bodyweight biomechanics, calisthenics progressions, and high-intensity density training to build functional athleticism and burn calories right in your living room.",
    stats: [
      { label: "Equipment Needed", value: "Bodyweight / Bands" },
      { label: "Workout Length", value: "30 - 45 Minutes" },
      { label: "Days Per Week", value: "4 - 5 Days" },
      { label: "Space Required", value: "Living Room Floor" }
    ],
    pillars: [
      {
        title: "Calisthenic Leverage Mastery",
        desc: "Instead of adding iron plates, we increase difficulty by changing leverage—elevating feet, slowing tempos, or shifting from standard pushups to archer pushups."
      },
      {
        title: "Time Under Tension (TUT)",
        desc: "Slowing down eccentric movements and pausing at peak contractions forces your muscle fibers to work just as hard as lifting heavy barbells."
      },
      {
        title: "Density & Circuit Conditioning",
        desc: "Rest periods are structured into short 30-45s intervals to keep heart rate elevated, boosting cardiovascular VO2 max while sculpting muscle."
      },
      {
        title: "Everyday Functional Strength",
        desc: "Bodyweight movements build bulletproof joints, balance, core stability, and agility that transfer directly into everyday health and longevity."
      }
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Upper Body Push & Core Blast", exercises: ["Standard & Diamond Pushups: 4x15", "Pike Pushups (Shoulders): 3x10", "Chair / Bench Dips: 3x15", "Plank to Shoulder Taps: 3x45s"] },
      { day: "Tuesday", focus: "Lower Body Plyometric Power", exercises: ["Air Squats (3 sec descent): 4x20", "Bulgarian Split Squats: 3x12/leg", "Glute Bridges: 3x20", "Jump Squats Finisher: 3x15"] },
      { day: "Wednesday", focus: "Core & Active Cardio Flow", exercises: ["Bicycle Crunches: 3x20", "Mountain Climbers: 4x40s", "Burpees: 3x10", "Hamstring & Hip Mobility Flow"] },
      { day: "Thursday", focus: "Upper Body Pull & Posterior Chain", exercises: ["Doorframe / Table Rows: 4x10", "Superman Holds (Lower back): 3x45s", "Floor Y-T-W Raises: 3x12", "Bear Crawls: 3x30s"] },
      { day: "Friday", focus: "Full Body Fat Burn MetCon", exercises: ["20 min AMRAP: 10 Pushups, 15 Squats, 10 Lunges, 20 Jumping Jacks", "Cooldown Stretching"] },
      { day: "Saturday", focus: "Stretching & Yoga Flow", exercises: ["30 min Full Body Yoga & Decompression Walk"] },
      { day: "Sunday", focus: "Rest & Recharge", exercises: ["Full Rest Day"] }
    ],
    dos: [
      "Invest in a set of loop resistance bands or a pullup bar for extra pulling variety",
      "Focus on squeezing the muscle hard at the peak of every single repetition",
      "Film your form occasionally with your phone to ensure clean execution",
      "Maintain a dedicated training space free of distractions"
    ],
    donts: [
      "Don't rush through reps just to finish fast—tempo and quality matter most",
      "Don't skip leg day just because you don't have a squat rack",
      "Don't compromise on warmups—bodyweight movements demand warm shoulders and hips",
      "Don't neglect hydration and nutrition just because you trained at home"
    ]
  },
  "gym-plan": {
    id: "gym-plan",
    title: "Complete Gym Plan",
    tagline: "Structured Commercial Gym Roadmap For Peak Strength & Aesthetics",
    badge: "Elite Gym Master",
    icon: <FaChartLine className="text-red-500 text-3xl" />,
    heroGradient: "from-red-600/30 via-zinc-800/40 to-transparent",
    overview:
      "Step into the gym with absolute clarity and purpose. Our comprehensive Gym Plan eliminates the guesswork by giving you exact exercises, warm-up protocols, set/rep ranges, and machine settings. Whether your goal is pure powerlifting strength or an aesthetic athletic physique, this is your roadmap.",
    stats: [
      { label: "Environment", value: "Commercial Gym" },
      { label: "Equipment", value: "Free Weights & Cables" },
      { label: "Split Type", value: "5-Day Bodypart Split" },
      { label: "Experience Level", value: "Beginner to Advanced" }
    ],
    pillars: [
      {
        title: "Compound Anchor Movements",
        desc: "Every workout begins with a heavy multijoint lift (Squat, Bench, Deadlift, Overhead Press) when your nervous system and energy are freshest."
      },
      {
        title: "Cable & Machine Isolation",
        desc: "Following the heavy anchors, we use modern cable systems and pin-loaded machines to safely isolate individual muscle heads to exhaustion."
      },
      {
        title: "Systematic Warmup & Potentiation",
        desc: "Specific ramp-up sets prime your central nervous system (CNS) without fatiguing muscles, safeguarding your shoulders, knees, and lower back."
      },
      {
        title: "Periodization & Deloads",
        desc: "Train hard for 4 to 6 weeks, followed by a scheduled 1-week deload to clear systemic fatigue and prepare for new PRs (Personal Records)."
      }
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Chest & Triceps (Heavy & Pump)", exercises: ["Barbell Bench Press: 4x6", "Incline Dumbbell Fly-Press: 3x10", "Pec Deck Machine: 3x12", "Cable Tricep Pushdown: 4x12"] },
      { day: "Tuesday", focus: "Back & Biceps (Width & Thickness)", exercises: ["Conventional Deadlift: 3x5", "Lat Pulldown (Wide Grip): 3x10", "T-Bar Row: 3x8", "EZ-Bar Preacher Curl: 3x10"] },
      { day: "Wednesday", focus: "Active Rest or Abs / Cardio", exercises: ["20 min Stairmaster or Treadmill Incline Walk", "Hanging Leg Raises: 3x15", "Cable Woodchoppers: 3x12/side"] },
      { day: "Thursday", focus: "Shoulders & Traps (3D Boulder Delts)", exercises: ["Seated Overhead Dumbbell Press: 4x8", "Cable Lateral Raises: 4x12-15", "Reverse Pec Deck: 3x15", "Dumbbell Shrugs: 4x12"] },
      { day: "Friday", focus: "Legs (Quad & Hamstring Domination)", exercises: ["Barbell Back Squat: 4x6", "Leg Press: 3x10", "Seated Hamstring Curl: 4x12", "Standing Calf Machine: 4x15"] },
      { day: "Saturday", focus: "Arms & Weak Point Vanity Session", exercises: ["Close-Grip Bench Press: 3x8", "Incline Dumbbell Curl: 3x10", "Dips: 3x10", "Cable Hammer Curls: 3x12"] },
      { day: "Sunday", focus: "Full Rest & Recovery", exercises: ["Rest Day", "Sleep 8+ hours, hydrate, sauna or light stretch"] }
    ],
    dos: [
      "Always wipe down machines after use and re-rack your weights properly",
      "Wear flat-soled shoes or lift in socks for squats and deadlifts for maximum stability",
      "Rest 2-3 minutes on heavy compound lifts and 60-90s on isolation accessories",
      "Check your form with a gym trainer or recorded video before adding more plates"
    ],
    donts: [
      "Don't ego lift with jerky form—it leads directly to shoulder and lower back injuries",
      "Don't skip your warmup sets—never jump straight to your working weight",
      "Don't monopolize multiple pieces of equipment during peak gym hours",
      "Don't scroll on your phone for 5 minutes between sets"
    ]
  }
};

export default function ProgramDetail() {
  const { programId } = useParams();
  const navigate = useNavigate();

  // Normalize key
  const activeKey = programData[programId] ? programId : "losing-weight";
  const program = programData[activeKey];

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [programId]);

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-red-600 selection:text-white">
      {/* Top Navigation */}
      <div className="border-b border-zinc-800 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <Navbar presentab="Programs" />
      </div>

      {/* Breadcrumb Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition font-medium"
          >
            <FaArrowLeft className="text-xs" /> Back to Home
          </Link>

          <span className="text-xs font-semibold uppercase tracking-wider text-red-500 bg-red-950/40 border border-red-800/40 px-3 py-1 rounded-full">
            MakeFit Dedicated Program
          </span>
        </div>
      </div>

      {/* Program Selector Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-zinc-900/80 rounded-2xl border border-zinc-800">
          {Object.values(programData).map((p) => {
            const isCurrent = p.id === activeKey;
            return (
              <button
                key={p.id}
                onClick={() => navigate(`/programs/${p.id}`)}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isCurrent
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                    : "text-gray-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                {p.title.split("&")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div
          className={`relative rounded-3xl p-6 sm:p-10 border border-zinc-800 bg-gradient-to-b ${program.heroGradient} overflow-hidden shadow-2xl`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                {program.badge}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
                {program.title}
              </h1>
              <p className="text-lg text-gray-300 font-medium mb-4">
                {program.tagline}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                {program.overview}
              </p>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px]">
              <Link
                to="/meal-planner"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition shadow-lg shadow-red-600/30 active:scale-95"
              >
                <FaAppleAlt /> Generate Meal Plan
              </Link>
              <Link
                to="/ai"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-sm transition active:scale-95"
              >
                <FaRobot /> Ask FitBot Coach
              </Link>
              <Link
                to="/macro-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-sm transition active:scale-95"
              >
                <FaCalculator /> Calculate Macros
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {program.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl text-center backdrop-blur-sm"
            >
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-white text-gradient">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Section Tabs */}
        <div className="flex gap-4 border-b border-zinc-800 mt-12 pb-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2 text-sm font-semibold transition border-b-2 ${
              activeTab === "overview"
                ? "border-red-500 text-red-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Core Pillars & Science
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`pb-2 text-sm font-semibold transition border-b-2 ${
              activeTab === "schedule"
                ? "border-red-500 text-red-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            7-Day Workout Routine
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`pb-2 text-sm font-semibold transition border-b-2 ${
              activeTab === "rules"
                ? "border-red-500 text-red-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Do's & Don'ts
          </button>
        </div>

        {/* Tab 1: Core Pillars */}
        {activeTab === "overview" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {program.pillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl hover:border-red-500/30 transition group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-sm">
                    0{i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: 7-Day Workout Schedule */}
        {activeTab === "schedule" && (
          <div className="mt-8 space-y-4">
            {program.weeklySchedule.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="md:w-1/3">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-500 block">
                    {item.day}
                  </span>
                  <h4 className="text-base font-semibold text-white mt-0.5">
                    {item.focus}
                  </h4>
                </div>

                <div className="md:w-2/3 flex flex-wrap gap-2">
                  {item.exercises.map((ex, exIdx) => (
                    <span
                      key={exIdx}
                      className="text-xs bg-zinc-800 text-gray-200 border border-zinc-700/80 px-3 py-1.5 rounded-lg"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Do's and Don'ts */}
        {activeTab === "rules" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="bg-zinc-900/40 border border-emerald-900/30 p-6 rounded-2xl">
              <h3 className="text-emerald-400 font-bold text-lg flex items-center gap-2 mb-4">
                <FaCheckCircle /> Recommended Do's
              </h3>
              <ul className="space-y-3">
                {program.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <span className="text-emerald-500 font-bold text-base">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-zinc-900/40 border border-red-900/30 p-6 rounded-2xl">
              <h3 className="text-red-400 font-bold text-lg flex items-center gap-2 mb-4">
                <FaTimesCircle /> Avoid These Mistakes
              </h3>
              <ul className="space-y-3">
                {program.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <span className="text-red-500 font-bold text-base">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-14 rounded-3xl p-8 bg-gradient-to-r from-red-900/40 via-zinc-900 to-black border border-red-600/30 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Start Your {program.title.split("&")[0]} Journey?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6">
            Track your progress with your personal MakeFit Dashboard, generate meals that match your exact calories, and consult our AI coach 24/7.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/Dashboard"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition shadow-lg shadow-red-600/40 active:scale-95"
            >
              Open Your Dashboard
            </Link>
            <Link
              to="/meal-planner"
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition border border-zinc-700 active:scale-95"
            >
              Custom Meal Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
