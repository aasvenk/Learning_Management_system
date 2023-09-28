import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ForgotPassword from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import ChangePassword from  "./Pages/ChangePassword"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path = "/change-password" element = {<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
