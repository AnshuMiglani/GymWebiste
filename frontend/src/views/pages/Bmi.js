import { useState } from "react";
import { Link } from "react-router-dom";
import "../BodyMap.css";
export default function BMICalculator() {
  const [height, setHeight] = useState(); // cm
  const [weight, setWeight] = useState(); // kg
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    let cat = "";
    if (bmiValue < 18.5) cat = "Underweight";
    else if (bmiValue < 24.9) cat = "Normal weight";
    else if (bmiValue < 29.9) cat = "Overweight";
    else cat = "Obese";

    setCategory(cat);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-red-400">BMI Calculator</h1>
      <Link to="/"><img src={require("../../external/cross_14875490.png")} alt="abs" style={{position:"absolute", top:"30px", right:"540px",width:"30px",height:"30px"}}></img></Link>
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-2xl shadow-xl p-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-300">Height (cm)</label>
              <input
                type="number"
                placeholder="..."
                className="bg-[#334155] text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
              />
            </div>

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
          </div>

          <button
            onClick={calculateBMI}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Calculate
          </button>

          {bmi && (
            <div className="text-center text-xl font-semibold text-green-400">
              Your BMI: {bmi} ({category})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
