import React, { useState } from 'react';
import Navbar from './Navbar.js';
import './fit-maker-website.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = (props) => {
  const [currentbody, setcurrentbody] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const changevalues = (e) => {
    setErrorMessage("");
    setcurrentbody({ ...currentbody, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (currentbody.password !== currentbody.cpassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (currentbody.name.trim().length < 2) {
      setErrorMessage("Name must be at least 2 characters long.");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
      const response = await axios.post(`${backendUrl}/Register`, {
        name: currentbody.name,
        email: currentbody.email,
        password: currentbody.password,
      }, { withCredentials: true });

      if (response.status === 201) {
        navigate("/Login");
      } else {
        setErrorMessage(response.data?.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const serverMsg = err.response?.data?.error || err.response?.data;
      if (serverMsg) {
        setErrorMessage(typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg));
      } else if (err.code === "ERR_NETWORK" || err.message?.includes("Network Error")) {
        setErrorMessage("Unable to connect to server. If Render backend is sleeping (free tier), it may take ~50 seconds to wake up. Please check your connection or wait a moment.");
      } else {
        setErrorMessage(err.message || "Registration failed. Please check backend connection.");
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
      <div>
        <div className="wrapper">
          <h2>REGISTRATION</h2>
          <form onSubmit={HandleSubmit}>
            <div className="input-box">
              <input
                id="name"
                type="text"
                name="name"
                value={currentbody.name}
                onChange={changevalues}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="input-box">
              <input
                id="email"
                type="email"
                name="email"
                value={currentbody.email}
                onChange={changevalues}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-box">
              <input
                id="password"
                type="password"
                name="password"
                value={currentbody.password}
                onChange={changevalues}
                placeholder="Create password"
                required
              />
            </div>
            <div className="input-box">
              <input
                id="cpassword"
                type="password"
                name="cpassword"
                value={currentbody.cpassword}
                onChange={changevalues}
                placeholder="Confirm password"
                required
              />
            </div>
            {errorMessage && (
              <p style={{ color: "#ff4d4f", fontWeight: "600", fontSize: "14px", marginTop: "8px", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}
            <input
              className="input-box button"
              type="submit"
              value={loading ? "Registering... (please wait)" : "Register Now"}
              disabled={loading}
              style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            />
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