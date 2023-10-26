import axios from "axios";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/userSlice";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import InstructorDashboard from "./InstructorDashboard/InstructorDashboard";
import StudentDashboard from "./StudentDashboard/StudentDashboard";

function DashboardPage() {
  const {role} = useSelector((state) => state.user.userInfo)
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/userInfo", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
        },
      })
      .then((response) => {
        console.log(response.data.userInfo);
        dispatch(setUserInfo(response.data.userInfo));
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    // Get userInfo
    // Based on role render correct dashboard page
    // role?
    <div>
      {role === "Admin" && (<AdminDashboard />)}
      {role === "Instructor" && (<InstructorDashboard />)}
      {role === "Student" && (<StudentDashboard />)}
    </div>
  );
}

export default DashboardPage;
