import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.js';
import { Link, useNavigate } from 'react-router-dom';
import './fit-maker-website.css';
import axios from 'axios';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = (props) => {
  const [currentloginbody, setcurrentloginbody] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const changelogin = (e) => {
    setErrorMessage("");
    setcurrentloginbody({ ...currentloginbody, [e.target.name]: e.target.value });
  };

  const [forgotMode, setForgotMode] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(60);
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
  const [passwordError, setPasswordError] = useState(false);

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
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
      await axios.post(
        `${backendUrl}/send-otp`,
        { email }
      );
      setOtpSent(true);
      setTimer(60);
      setOtpError(false);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const verifyOtp = async () => {
    try {
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
      const finalOtp = otp.join("");
      const res = await axios.post(
        `${backendUrl}/verify-otp`,
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
    if (passwords.password !== passwords.confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
      await axios.post(
        `${backendUrl}/reset-password`,
        {
          email,
          password: passwords.password,
        }
      );

      setForgotMode(false);
      setOtpSent(false);
      setOtpVerified(false);
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  const finalsubmitlogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
      const response = await axios.post(`${backendUrl}/Login`, currentloginbody, { withCredentials: true });

      const isSuccess = response.data === "done" || response.data?.message === "done";

      if (isSuccess) {
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/");
      } else {
        setErrorMessage(response.data?.error || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      const serverMsg = err.response?.data?.error || err.response?.data;
      if (serverMsg) {
        setErrorMessage(typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg));
      } else if (err.code === "ERR_NETWORK" || err.message?.includes("Network Error")) {
        setErrorMessage("Cannot connect to server. If Render backend is sleeping (free tier), it may take ~50 seconds to wake up. Please wait and try again.");
      } else {
        setErrorMessage("Invalid credentials or server connection issue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fit-maker-website-container">
      <div className="fit-maker-login-page-navbar">
        <Navbar />
      </div>
      <div className="Loginform">
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
                      type="email"
                      value={currentloginbody.email}
                      onChange={changelogin}
                      required
                    />
                    <i>Email</i>
                  </div>

                  <div className="inputBox" style={{ position: "relative" }}>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={currentloginbody.password}
                      onChange={changelogin}
                      style={{ paddingRight: "42px" }}
                      required
                    />
                    <i>Password</i>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        color: "#aaa",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                        zIndex: 5
                      }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash size={17} /> : <FaEye size={17} />}
                    </button>
                  </div>

                  {errorMessage && (
                    <p style={{ color: "#ff4d4f", fontSize: "14px", fontWeight: "600", marginTop: "8px", textAlign: "center" }}>
                      {errorMessage}
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
                    <input
                      type="submit"
                      value={loading ? "Logging in..." : "Login"}
                      disabled={loading}
                      style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
                    />
                  </div>
                </form>
              ) : (
                <div className="form">
                  <div className="inputBox">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            className={`otpInput ${otpError ? "otpError" : ""}`}
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
                            <span className="timerCountdown"> Resend in {timer}s</span>
                          </>
                        ) : (
                          <span className="resendOtp" onClick={sendOtp}>
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
                      <div className="inputBox" style={{ position: "relative" }}>
                        <input
                          type={showResetPassword ? "text" : "password"}
                          placeholder="New Password"
                          className={passwordError ? "errorBorder" : ""}
                          onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                          style={{ paddingRight: "42px" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowResetPassword(!showResetPassword)}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "transparent",
                            border: "none",
                            color: "#aaa",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4px",
                            zIndex: 5
                          }}
                          aria-label={showResetPassword ? "Hide password" : "Show password"}
                        >
                          {showResetPassword ? <FaEyeSlash size={17} /> : <FaEye size={17} />}
                        </button>
                      </div>

                      <div className="inputBox" style={{ position: "relative" }}>
                        <input
                          type={showResetPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          className={passwordError ? "errorBorder" : ""}
                          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                          style={{ paddingRight: "42px" }}
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