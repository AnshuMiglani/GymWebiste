import React, { useEffect, useState } from 'react'
import './fit-maker-website.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar= (props)=>{
    const [IsAuth,setIsAuth]= useState(false);
    useEffect(()=>{
      axios.get("http://localhost:8000/auth-status",{withCredentials:true})
      .then(res => setIsAuth(res.data.Ispresent))
      .catch(()=>setIsAuth(false));
    },[]);

    const handlelogout= async()=>{
      await axios.post("http://localhost:8000/Logout",{},{withCredentials:true});
      window.location.reload();
    }
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

            <Link  to="/">
              Home</Link>
            <div  className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Programs
            </button>
            <ul className="dropdown-menu" >
            <li><a className="dropdown-item" href="/">Action</a></li>
            <li><a className="dropdown-item" href="/">Another action</a></li>
            <li><a className="dropdown-item" href="/">Something else here</a></li>
            </ul>
            </div>

            <Link to="/"><p>Dashboard</p></Link>

           <Link to='/tutorials' >
            Tutorials</Link>
          <Link to="/">About Us</Link>
        </div>
        {IsAuth? (<div className="fit-maker-website-frame290">
        <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="sdbn" className='navbarusericon'></img>
          <button className="fit-maker-website-button10" onClick={handlelogout}>
            <span className="fit-maker-website-text109">Logout</span>
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