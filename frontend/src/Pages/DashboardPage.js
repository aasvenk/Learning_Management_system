import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import InstructorDashboard from "./InstructorDashboard/InstructorDashboard";
import StudentDashboard from "./StudentDashboard/StudentDashboard";

function DashboardPage() {
  const {role} = useSelector((state) => state.user.userInfo)

  return (
    <div>
      {role === "Admin" && (<AdminDashboard />)}
      {role === "Instructor" && (<InstructorDashboard />)}
      {role === "Student" && (<StudentDashboard />)}
    </div>
  );
}

export default DashboardPage;
