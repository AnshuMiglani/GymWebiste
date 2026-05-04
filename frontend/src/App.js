import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';

import './style.css';
import Login from './views/Login';
import FitMakerWebsite from './views/fit-maker-website';
import NotFound from './views/not-found';
import Register from './views/Register';
import Tutorials from './views/Tutorials';
import MuscleTutorial from './views/MuscleTutorial';
import AI from './views/pages/AI';
import Caloriecalculator from './views/pages/Caloriecalculator';
import BMICalculator from './views/pages/Bmi';
import MacronutrientCalculator from './views/pages/Macronutrient';
import IdealWeightCalculator from './views/pages/Idealweight';
import UnitConverter from './views/pages/Unitconverter';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FitMakerWebsite/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/tutorials' element={<Tutorials/>}/>
      <Route path='/tutorials/muscle/:musclename' element={<MuscleTutorial/>}/>
      <Route path='/ai' element={<AI/>}/>
      <Route path='/calorie-calculator' element={<Caloriecalculator/>}/>
      <Route path='/bmi-calculator' element={<BMICalculator/>}/>
      <Route path='/macro-calculator' element={<MacronutrientCalculator/>}/>
      <Route path='/weight-calculator' element={<IdealWeightCalculator/>}/>
      <Route path='/unit-converter' element={<UnitConverter/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
