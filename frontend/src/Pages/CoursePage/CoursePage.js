import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import CourseAnnoucements from "../../components/CourseAnnoucements";
import EventCalendar from "../../components/EventCalendar";
import "./CoursePage.css";

function CoursePage() {
  const [courseDetails, setCourseDetails] = useState({})
  const { id } = useParams()
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  useEffect(() => {
    axios
    .get("/courseDetails/" + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
      }
    })
    .then((response) => {
      const {courseDetails} = response.data
      setCourseDetails(courseDetails)
    })
    .catch((error) => {
      console.error(error)
    });
  }, [id])

  return (
    <div>
      <div> 
        <AppHeader />
      </div>
      <div className="course-page">
      <Paper elevation={2} style={{ padding: "10px" }}>
        <Box sx={{ width: "100%"}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Course Description" value="1" />
                <Tab label = "Announcements" value = "2" /> 
                <Tab label = "Calendar" value = "3" /> 
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <h1>{courseDetails.name} </h1>
              </div>
              <div>
              {courseDetails.description} </div></TabPanel>
            <TabPanel value="2">
              <CourseAnnoucements />
            </TabPanel>
            <TabPanel value="3">
              <EventCalendar />
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
      </div>
    </div>
  );
}   
export default CoursePage;