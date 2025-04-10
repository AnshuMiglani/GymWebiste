import {React, useState} from 'react'
import Navbar from './Navbar.js';
import './fit-maker-website.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register=(props)=>{

  const [currentbody, setcurrentbody]= useState({name:"", email:"",password:"",cpassword:""});
  const navigate= useNavigate();
  const [erroraagya,seterroraagya]= useState(false);
  const changevalues= (e)=>{
    setcurrentbody({...currentbody, [e.target.name]: e.target.value});
  }
  const HandleSubmit= async(e)=>{
    e.preventDefault();
    try{
      if(currentbody.password===currentbody.cpassword){
      seterroraagya(false);
      const response= await axios.post("http://localhost:8000/Register",currentbody,{withCredentials:true});
      if(response.status===201){
        navigate("/Login");
      }
      else{
        seterroraagya(true);
      }
      }
      else{
        seterroraagya(true);
      }
    }
    catch(e){
      seterroraagya(true);
      console.error("Error:" ,e);
    }
  }

    return(
    <div className="fit-maker-website-container">
        <div className="fit-maker-login-page-navbar">
        <Navbar/>
        </div>
        <div >
        <div className="wrapper">
    <h2>REGISTERATION</h2>
    <form onSubmit={HandleSubmit} action="post">
      <div className="input-box">
        <input id="name" type="text" name="name" value={currentbody.name} onChange={changevalues} placeholder="Enter your name" required/>
      </div>
      <div className="input-box">
        <input id="email" type="text" name="email" value={currentbody.email}  onChange={changevalues} placeholder="Enter your email" required/>
      </div>
      <div className="input-box">
        <input id="password" type="password" name="password" value={currentbody.password}  onChange={changevalues} placeholder="Create password" required/>
      </div>
      <div className="input-box">
        <input id="cpassword" type="password" name="cpassword" value={currentbody.cpassword}  onChange={changevalues} placeholder="Confirm password" required/>
      </div>
      {erroraagya ? <p style={{color:"red",fontWeight:"600"}}>Invalid Email/Password</p>: <p></p>}
        
      {/* <div className="policy">
        <input type="checkbox"/>
        <span className='checkbox-container'></span>
        <h3>I accept all terms & condition</h3>
      </div> */}
        <input  className="input-box button" type="Submit" value="Register Now"/>
      <div className="text">
        <h3>Already have an account? <Link to="/Login">Login now</Link></h3>
      </div>
    </form>
  </div>
    </div>
        </div>
    );
};
export default Register;