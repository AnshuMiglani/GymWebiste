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

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FitMakerWebsite/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/tutorials' element={<Tutorials/>}/>
      <Route path='/tutorials/muscle/:musclename' element={<MuscleTutorial/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
