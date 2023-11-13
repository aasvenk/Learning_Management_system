import axios from "axios";
import React from "react";
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChangePassword from "./Pages/ChangePassword";
import ChatPage from "./Pages/ChatPage";
import CourseModulePage from "./Pages/CourseModulePage";
import CoursePage from "./Pages/CoursePage/CoursePage";
import ForgotPassword from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "./Pages/HomePage";
import InstructorDashboard from "./Pages/InstructorDashboard/InstructorDashboard";
import Logout from "./Pages/Logout";
import SearchPage from './Pages/SearchPage';
import SignupPage from "./Pages/SignupPage";
import TestPage from "./Pages/TestPage";
import LoggedIn from './components/LoggedIn';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common['Authorization'] =  "Bearer " + localStorage.getItem("hoosier_room_token")
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error && error.response && error.response.data && error.response.data.msg === "Token has expired") {
    // alert("Token expired. Redirecting to login..")
    window.location.assign("/logout")
    return
  }
  // alert("Error connecting to server...")
  return Promise.reject(error);
});

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/loggedin" element={<LoggedIn />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path = "/resetpassword" element = {<ChangePassword />} />
        <Route path = "/course/:id" element = {<CoursePage />} />
        <Route path = "/instructor" element = {<InstructorDashboard/>} /> 
        <Route path = "/course/:courseId/module/:moduleId" element = {<CourseModulePage />} />
        <Route path = "/chat" element = {isLoggedIn ? <ChatPage /> : (<h2> Login to access chat </h2>)} />


        <Route path = "/test" element = {<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
