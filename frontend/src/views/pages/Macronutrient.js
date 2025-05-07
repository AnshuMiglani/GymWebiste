import { useState } from "react";
import { Link } from "react-router-dom";
import "../BodyMap.css";
export default function MacronutrientCalculator() {
  const [weight, setWeight] = useState(); // in kg
  const [goal, setGoal] = useState("maintain");
  const [macros, setMacros] = useState(null);

  const calculateMacros = () => {
    let protein, carbs, fat;
    const weightInLbs = weight * 2.20462;

    switch (goal) {
      case "lose":
        protein = weightInLbs * 1.2;
        carbs = weightInLbs * 0.8;
        fat = weightInLbs * 0.4;
        break;
      case "gain":
        protein = weightInLbs * 1.0;
        carbs = weightInLbs * 2.0;
        fat = weightInLbs * 0.5;
        break;
      default:
        protein = weightInLbs * 0.8;
        carbs = weightInLbs * 1.5;
        fat = weightInLbs * 0.4;
    }

    setMacros({
      protein: protein.toFixed(0),
      carbs: carbs.toFixed(0),
      fat: fat.toFixed(0),
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-red-400">Macronutrient Calculator</h1>

      <Link to="/"><img src={require("../../external/cross_14875490.png")} alt="abs" style={{position:"absolute", top:"30px", right:"550px",width:"25px",height:"25px"}}></img></Link>
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-2xl shadow-xl p-6">
        <div className="grid gap-6">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">Weight (kg)</label>
            <input
              type="number"
              placeholder="..."
              className="bg-[#334155] text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">Goal</label>
            <select
              className="bg-[#334155] text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={goal}
              onChange={e => setGoal(e.target.value)}
            >
              <option value="maintain">Maintain Weight</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Muscle</option>
            </select>
          </div>

          <button
            onClick={calculateMacros}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Calculate
          </button>

          {macros && (
            <div className="text-center text-lg font-semibold text-green-400 space-y-1">
              <p>Protein: {macros.protein}g</p>
              <p>Carbs: {macros.carbs}g</p>
              <p>Fat: {macros.fat}g</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
