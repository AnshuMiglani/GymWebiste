import React, { useEffect, useState } from 'react'
import './fit-maker-website.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const getStoredToken = () => {
  try {
    return localStorage.getItem("token") || null;
  } catch (e) {
    return null;
  }
};

const getStoredUser = () => {
  try {
    return {
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || ""
    };
  } catch (e) {
    return { name: "", email: "" };
  }
};

const Navbar = (props) => {
  const storedToken = getStoredToken();
  const storedUser = getStoredUser();

  const [IsAuth, setIsAuth] = useState(!!storedToken);
  const [userEmail, setUserEmail] = useState(storedUser.email);
  const [userName, setUserName] = useState(storedUser.name);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
    axios
      .get(`${backendUrl}/auth-status`, { withCredentials: true })
      .then((res) => {
        setIsAuth(res.data.Ispresent);

        if (res.data.Ispresent) {
          setUserEmail(res.data.email || "");
          setUserName(res.data.name || "");
          if (res.data.name) localStorage.setItem("userName", res.data.name);
          if (res.data.email) localStorage.setItem("userEmail", res.data.email);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          localStorage.removeItem("userEmail");
        }
      })
      .catch((err) => {
        console.log("AUTH ERROR 👉", err);
        setIsAuth(false);
        setUserEmail("");
        setUserName("");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  const handlelogout = async () => {
    try {
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
      await axios.post(`${backendUrl}/Logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      window.location.reload();
    }
  };
    const initial =
  (userName || userEmail)?.charAt(0)?.toUpperCase() || "U";
    return(
        <div className="fit-maker-website-menu">
        <div className="fit-maker-website-frame11">
          <div className="fit-maker-website-frame2891">
            <div className="fit-maker-website-frame2881">
              <img
                src="/images/rectangle23112-t2m-200h.png"
                alt="Rectangle23112"
                className="fit-maker-website-rectangle21"
              />
              <span className="fit-maker-website-text100">
                <span className="fit-maker-website-text101">Make</span>
                <span style={{color: "rgba(217, 10, 20, 1)"}}>FIt</span>
              </span>
            </div>
            <span className="fit-maker-website-text103 TypographyTextSmall">
              Transform Your Body
            </span>
          </div>
        </div>
        <div className="fit-maker-website-frame148">

            <Link style={props.presentab==="Home"? {borderBottom:"2px",borderColor:"rgba(225, 59, 67, 1)",borderBottomStyle:"solid", paddingBottom:"4px",paddingTop:"3px"}:{paddingBottom:"2px"}} to="/">
              Home</Link>
            <div  className="dropdown">
            <button style={props.presentab==="Programs"? {borderTop:"transparent",borderRight:"transparent",borderLeft:"transparent",borderBottom:"2px",borderColor:"rgba(225, 59, 67, 1)",borderBottomStyle:"solid", borderRadius:"0", paddingBottom:"2px"}:{paddingBottom:"2px"}} className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Programs
            </button>
            <ul  className="dropdown-menu" >
            <li><Link className="dropdown-item" to="/programs/losing-weight">Losing Weight</Link></li>
            <li><Link className="dropdown-item" to="/programs/building-muscle">Building Muscle</Link></li>
            <li><Link className="dropdown-item" to="/programs/training-in-home">Training In Home</Link></li>
            <li><Link className="dropdown-item" to="/programs/gym-plan">Gym Plan</Link></li>
            <li><hr className="dropdown-divider my-1 border-zinc-700" /></li>
            <li><Link className="dropdown-item" to="/meal-planner">Meal Planner</Link></li>
            <li><Link className="dropdown-item" to="/workouts">Workouts</Link></li>
            <li><Link className="dropdown-item" to="/plans">View Plans</Link></li>
            </ul>
            </div>

            <Link style={props.presentab==="Dashboard"? {borderBottom:"2px",borderColor:"rgba(225, 59, 67, 1)",borderBottomStyle:"solid", paddingBottom:"4px",paddingTop:"5px"}:{paddingBottom:"2px"}} to="/Dashboard"><p>Dashboard</p></Link>

           <Link style={props.presentab==="Tutorials"? {borderBottom:"2px",borderColor:"rgba(225, 59, 67, 1)",borderBottomStyle:"solid", paddingBottom:"4px",paddingTop:"3px"}:{paddingBottom:"2px"}} to='/tutorials' >
            Tutorials</Link>
          <Link style={props.presentab==="AboutUs"? {borderBottom:"2px",borderColor:"rgba(225, 59, 67, 1)",borderBottomStyle:"solid", paddingBottom:"4px",paddingTop:"3px"}:{paddingBottom:"2px"}} to="/">About Us</Link>
        </div>
        {authLoading ? (
          <div className="flex items-center gap-3" style={{ minHeight: "40px" }}>
            {/* Sleek Skeleton Avatar */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.06) 100%)",
                backgroundSize: "200% 100%",
                animation: "navbarSkeletonShimmer 1.5s infinite ease-in-out",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            />
            {/* Sleek Skeleton Button */}
            <div
              style={{
                width: "82px",
                height: "38px",
                borderRadius: "8px",
                background: "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.06) 100%)",
                backgroundSize: "200% 100%",
                animation: "navbarSkeletonShimmer 1.5s infinite ease-in-out",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            />
            <style>{`
              @keyframes navbarSkeletonShimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}</style>
          </div>
        ) : IsAuth ? (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:scale-105 transition duration-200 shadow-lg shadow-red-500/30">
              {initial}
            </div>

            {/* Logout Button */}
            <button
              onClick={handlelogout}
              className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-200 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="fit-maker-website-frame290">
            <Link to="/Login"><button className="fit-maker-website-button10">
              <span className="fit-maker-website-text109">Login</span>
            </button></Link>
            <Link to="/Register"><button className="fit-maker-website-button11" >
              <span style={{ fontFamily:"Vazirmatn",
    fontWeight: "300",fontSize:"14px",fontStyle:"Light"}}>Sign Up</span>
            </button></Link>
          </div>
        )}
      </div> 
    );
};

export default Navbar;