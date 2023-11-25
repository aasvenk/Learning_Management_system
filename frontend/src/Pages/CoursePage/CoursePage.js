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
import Assignments from "../../components/Assignments";
import CourseAnnoucements from "../../components/CourseAnnoucements";
import CourseModule from "../../components/CourseModule";
import EventCalendar from "../../components/EventCalendar";
import Grades from "../../components/Grades";


function CoursePage() {
  const [courseDetails, setCourseDetails] = useState({})
  const { id } = useParams()
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  const [value, setValue] = useState(tab);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', newValue);
    window.history.pushState({}, '', url.toString());
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
  }, [id, tab])

  return (
    <div>
      <div> 
        <AppHeader />
      </div>
      <div className="page-container">
      <Paper elevation={2} style={{ padding: "10px" }}>
        <Box sx={{ width: "100%"}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Home Page" value="1" />
                <Tab label="Modules" value="2" />
                <Tab label = "Announcements" value = "3" /> 
                <Tab label = "Calendar" value = "4" /> 
                <Tab label = "Assignments" value = "5" /> 
                <Tab label = "Grades" value = "6" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <h1>{courseDetails.name} </h1>
              </div>
              <div>
              {courseDetails.description} </div></TabPanel>
            <TabPanel value="2">
              <CourseModule />
            </TabPanel>
            <TabPanel value="3">
              <CourseAnnoucements />
            </TabPanel>
            <TabPanel value="4">
              <EventCalendar />
            </TabPanel>
            <TabPanel value = "5">
              <Assignments />
            </TabPanel>
            <TabPanel value = "6">
              <Grades /> 
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
      </div>
    </div>
  );
}   
export default CoursePage;