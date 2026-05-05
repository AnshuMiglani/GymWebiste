import React, { useEffect ,useState} from 'react';
import Navbar from './Navbar.js';
import Muscular from './Muscular.js';
import './fit-maker-website.css';
import "./BodyMap.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoginPromptModal from './LoginPromptModal.js';
import "./LoginPromptModal.css";
const VideoCard = ({ videoId, title }) => {
  const [play, setPlay] = useState(false);

  return (
    <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff3d00]/50 shadow-lg hover:shadow-[#ff3d00]/20 transition-all duration-300 group">

      {play ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="w-full h-[200px]"
          allow="autoplay"
        />
      ) : (
        <div
          className="relative cursor-pointer"
          onClick={() => setPlay(true)}
        >
          {/* Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-[200px] object-cover group-hover:brightness-75 transition duration-300"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#ff3d00] flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-6 h-6 ml-[2px]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="p-4">
        <h4 className="text-center text-sm font-medium text-gray-300 group-hover:text-[#ff3d00] transition">
          {title}
        </h4>
      </div>
    </div>
  );
};
const MuscleTutorial=()=>{
  const [showModal,setshowModal]= useState(false);
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth-status`,{withCredentials:true})
    .then((res) => {
      if(res.data.Ispresent){
          setshowModal(false);
      }
      else{
          setshowModal(true);
      }
    })
    .catch(()=>{setshowModal(true)});
  },[]);

    const {musclename} = useParams();
    return(
        <div className="fit-maker-website-container">
        <div className="fit-maker-login-page-navbar">
        <Navbar/>
        </div>
    <div className='Muscularbodyparts'>
        <Muscular muscle={musclename} present="No"/>

        <section className="w-full px-6 py-10">
  <div className="text-center mb-10">
  <h2 className="text-4xl font-bold text-[#ff3d00] tracking-wide">
    {musclename} Tutorials
  </h2>
  <p className="text-gray-400 mt-2">
    Strengthen, shape, and grow your {musclename} with targeted workouts.
  </p>
</div>

  {musclename==="Chest" && <div class="video-section">
    <VideoCard videoId="1J1fNj6Kp5A" title="Normal Pushups" />
    <VideoCard videoId="_FkbD0FhgVE" title="Bench Press" />
    <VideoCard videoId="8fXfwG4ftaQ" title="Incline Dumbell Press" />
    <VideoCard videoId="a-UFQE4oxWY" title="Decline Bench Press" />
    <VideoCard videoId="p7biTTJvs8g" title="Chest Butterfly" />
    <VideoCard videoId="OolEPKuWiwk" title="Decline Cable Press" />
  </div>}
  
  {musclename==="Shoulder" && <div class="video-section">
    <VideoCard videoId="k6tzKisR3NY" title="Shoulder Dumbbell Press" />
    <VideoCard videoId="Kl3LEzQ5Zqs" title="Lateral Raises" />
    <VideoCard videoId="4HXCYnztyh8" title="Front Raises" />
    <VideoCard videoId="LsT-bR_zxLo" title="Rear Delt Fly" />
    <VideoCard videoId="IeOqdw9WI90" title="Seated Face Pull" />
    <VideoCard videoId="9ilIKuy6B0g" title="Cable Lateral Raises" />
  </div>}

  {musclename==="Biceps" && <div class="video-section">
    <VideoCard videoId="_aoad2yuP5w" title="Dumbbell Curls" />
    <VideoCard videoId="KFinlAT6aEo" title="Ez Bar Curl" />
    <VideoCard videoId="0y4tdUNPdlE" title="Preacher Curls" />
    <VideoCard videoId="w5xTuSvjVG0" title="Spider Curls" />
    <VideoCard videoId="VuEclXR7sZY" title="Hammer Curls" />
    <VideoCard videoId="FHY_2t7R714" title="Alternating Dumbell Curls" />
  </div>}

  {musclename==="Forearms" && <div class="video-section">

    <VideoCard videoId="MsDZpKT1x5E" title="Dumbbell Wrist Curls" />
    <VideoCard videoId="LRRByjIBfDc" title="Farmer Walk" />
    <VideoCard videoId="I_bKCYL2nL8" title="Concentration Curls" />
    <VideoCard videoId="04u4uGk3Ia8" title="Reversed Wrist Curls" />
    <VideoCard videoId="VuEclXR7sZY" title="Hammer Curls" />
    <VideoCard videoId="iP7li-35nzg" title="Waiter wrist curls" />
  </div>}

  {musclename==="Abs" && <div class="video-section">
    <VideoCard videoId="4hmQA3snTyk" title="Crunches" />
    <VideoCard videoId="CakPX7X-mSw" title="Bicycle Crunches" />
    <VideoCard videoId="HrxOWhPdsOY" title="Dead Bug" />
    <VideoCard videoId="v3V6iyQfKzY" title="Plank" />
    <VideoCard videoId="Wks3wpNJqTg" title="V Ups" />
    <VideoCard videoId="wt1zvu84oGo" title="Leg Raise" />
  </div>}
   
  {musclename==="Traps" && <div className="video-section">
    <VideoCard videoId="kG4qXCYvITg" title="Shrugs" />
    <VideoCard videoId="AWsGWt-VMl8" title="Upright Row" />
    <VideoCard videoId="IeOqdw9WI90" title="Face Pull" />
  </div>}

  {musclename==="Quads" && <div class="video-section">
    <VideoCard videoId="eFEVKmp3M4g" title="Squats" />
    <VideoCard videoId="N4WGYDGu6bI" title="Front Barbell Squats" />
    <VideoCard videoId="d3d2yz7V26c" title="Leg Extension" />
    <VideoCard videoId="EotSw18oR9w" title="Leg Press" />
    <VideoCard videoId="or1frhkjBDc" title="Split Squats" />
  </div>}

  {musclename==="Calves" && <div class="video-section">
    <VideoCard videoId="fOfPwmb5FXU" title="Calf Raises" />
    <VideoCard videoId="OG3OgpXsirQ" title="Single Lef Calf Raise" />
    <VideoCard videoId="mafo7o7OnFo" title="Leg Stretch" />
  </div>}

  {musclename==="Triceps" && <div class="video-section">
    <VideoCard videoId="NTk0Igxqcsk" title="Overhead Tricep Extension" />
    <VideoCard videoId="K3mFeNz4e3w" title="Lying Tricep Extension" />
    <VideoCard videoId="jlVIALohg2I" title="Dips" />
    <VideoCard videoId="WjLJ7zIppXQ" title="Tricep Pushdown" />
    <VideoCard videoId="43rg7fBNP2w" title="Close Grip Bench Press" />
  </div>}

  {musclename==="Back" && <div class="video-section">
    <VideoCard videoId="CXiAwW1lMhs" title="One Arm Dumbbell Row" />
    <VideoCard videoId="eDP_OOhMTZ4" title="Pull Ups" />
    <VideoCard videoId="HROup6N-olM" title="Bent Over Row" />
    <VideoCard videoId="7Cjc_aXoQ_I" title="PullDown" />
    <VideoCard videoId="ZaTM37cfiDs" title="Deadlift" />
    <VideoCard videoId="8pR3JoZ0iBU" title="T Bar Rows" />
  </div>}
</section>



        </div>
        {showModal && <LoginPromptModal onClose={() => setshowModal(false)} />}
        </div>
    );
};
export default MuscleTutorial;