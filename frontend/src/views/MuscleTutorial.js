import React, { useEffect ,useState} from 'react';
import Navbar from './Navbar.js';
import Muscular from './Muscular.js';
import './fit-maker-website.css';
import "./BodyMap.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoginPromptModal from './LoginPromptModal.js';
import "./LoginPromptModal.css";

const MuscleTutorial=()=>{
  const [IsAuth,setIsAuth]= useState(false);
  const [showModal,setshowModal]= useState(false);
  useEffect(()=>{
    axios.get("http://localhost:8000/auth-status",{withCredentials:true})
    .then((res) => {setIsAuth(res.data.Ispresent);
      if(res.data.Ispresent){
          setshowModal(false);
      }
      else{
          setshowModal(true);
      }
    })
    .catch(()=>{setIsAuth(false);setshowModal(true)});
  },[]);

    const {musclename} = useParams();
    return(
        <div className="fit-maker-website-container">
        <div className="fit-maker-login-page-navbar">
        <Navbar/>
        </div>
    <div className='Muscularbodyparts'>
        <Muscular muscle={musclename} present="No"/>

        <section class="muscle-section">
  <div class="muscle-title-bar">
    <h2>{musclename} Tutorials</h2>
    <p>Strengthen, shape, and grow your {musclename} with these targeted workouts.</p>
  </div>

  {musclename==="Chest" && <div class="video-section">
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/1J1fNj6Kp5A" allowfullscreen></iframe>
      <h4>Normal Pushups</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/_FkbD0FhgVE" allowfullscreen></iframe>
      <h4>Bench Press</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/8fXfwG4ftaQ" allowfullscreen></iframe>
      <h4>Incline Dumbell Press</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/a-UFQE4oxWY" allowfullscreen></iframe>
      <h4>Decline Bench Press</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/p7biTTJvs8g" allowfullscreen></iframe>
      <h4>Chest Butterfly</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/OolEPKuWiwk" allowfullscreen></iframe>
      <h4>Decline Cable Press</h4>
    </div>
  </div>}
  
  {musclename==="Shoulder" && <div class="video-section">
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/k6tzKisR3NY" allowfullscreen></iframe>
      <h4>Shoulder Dumbbell Press</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/Kl3LEzQ5Zqs" allowfullscreen></iframe>
      <h4>Lateral Raises</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/4HXCYnztyh8" allowfullscreen></iframe>
      <h4>Front Raises</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/LsT-bR_zxLo" allowfullscreen></iframe>
      <h4>Rear Delt Fly</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/IeOqdw9WI90" allowfullscreen></iframe>
      <h4>Seated Face Pull</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/9ilIKuy6B0g" allowfullscreen></iframe>
      <h4>Cable Lateral Raises</h4>
    </div>
  </div>}

  {musclename==="Biceps" && <div class="video-section">
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/_aoad2yuP5w" allowfullscreen></iframe>
      <h4>Dumbbell Curls</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/KFinlAT6aEo" allowfullscreen></iframe>
      <h4>Ez Bar Curl</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/0y4tdUNPdlE" allowfullscreen></iframe>
      <h4>Preacher Curls</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/w5xTuSvjVG0" allowfullscreen></iframe>
      <h4>Spider Curls</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/VuEclXR7sZY" allowfullscreen></iframe>
      <h4>Hammer Curls</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/FHY_2t7R714" allowfullscreen></iframe>
      <h4>Alternating Dumbell Curls</h4>
    </div>
  </div>}

  {musclename==="Forearms" && <div class="video-section">
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/MsDZpKT1x5E" allowfullscreen></iframe>
      <h4>Dumbbell Wrist Curls</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/LRRByjIBfDc" allowfullscreen></iframe>
      <h4>Farmer Walk</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/I_bKCYL2nL8" allowfullscreen></iframe>
      <h4>Concentration Curls</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/04u4uGk3Ia8" allowfullscreen></iframe>
      <h4>Reversed Wrist Curls</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/VuEclXR7sZY" allowfullscreen></iframe>
      <h4>Hammer Curls</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/iP7li-35nzg" allowfullscreen></iframe>
      <h4>Waiter wrist curls</h4>
    </div>
  </div>}

  {musclename==="Abs" && <div class="video-section">
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/4hmQA3snTyk" allowfullscreen></iframe>
      <h4>Crunches</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/CakPX7X-mSw" allowfullscreen></iframe>
      <h4>Bicyle Crunches</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/HrxOWhPdsOY" allowfullscreen></iframe>
      <h4>Dead Bug</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/v3V6iyQfKzY" allowfullscreen></iframe>
      <h4>Plank</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/Wks3wpNJqTg" allowfullscreen></iframe>
      <h4>V Ups</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/wt1zvu84oGo" allowfullscreen></iframe>
      <h4>Leg Raise</h4>
    </div>
  </div>}
   
  {musclename==="Traps" && <div class="video-section">
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/kG4qXCYvITg" allowfullscreen></iframe>
      <h4>Shrugs</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/AWsGWt-VMl8" allowfullscreen></iframe>
      <h4>Upright Row</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/IeOqdw9WI90" allowfullscreen></iframe>
      <h4>Face Pull</h4>
    </div>
  </div>}

  {musclename==="Quads" && <div class="video-section">
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/eFEVKmp3M4g" allowfullscreen></iframe>
      <h4>Squats</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/N4WGYDGu6bI" allowfullscreen></iframe>
      <h4>Front Barbell Squats</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/d3d2yz7V26c" allowfullscreen></iframe>
      <h4>Leg Extension</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/EotSw18oR9w" allowfullscreen></iframe>
      <h4>Leg Press</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/or1frhkjBDc" allowfullscreen></iframe>
      <h4>Split Squats</h4>
    </div>
    
  </div>}

  {musclename==="Calves" && <div class="video-section">
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/fOfPwmb5FXU" allowfullscreen></iframe>
      <h4>Calf Raises</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/OG3OgpXsirQ" allowfullscreen></iframe>
      <h4>Single Lef Calf Raise</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/mafo7o7OnFo" allowfullscreen></iframe>
      <h4>Leg Stretch</h4>
    </div>
    
  </div>}

  {musclename==="Triceps" && <div class="video-section">
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/NTk0Igxqcsk" allowfullscreen></iframe>
      <h4>Overhead Tricep Extension</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/K3mFeNz4e3w" allowfullscreen></iframe>
      <h4>Lying Tricep Extension</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/jlVIALohg2I" allowfullscreen></iframe>
      <h4>Dips</h4>
    </div>
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/WjLJ7zIppXQ" allowfullscreen></iframe>
      <h4>Tricep Pushdown</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/43rg7fBNP2w" allowfullscreen></iframe>
      <h4>Close Grip Bench Press</h4>
    </div>
  </div>}

  {musclename==="Back" && <div class="video-section">
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/CXiAwW1lMhs" allowfullscreen></iframe>
      <h4>One Arm Dumbbell Row</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/eDP_OOhMTZ4" allowfullscreen></iframe>
      <h4>Pull Ups</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/HROup6N-olM" allowfullscreen></iframe>
      <h4>Bent Over Row</h4>
    </div>
    <div class="video-card">
      <iframe title="gg" src="https://youtube.com/embed/7Cjc_aXoQ_I" allowfullscreen></iframe>
      <h4>PullDown</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/ZaTM37cfiDs" allowfullscreen></iframe>
      <h4>Deadlift</h4>
    </div>
    <div class="video-card">
      <iframe title="video" src="https://youtube.com/embed/8pR3JoZ0iBU" allowfullscreen></iframe>
      <h4>T Bar Rows</h4>
    </div>
  </div>}
</section>



        </div>
        {showModal && <LoginPromptModal onClose={() => setshowModal(false)} />}
        </div>
    );
};
export default MuscleTutorial;