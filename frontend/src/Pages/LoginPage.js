import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import AppHeader from "../components/AppHeader";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    setUsernameError("");
    setPasswordError("");

    let isFormValid = true;
    if (username.trim() === "") {
      setUsernameError("Username is required");
      isFormValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    axios
      .post("/login", {
        email: username,
        password: password,
      })
      .then((response) => {
        alert("Token: " + response.data.access_token);
      })
      .catch((error) => {
        alert("Incorrect credentials");
      });
  };

  return (
    <div>
      <AppHeader />

      <div className="login-page">
        <div className="login-form">
          <h1>Login in to your account</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <span className="required">*</span>
            <input
              type="text"
              id="username"
              placeholder="Enter your email address"
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && (
              <div className="error-message">{usernameError}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <span className="required">*</span>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>
          <div className="actions">
            <button onClick={handleLogin}>Login</button>
          </div>
          <Link to="/forgot-password" id="forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
