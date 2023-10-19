import Paper from "@mui/material/Paper";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CourseList from "../../components/CourseList";




export default function AdminDashboard(){
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (<div>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Courses" value="1" />
                  <Tab label= "Students" value ="2"/>
                  <Tab label="Teachers" value="3"/>
                 
                </TabList>
              </Box>
              <TabPanel value="1">
                <h3>All Courses</h3>
                <CourseList />
                <h3>Pending Course Requests</h3>
              </TabPanel>
              <TabPanel value="2">
                <h3>Students</h3>
              </TabPanel>
              <TabPanel value="3">
                <h3>Instructors</h3>
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </div>)
}