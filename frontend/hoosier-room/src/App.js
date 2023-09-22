import React, { useState } from "react";
import "./App.css";

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
    // Client-side validation
    if (username.trim() === "") {
      setUsernameError("Username is required");
      isFormValid = false;
    }

    // Password validation
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    // if (!password.match(passwordRegex)) {
    //   setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol');
    //   return;
    // }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    // need to add logic if both password and username is correct
  };

  const handleForgotPassword = () => {
    // Need to add logic for Forgot password page redirect
  };

  const handleSignUp = () => {
    // Need to add logic for sign up page redirect
  };

  return (
    <div>
      <div className="login-header">
        <span className="title">Hoosier Room</span>
        <p>
          <span className="signup-msg">Don't have an account?</span>
          <a className="signup-link" href="/">Sign up</a>
        </p>
      </div>

      <div className="login-page">
        <div className="login-form">
          <h1>Login in to your acccount</h1>
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
          <a href="/" id="forgot-password">
            Forgot password?
          </a>
          {/* <div className="additional-options">
          <button onClick={handleForgotPassword}>Forgot Password</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
