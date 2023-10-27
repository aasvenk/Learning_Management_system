import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import ForgotPassword from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import ChangePassword from  "./Pages/ChangePassword"
import CoursePage from  "./Pages/CoursePage/CoursePage"
import HomePage from "./Pages/HomePage";
import axios from "axios"
import LoggedIn from './components/LoggedIn'
import InstructorUpload from "./Pages/InstructorUpload";
import ModuleUI from "./components/ModuleUI";
import InstructorDashboard  from "./Pages/InstructorDashboard/InstructorDashboard";
import ModuleView from "./components/ModuleView";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TestPage from "./Pages/TestPage";
import Logout from "./Pages/Logout";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error && error.response && error.response.data && error.response.data.msg === "Token has expired") {
    alert("Token expired. Redirecting to login..")
    window.location.assign("/logout")
    return
  }
  // alert("Error connecting to server...")
  return Promise.reject(error);
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/loggedin" element={<LoggedIn />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path = "/resetpassword" element = {<ChangePassword />} />
        <Route path = "/course/:id" element = {<CoursePage />} />
        <Route path = "/instructor" element = {<InstructorDashboard/>} /> 
        <Route path = "/course/material" element = {<InstructorUpload />} /> 
        <Route path = "/module" element = {<ModuleUI />} />
        <Route path = "course/module" element = {<ModuleView />} />


        <Route path = "/test" element = {<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
