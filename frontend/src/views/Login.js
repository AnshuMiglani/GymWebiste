import React, { useState, useEffect } from 'react';
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
    const [forgotMode, setForgotMode] = useState(false);
const [email, setEmail] = useState("");

const [otpSent, setOtpSent] = useState(false);

const [otp, setOtp] = useState([
  "", "", "", "", "", ""
]);

const [otpError, setOtpError] =
  useState(false);

const [otpVerified, setOtpVerified] =
  useState(false);

const [timer, setTimer] = useState(60);

const [passwords, setPasswords] =
  useState({
    password: "",
    confirmPassword: "",
  });

const [passwordError, setPasswordError] =
  useState(false);


useEffect(() => {

  let interval;

  if (otpSent && timer > 0) {

    interval = setInterval(() => {

      setTimer((prev) => prev - 1);

    }, 1000);

  }

  return () => clearInterval(interval);

}, [otpSent, timer]);

const sendOtp = async () => {

  try {

    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/send-otp`,
      { email }
    );

    setOtpSent(true);

    setTimer(60);

    setOtpError(false);
    setOtp(["", "", "", "", "", ""]);

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Failed to send OTP"
    );

  }

};

const handleOtpChange = (value, index) => {

  if (!/^[0-9]?$/.test(value)) return;

  const updated = [...otp];

  updated[index] = value;

  setOtp(updated);

  if (value && index < 5) {

  const next =
    document.getElementById(
      `otp-${index + 1}`
    );

  if (next) next.focus();

}

};

const verifyOtp = async () => {

  try {

    const finalOtp = otp.join("");

    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/verify-otp`,
      {
        email,
        otp: finalOtp,
      }
    );

    if (res.data.success) {

      setOtpVerified(true);
      setOtp(["", "", "", "", "", ""]);
      setOtpError(false);

    }

  } catch (err) {

    setOtpError(true);

  }

};

const resetPassword = async () => {

  if (
    passwords.password !==
    passwords.confirmPassword
  ) {

    setPasswordError(true);

    return;

  }

  try {

    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/reset-password`,
      {
        email,
        password: passwords.password,
      }
    );

    setForgotMode(false);

    setOtpSent(false);

    setOtpVerified(false);

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Reset failed"
    );

  }

};

    const finalsubmitlogin=async(e)=>{
        e.preventDefault();
        try{
            const response= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Login`,currentloginbody,{withCredentials:true});
            console.log(response);
            if (response.data === "done") {
  navigate("/");
} else {
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
     {!forgotMode ? (

<form onSubmit={finalsubmitlogin} className="form">

  <div className="inputBox">
    <input
      id="email"
      name="email"
      type="text"
      value={currentloginbody.email}
      onChange={changelogin}
      required
    />
    <i>Email</i>
  </div>

  <div className="inputBox">
    <input
      id="password"
      name="password"
      type="password"
      value={currentloginbody.password}
      onChange={changelogin}
      required
    />
    <i>Password</i>
  </div>

  {errormilgya && (
    <p style={{ color: "red" }}>
      Invalid Username/Password
    </p>
  )}

  <div className="links">
    <button
      type="button"
      onClick={() => setForgotMode(true)}
      className="bg-transparent border-none text-white cursor-pointer"
    >
      Forgot Password?
    </button>

    <Link to="/Register">Signup</Link>
  </div>

  <div className="inputBox">
    <input type="submit" value="Login" />
  </div>

</form>

) : (

<div className="form">

  <div className="inputBox">
    <input
      type="email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      required
    />
    <i>Email</i>
  </div>

  {!otpSent && (

    <div className="inputBox">
      <input
        type="button"
        value="Send OTP"
        onClick={sendOtp}
      />
    </div>

  )}

  {otpSent && !otpVerified && (

    <>

      <div className="otpContainer">

        {otp.map((digit, index) => (

          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) =>
              handleOtpChange(
                e.target.value,
                index
              )
            }
            className={`otpInput ${
              otpError ? "otpError" : ""
            }`}
          />

        ))}

      </div>

      {otpError && (
        <p className="otpErrorText">
          The OTP you entered is incorrect. Please try again.
        </p>
      )}

<p className="timerText">

  {timer > 0 ? (
    <>
      Didn’t receive the OTP?
      <span className="timerCountdown">
        {" "}Resend in {timer}s
      </span>
    </>
  ) : (
          <span
            className="resendOtp"
            onClick={sendOtp}
          >
            Resend OTP
          </span>
        )}

      </p>

      <div className="inputBox">
        <input
          type="button"
          value="Verify OTP"
          onClick={verifyOtp}
        />
      </div>

    </>

  )}

  {otpVerified && (

    <>

      <div className="inputBox">

        <input
          type="password"
          placeholder="New Password"
          className={
            passwordError
              ? "errorBorder"
              : ""
          }
          onChange={(e) =>
            setPasswords({
              ...passwords,
              password: e.target.value,
            })
          }
        />

      </div>

      <div className="inputBox">

        <input
          type="password"
          placeholder="Confirm Password"
          className={
            passwordError
              ? "errorBorder"
              : ""
          }
          onChange={(e) =>
            setPasswords({
              ...passwords,
              confirmPassword:
                e.target.value,
            })
          }
        />

      </div>

      {passwordError && (

        <p className="otpErrorText">
          Passwords do not match
        </p>

      )}

      <div className="inputBox">

        <input
          type="button"
          value="Reset Password"
          onClick={resetPassword}
        />

      </div>

    </>

  )}

</div>

)}
    </div> 
    </div> 
  </section>
    </div>
        </div>
    );
};

export default Login;