import { useState } from "react";
import { Link } from "react-router-dom";
import "../BodyMap.css";
export default function UnitConverter() {
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [cm, setCm] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");

  const convertKgToLbs = () => {
    const value = parseFloat(kg);
    if (!isNaN(value)) setLbs((value * 2.20462).toFixed(2));
  };

  const convertLbsToKg = () => {
    const value = parseFloat(lbs);
    if (!isNaN(value)) setKg((value / 2.20462).toFixed(2));
  };

  const convertCmToFeetInch = () => {
    const value = parseFloat(cm);
    if (!isNaN(value)) {
      const totalInches = value / 2.54;
      setFt(Math.floor(totalInches / 12));
      setInch(Math.round(totalInches % 12));
    }
  };

  const convertFeetInchToCm = () => {
    const totalInches = parseFloat(ft) * 12 + parseFloat(inch);
    if (!isNaN(totalInches)) setCm((totalInches * 2.54).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-red-400 text-center mb-8">Unit Converter</h2>
      <Link to="/"><img src={require("../../external/cross_14875490.png")} alt="abs" style={{position:"absolute", top:"30px", right:"450px",width:"25px",height:"25px"}}></img></Link>
      <div className="max-w-2xl mx-auto bg-[#1e293b] p-8 rounded-xl shadow-lg space-y-10">

       
        <div>
          <h3 className="text-xl font-semibold text-red-300 mb-4">Weight</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Kilograms</label>
              <input
                type="number"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
                style={{ appearance: "textfield", MozAppearance: "textfield" }}
  className="p-3 rounded-md bg-[#334155] text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Kg"
              />
              <button onClick={convertKgToLbs} className="bg-red-600 hover:bg-red-700 py-2 rounded-md mt-1 transition">Convert to Lbs</button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">Pounds</label>
              <input
                type="number"
                value={lbs}
                onChange={(e) => setLbs(e.target.value)}
                style={{ appearance: "textfield", MozAppearance: "textfield" }}
  className="p-3 rounded-md bg-[#334155] text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Lbs"
              />
              <button onClick={convertLbsToKg} className="bg-red-600 hover:bg-red-700 py-2 rounded-md mt-1 transition">Convert to Kg</button>
            </div>
          </div>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold text-red-300 mb-4">Height</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Centimeters</label>
              <input
                type="number"
                value={cm}
                onChange={(e) => setCm(e.target.value)}
                style={{ appearance: "textfield", MozAppearance: "textfield" }}
  className="p-3 rounded-md bg-[#334155] text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="cm"
              />
              <button onClick={convertCmToFeetInch} className="bg-red-600 hover:bg-red-700 py-2 rounded-md mt-1 transition">Convert to Ft/In</button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">Feet / Inches</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={ft}
                  onChange={(e) => setFt(e.target.value)}
                  placeholder="ft"
                  style={{ appearance: "textfield", MozAppearance: "textfield" }}
  className="p-3 rounded-md bg-[#334155] text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <input
                  type="number"
                  value={inch}
                  onChange={(e) => setInch(e.target.value)}
                  placeholder="in"
                  style={{ appearance: "textfield", MozAppearance: "textfield" }}
  className="w-1/2 p-3 rounded-md bg-[#334155] text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
              <button onClick={convertFeetInchToCm} className="bg-red-600 hover:bg-red-700 py-2 rounded-md mt-1 transition">Convert to cm</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
