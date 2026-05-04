import React, { useState } from 'react';
import Navbar from './Navbar.js';
import { Link, useNavigate } from 'react-router-dom';
import './fit-maker-website.css';
import axios from 'axios';
import './Login.css';

const Login= (props)=>{
    const [currentloginbody,setcurrentloginbody]= useState({email:"",password:""});
    const navigate= useNavigate();
    const [errormilgya,seterrormilgya]= useState(false);
    const changelogin=(e)=>{
        seterrormilgya(false);
        setcurrentloginbody({...currentloginbody,[e.target.name]: e.target.value});
    };

    const finalsubmitlogin=async(e)=>{
        e.preventDefault();
        try{
            const response= await axios.post("http://localhost:8000/Login",currentloginbody,{withCredentials:true});
            console.log(response);
            if(response.status===201){
                navigate("/");
            }
            else{
                seterrormilgya(true);
            }
        }
        catch(e){
            seterrormilgya(true);
            console.log("error:",e);
        }
    };


    return (
        <div className="fit-maker-website-container">
        <div className="fit-maker-login-page-navbar">
        <Navbar/>
        </div>
        <div  className='Loginform'>
        <section>
        
   <div className="signin"> 
    <div className="content"> 
     <h2>Sign In</h2> 
     <form onSubmit={finalsubmitlogin} className="form"> 
      <div className="inputBox"> 
       <input id="email" name="email" type="text" value={currentloginbody.email} onChange={changelogin} required/> <i>Username</i> 
      </div> 
      <div className="inputBox"> 
       <input id="password" name="password" type="password" value={currentloginbody.password} onChange={changelogin} required/> <i>Password</i> 
      </div> 
      {errormilgya && <p style={{color:"red"}}>Invalid Username/Password</p>}
      <div className="links"> <Link to="/">Forgot Password?</Link> <Link to="/Register">Signup</Link> 
      </div> 
      <div className="inputBox"> 
       <input type="submit" value="Login"/> 
      </div> 
     </form> 
    </div> 
    </div> 
  </section>
    </div>
        </div>
    );
};

export default Login;