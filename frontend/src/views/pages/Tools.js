import React from "react";
import { Link } from "react-router-dom";
import "../BodyMap.css";

const Tools=()=>{
    return (
        <section class="w-full text-white py-16 px-4 bg-black">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-10">
      <h2 class="text-4xl font-extrabold">
        Our Fitness <span class="text-red-500">Tools</span>
      </h2>
      <p class="mt-2 text-gray-300">
        Access A Variety Of Tools To Help You Reach Your Fitness Goals More Effectively
      </p>
    </div>


    <div class="flex overflow-x-auto space-x-6 pb-4 max-w-6xl your-message-container gap-3">

      <div class="min-w-[280px] bg-gradient-to-br from-[#1e1e1e] to-black border border-gray-700 rounded-lg p-6 hover:shadow-lg transition tool1">
        <img style={{color:"white"}} src={require("../../external/calories-calculator.png")} alt="Calorie Calculator" class="w-16 h-16 mb-4 mx-auto"/>
        <h3 class="text-center text-xl font-semibold text-gray-100">CALORIE CALCULATOR</h3>
        <div class="text-center mt-4">
          <Link to="/calorie-calculator" class="text-red-400 font-medium hover:underline">Learn More →</Link>
        </div>
      </div>

      <div class="min-w-[280px] bg-gradient-to-br from-[#1e1e1e] to-black border border-gray-700 rounded-lg p-6 hover:shadow-lg transition tool2">
        <img src={require("../../external/bmi.png")} alt="BMI Calculator" class="w-16 h-16 mb-4 mx-auto"/>
        <h3 class="text-center text-xl font-semibold text-gray-100">BMI CALCULATOR</h3>
        <div class="text-center mt-4">
          <a href="/bmi-calculator" class="text-red-400 font-medium hover:underline">Learn More →</a>
        </div>
      </div>

      <div class="min-w-[280px] bg-gradient-to-br from-[#1e1e1e] to-black border border-gray-700 rounded-lg p-6 hover:shadow-lg transition tool3">
        <img src={require("../../external/macronutrient.png")} alt="Macros Calculator" class="w-16 h-16 mb-4 mx-auto"/>
        <h3 class="text-center text-xl font-semibold text-gray-100">MACRONUTRIENT CALCULATOR</h3>
        <div class="text-center mt-4">
          <a href="/macro-calculator" class="text-red-400 font-medium hover:underline">Learn More →</a>
        </div>
      </div>

      <div class="min-w-[280px] bg-gradient-to-br from-[#1e1e1e] to-black border border-gray-700 rounded-lg p-6 hover:shadow-lg transition tool4">
        <img src={require("../../external/weight.png")} alt="Goal Tool" class="w-16 h-16 mb-4 mx-auto"/>
        <h3 class="text-center text-xl font-semibold text-gray-100">IDEAL WEIGHT CALCULATOR</h3>
        <div class="text-center mt-4">
          <a href="/weight-calculator" class="text-red-400 font-medium hover:underline">Learn More →</a>
        </div>
      </div>


      <div class="min-w-[280px] bg-gradient-to-br from-[#1e1e1e] to-black border border-gray-700 rounded-lg p-6 hover:shadow-lg transition tool3">
        <img src={require("../../external/thin.png")} alt="Macros Calculator" class="w-16 h-16 mb-4 mx-auto"/>
        <h3 class="text-center text-xl font-semibold text-gray-100">UNIT CONVERTER</h3>
        <div class="text-center mt-4">
          <a href="/unit-converter" class="text-red-400 font-medium hover:underline">Learn More →</a>
        </div>
      </div>
    </div>
  </div>
</section>
    );
};
export default Tools;