import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import AddCourseRequest from "../../components/AddCourseRequest"
function InstructorDashboard() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <Paper elevation={2} style={{ padding: "10px" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          Instructor dashboard
        </Box>
      </Paper>
      <AddCourseRequest></AddCourseRequest>
    </div>
  );
}

export default InstructorDashboard;
