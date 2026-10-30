import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Ensure withCredentials is set for all cross-origin cookie requests
axios.defaults.withCredentials = true;

// Axios Request Interceptor:
// 1. Injects Bearer token from localStorage for cross-origin third-party cookie resiliency
// 2. Defensive fix for undefined or double-slash backend URLs
const fallbackBackendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");

axios.interceptors.request.use((config) => {
  if (config.url) {
    // If REACT_APP_BACKEND_URL wasn't set in Vercel build, fix 'undefined/...' calls
    if (config.url.startsWith("undefined/")) {
      config.url = `${fallbackBackendUrl}/${config.url.replace(/^undefined\//, "")}`;
    }
    // Clean duplicate slashes in path (e.g. https://domain.com//route -> https://domain.com/route)
    config.url = config.url.replace(/([^:]\/)\/+/g, "$1");
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
