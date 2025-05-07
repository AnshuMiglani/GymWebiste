import { useState } from "react";
import { Link } from "react-router-dom";
import "../BodyMap.css";

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState(); // in cm
  const [gender, setGender] = useState("male");
  const [idealWeight, setIdealWeight] = useState(null);

  const calculateIdealWeight = () => {
    // Using Devine formula
    const heightInInches = height / 2.54;
    let ideal;

    if (gender === "male") {
      ideal = 50 + 2.3 * (heightInInches - 60);
    } else {
      ideal = 45.5 + 2.3 * (heightInInches - 60);
    }

    setIdealWeight(ideal.toFixed(1));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-red-400">Ideal Weight Calculator</h1>

      <Link to="/"><img src={require("../../external/cross_14875490.png")} alt="abs" style={{position:"absolute", top:"30px", right:"560px",width:"25px",height:"25px"}}></img></Link>
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-2xl shadow-xl p-6">
        <div className="grid gap-6">
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
            <label className="mb-1 text-sm text-gray-300">Gender</label>
            <select
              className="bg-[#334155] text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            onClick={calculateIdealWeight}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Calculate
          </button>

          {idealWeight && (
            <div className="text-center text-xl font-semibold text-green-400">
              Ideal Weight: {idealWeight} kg
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
