import React, { useState } from "react";
import axios from "axios";
import "./LoginModal.css";

const LoginModal = ({ show, onClose, setCurrentPage, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const backendUrl = "https://backend-48ig.onrender.com";

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password || (!isLogin && !userId)) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      if (isLogin) {
        const encodedPass = btoa(password); // Use btoa instead of base64.encode
        const res = await axios.post(`${backendUrl}/login`, {
          Email: email,
          Password: encodedPass,
        });

        if (res.status === 200) {
          setMessage("Login successful ✅");
          onLoginSuccess(email);
          setTimeout(() => {
            onClose();
            setCurrentPage("home");
          }, 1000);
        }
      } else {
        const encodedPass = btoa(password); // Use btoa instead of base64.encode
        const res = await axios.post(`${backendUrl}/signup`, {
          UserID: userId,
          Email: email,
          Password: encodedPass,
        });

        if (res.status === 201) {
          setMessage("Signup successful! You can now log in.");
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Login successful!"
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content show" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="modal-title">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          {!isLogin && (
            <div className="form-group">
              <label>User ID:</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your User ID"
              />
            </div>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="toggle-text">
          {isLogin ? (
            <>
              Don’t have an account? <span onClick={() => setIsLogin(false)}>Sign up</span>
            </>
          ) : (
            <>
              Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;