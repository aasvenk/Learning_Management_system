import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppHeader from "../../components/AppHeader";
import EventCalendar from "../../components/EventCalendar";
import "./CoursePage.css";
import axios from "axios"
import ModuleForm from "../../components/Announcements";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modules from "../../components/Modules"

function CoursePage() {
  const [courseDetails, setCourseDetails] = useState({})
  const [announcements, setannouncements] = useState([])
  const { id } = useParams()
  const [value, setValue] = useState("1");
  const [modules, setModules] = useState([]);

  const onHandleSubmit = (moduleName) => {
    setModules([...modules, moduleName]);
  };

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
        const { courseDetails } = response.data
        setCourseDetails(courseDetails)
      })
      .catch((error) => {
        console.error(error)
      });

    axios
      .get("/announcements/" + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
        }
      })
      .then((response) => {
        const { announcements } = response.data
        setannouncements(announcements)
      })
      .catch((error) => {
        console.error(error)
      });
  }, [])

  return (
    <div>
      <div>
        <AppHeader />
      </div>
      <div className="course-page">
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Course Description" value="1" />
                  <Tab label="Announcements" value="2" />
                  <Tab label="Calendar" value="3" />
                  <Tab label="Modules" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  <h1>{courseDetails.name} </h1>
                </div>
                <div>
                  {courseDetails.description} </div></TabPanel>

              <TabPanel value="2">
                <div>
                  {announcements.map((announcement, i) => {
                    return (
                      <div key={i} className="Announcement">
                        <h3>{announcement.title} </h3>
                        <div>{announcement.description}</div>
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel value="3">
                <EventCalendar />
              </TabPanel>
              <TabPanel value="2">
                <ModuleForm onHandleSubmit={onHandleSubmit} />
                {modules.length > 0 && (
                  <ul>
                    {modules.map((moduleName, index) => (
                      <li key={index}>{moduleName}</li>
                    ))}
                  </ul>
                )}
              </TabPanel>
              <TabPanel value="4">
                <Modules />
                <ModuleForm onHandleSubmit={onHandleSubmit} />
                {modules.length > 0 && (
                  <ul>
                    {modules.map((moduleName, index) => (
                      <li key={index}>{moduleName}</li>
                    ))}
                  </ul>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
export default CoursePage;