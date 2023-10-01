import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import ForgotPassword from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import ChangePassword from  "./Pages/ChangePassword"
import HomePage from "./Pages/HomePage";
import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path = "/change-password" element = {<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
