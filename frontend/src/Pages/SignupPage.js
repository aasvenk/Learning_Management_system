import React, { useState } from "react";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [email,setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError(""); 

    // Check if all necessary fields are filled
    if (
      !firstName ||
      !lastName ||
      !password ||
      !passwordRetype ||
      !email ||
      !securityQuestion
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Check if passwords match
    if (password !== passwordRetype) {
      setError("Passwords do not match.");
      return;
    }
    alert("Signup successful!");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="passwordRetype">Password (Retype)</label>
        <input
          type="password"
          id="passwordRetype"
          value={passwordRetype}
          onChange={(e) => setPasswordRetype(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="securityQuestion">Security Question: What is your birth City?</label>
        <input
          type="text"
          id="securityQuestion"
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
        />
      </div>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default SignupPage;
