// LoginPromptModal.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPromptModal.css'; // Ensure CSS is applied

const LoginPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
      <span style={{ fontSize: "2rem", color: "#ff4500" }}>🔒</span>
        <h2>Please Log In</h2>
        <p>You need to be logged in to access this page.</p>
        <div className="modal-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={()=> navigate('/')}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
