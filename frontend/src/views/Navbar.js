import React, { useEffect, useState } from 'react'
import './fit-maker-website.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar= (props)=>{
    const [IsAuth, setIsAuth] = useState(false);
const [userEmail, setUserEmail] = useState("");
const [userName, setUserName] = useState("");
    
    useEffect(() => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/auth-status`, { withCredentials: true })
    .then((res) => {
      console.log("AUTH RESPONSE 👉", res.data);

      setIsAuth(res.data.Ispresent);

      if (res.data.Ispresent) {
        setUserEmail(res.data.email || "");
        setUserName(res.data.name || "");
      }
    })
    .catch((err) => {
      console.log("AUTH ERROR 👉", err);
      setIsAuth(false);
      setUserEmail("");
      setUserName("");
    });
}, []);

    const handlelogout= async()=>{
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Logout`,{},{withCredentials:true});
      window.location.reload();
    }
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
        <div className="fit-maker-website-searchbar">
          <div className="fit-maker-website-frame183">
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/big-data-regular-monochrome-icon/search-893.png"
              alt="basilsearchoutline3109"
              className="fit-maker-website-basilsearchoutline"
              style={{color: "grey"}}
            />
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
        {IsAuth? (<div className="flex items-center gap-3">
  
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

</div>):(
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