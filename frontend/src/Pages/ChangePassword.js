import React, { useState } from "react";
import AppHeader from "../components/AppHeader";
import "../Pages/ChangePassword.css"


function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");


  const handleChangePassword = () => {
    if (!password || !confirmPassword) {
      setError("Enter all Mandatory Fields");
      return;
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!password.match(passwordRegex)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setTimeout(() => {
      alert("Password changed successfully.");
      window.location.href = "/"; 
    }, 1000);
  };

  return (
    <div>
        <AppHeader />
        <div className = 'change-password'>
            <div className="change-password-form">
                <h1>Change Password</h1>
                {error && <div className="error-message">{error}</div>}
                <div>
                    <label htmlFor="password">New Password</label>
                    <span className="required">*</span>
                    <input
                    type="password"
                    id="password"
                    placeholder= "Enter Your New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword"> Retype new Password</label>
                    <span className="required">*</span>
                    <input
                    type="password"
                    id="confirmPassword"
                    placeholder= "Re-enter your new Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleChangePassword}>Change Password</button>
                <div>
                    <p>
                        <a href="/">Back to Login</a>
                    </p>
                </div>
            </div>
        </div>  
    </div>
  
  );
}

export default ChangePassword;
