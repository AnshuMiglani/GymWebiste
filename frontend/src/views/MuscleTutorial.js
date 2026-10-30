import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.js';
import Muscular from './Muscular.js';
import './fit-maker-website.css';
import "./BodyMap.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoginPromptModal from './LoginPromptModal.js';
import "./LoginPromptModal.css";

const TUTORIAL_DATA = {
  Chest: [
    { videoId: "1J1fNj6Kp5A", title: "Normal Pushups" },
    { videoId: "_FkbD0FhgVE", title: "Bench Press" },
    { videoId: "8fXfwG4ftaQ", title: "Incline Dumbell Press" },
    { videoId: "a-UFQE4oxWY", title: "Decline Bench Press" },
    { videoId: "p7biTTJvs8g", title: "Chest Butterfly" },
    { videoId: "OolEPKuWiwk", title: "Decline Cable Press" },
  ],
  Shoulder: [
    { videoId: "k6tzKisR3NY", title: "Shoulder Dumbbell Press" },
    { videoId: "Kl3LEzQ5Zqs", title: "Lateral Raises" },
    { videoId: "4HXCYnztyh8", title: "Front Raises" },
    { videoId: "LsT-bR_zxLo", title: "Rear Delt Fly" },
    { videoId: "IeOqdw9WI90", title: "Seated Face Pull" },
    { videoId: "9ilIKuy6B0g", title: "Cable Lateral Raises" },
  ],
  Shoulders: [
    { videoId: "k6tzKisR3NY", title: "Shoulder Dumbbell Press" },
    { videoId: "Kl3LEzQ5Zqs", title: "Lateral Raises" },
    { videoId: "4HXCYnztyh8", title: "Front Raises" },
    { videoId: "LsT-bR_zxLo", title: "Rear Delt Fly" },
    { videoId: "IeOqdw9WI90", title: "Seated Face Pull" },
    { videoId: "9ilIKuy6B0g", title: "Cable Lateral Raises" },
  ],
  Biceps: [
    { videoId: "_aoad2yuP5w", title: "Dumbbell Curls" },
    { videoId: "KFinlAT6aEo", title: "Ez Bar Curl" },
    { videoId: "0y4tdUNPdlE", title: "Preacher Curls" },
    { videoId: "w5xTuSvjVG0", title: "Spider Curls" },
    { videoId: "VuEclXR7sZY", title: "Hammer Curls" },
    { videoId: "FHY_2t7R714", title: "Alternating Dumbell Curls" },
  ],
  Forearms: [
    { videoId: "MsDZpKT1x5E", title: "Dumbbell Wrist Curls" },
    { videoId: "LRRByjIBfDc", title: "Farmer Walk" },
    { videoId: "I_bKCYL2nL8", title: "Concentration Curls" },
    { videoId: "04u4uGk3Ia8", title: "Reversed Wrist Curls" },
    { videoId: "VuEclXR7sZY", title: "Hammer Curls" },
    { videoId: "iP7li-35nzg", title: "Waiter wrist curls" },
  ],
  Abs: [
    { videoId: "4hmQA3snTyk", title: "Crunches" },
    { videoId: "CakPX7X-mSw", title: "Bicycle Crunches" },
    { videoId: "HrxOWhPdsOY", title: "Dead Bug" },
    { videoId: "v3V6iyQfKzY", title: "Plank" },
    { videoId: "Wks3wpNJqTg", title: "V Ups" },
    { videoId: "wt1zvu84oGo", title: "Leg Raise" },
  ],
  Traps: [
    { videoId: "kG4qXCYvITg", title: "Shrugs" },
    { videoId: "AWsGWt-VMl8", title: "Upright Row" },
    { videoId: "IeOqdw9WI90", title: "Face Pull" },
  ],
  Quads: [
    { videoId: "eFEVKmp3M4g", title: "Squats" },
    { videoId: "N4WGYDGu6bI", title: "Front Barbell Squats" },
    { videoId: "d3d2yz7V26c", title: "Leg Extension" },
    { videoId: "EotSw18oR9w", title: "Leg Press" },
    { videoId: "or1frhkjBDc", title: "Split Squats" },
  ],
  Legs: [
    { videoId: "eFEVKmp3M4g", title: "Squats" },
    { videoId: "N4WGYDGu6bI", title: "Front Barbell Squats" },
    { videoId: "d3d2yz7V26c", title: "Leg Extension" },
    { videoId: "fOfPwmb5FXU", title: "Calf Raises" },
    { videoId: "EotSw18oR9w", title: "Leg Press" },
  ],
  Calves: [
    { videoId: "fOfPwmb5FXU", title: "Calf Raises" },
    { videoId: "OG3OgpXsirQ", title: "Single Lef Calf Raise" },
    { videoId: "mafo7o7OnFo", title: "Leg Stretch" },
  ],
  Triceps: [
    { videoId: "NTk0Igxqcsk", title: "Overhead Tricep Extension" },
    { videoId: "K3mFeNz4e3w", title: "Lying Tricep Extension" },
    { videoId: "jlVIALohg2I", title: "Dips" },
    { videoId: "WjLJ7zIppXQ", title: "Tricep Pushdown" },
    { videoId: "43rg7fBNP2w", title: "Close Grip Bench Press" },
  ],
  Back: [
    { videoId: "CXiAwW1lMhs", title: "One Arm Dumbbell Row" },
    { videoId: "eDP_OOhMTZ4", title: "Pull Ups" },
    { videoId: "HROup6N-olM", title: "Bent Over Row" },
    { videoId: "7Cjc_aXoQ_I", title: "PullDown" },
    { videoId: "ZaTM37cfiDs", title: "Deadlift" },
    { videoId: "8pR3JoZ0iBU", title: "T Bar Rows" },
  ],
};

const VideoCard = ({ videoId, title }) => {
  const [play, setPlay] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff3d00]/50 shadow-lg hover:shadow-[#ff3d00]/20 transition-all duration-300 group w-[280px] sm:w-[320px]">
      {play ? (
        <div className="relative w-full h-[200px] bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            className="w-full h-[200px]"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : (
        <div
          className="relative cursor-pointer w-full h-[200px] bg-zinc-900 overflow-hidden"
          onClick={() => setPlay(true)}
        >
          {/* Card thumbnail skeleton while image loads */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-zinc-800/80 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#ff3d00] animate-spin" />
            </div>
          )}

          {/* Thumbnail Image */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-[200px] object-cover group-hover:brightness-75 transition duration-300 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Glowing Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-[#ff3d00] flex items-center justify-center shadow-lg shadow-[#ff3d00]/40 group-hover:scale-110 group-hover:bg-[#ff5722] transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-6 h-6 ml-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Video Title */}
      <div className="p-4 bg-[#0b1120]">
        <h4 className="text-center text-sm font-semibold text-gray-200 group-hover:text-[#ff3d00] transition line-clamp-1">
          {title}
        </h4>
      </div>
    </div>
  );
};

const MuscleTutorial = () => {
  const { musclename } = useParams();
  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth without flashing prompt if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
      axios
        .get(`${backendUrl}/auth-status`, { withCredentials: true })
        .then((res) => {
          setshowModal(!res.data?.Ispresent);
        })
        .catch(() => {
          setshowModal(true);
        });
    }
  }, []);

  // Trigger smooth loader whenever the active muscle changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [musclename]);

  // Match videos with fallback for plural/singular forms
  const normalizedKey = musclename || "Chest";
  const videos =
    TUTORIAL_DATA[normalizedKey] ||
    TUTORIAL_DATA[normalizedKey.replace(/s$/, "")] ||
    TUTORIAL_DATA[`${normalizedKey}s`] ||
    [];

  return (
    <div className="fit-maker-website-container">
      <div className="fit-maker-login-page-navbar">
        <Navbar presentab="Tutorials" />
      </div>

      <div className="Muscularbodyparts">
        <Muscular muscle={musclename} present="No" />

        <section className="w-full px-6 py-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-[#ff3d00] tracking-wide">
              {musclename} Tutorials
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Strengthen, shape, and grow your {musclename} with targeted workouts.
            </p>
          </div>

          {loading ? (
            <div
              className="video-section relative overflow-hidden"
              style={{
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Background Skeleton Video Cards */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 opacity-25 pointer-events-none p-4 max-w-4xl">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10"
                  >
                    <div className="w-full h-[180px] bg-zinc-800 animate-pulse flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-zinc-700/60 animate-pulse" />
                    </div>
                    <div className="p-4 bg-[#0b1120]">
                      <div className="h-4 w-3/4 mx-auto bg-zinc-700/80 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Central Fitness Loading Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[3px] z-10 px-4">
                <div className="relative flex items-center justify-center mb-5">
                  {/* Outer Pulsing Ping Ring */}
                  <div className="absolute w-20 h-20 rounded-full border-2 border-[#ff3d00]/30 animate-ping" />

                  {/* Spinning Gradient Ring */}
                  <div
                    className="w-16 h-16 rounded-full border-3 border-transparent border-t-[#ff3d00] border-r-[#ff7844]"
                    style={{
                      animation: "tutorialSpin 0.85s linear infinite",
                    }}
                  />

                  {/* Central Play Badge */}
                  <div className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff3d00] to-[#ff7844] flex items-center justify-center shadow-lg shadow-[#ff3d00]/50 text-white">
                    <svg className="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-wide mb-1 text-center">
                  Loading {musclename} Tutorials...
                </h3>
                <p className="text-sm text-gray-400 text-center max-w-md">
                  Fetching targeted workouts & HD video demonstrations
                </p>

                {/* Animated Glowing Progress Sweep */}
                <div className="w-52 h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff3d00] via-[#ff9100] to-[#ff3d00]"
                    style={{
                      width: "50%",
                      animation: "tutorialBar 1.2s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>

              <style>{`
                @keyframes tutorialSpin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                @keyframes tutorialBar {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(250%); }
                }
              `}</style>
            </div>
          ) : (
            <div className="video-section">
              {videos.length > 0 ? (
                videos.map((vid) => (
                  <VideoCard
                    key={vid.videoId}
                    videoId={vid.videoId}
                    title={vid.title}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 py-16">
                  <p className="text-lg">No video tutorials available for {musclename} yet.</p>
                  <p className="text-sm text-gray-500 mt-1">Please select another muscle from the anatomical map.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {showModal && <LoginPromptModal onClose={() => setshowModal(false)} />}
    </div>
  );
};

export default MuscleTutorial;