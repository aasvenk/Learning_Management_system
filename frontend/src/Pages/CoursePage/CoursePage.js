import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppHeader from "../../components/AppHeader";
import  "./CoursePage.css";


function CoursePage() {
  const { courseNumber } = useParams()

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }



  // Get details of course based on id (api-call)
  // {title: " ", desc: ""}
  
  const course ={ 
    
    title : 'Course 1',
    Description: "Descirption of course 1",  
  };

  const Announcements = [
    {
      "id" : "1",
      "title" : "Announcement 1",
      "Description" : " Desctiption of Announcement 1"
    },
    {
      "id" : "2",
      "title" : "Announcement 2",
      "Description" : " Desctiption of Announcement 2"
    }
  ];

  return (
    <div>
      <div> 
        <AppHeader />
      </div>
      <div className="course-page">
      <Paper elevation={2} style={{ padding: "10px" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Course Description" value="1" />
                <Tab label = "Announcements" value = "2" /> 
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <h1>{course.title} </h1>
              </div>
              <div>
              {course.Description} </div></TabPanel>
          
            <TabPanel value="2">
              <div>
                  {Announcements.map((announcement, i) => { 
                    return (
                      <div key={i} className="Announcement">
                        <h1>{announcement.title} </h1>
                        <div>{announcement.Description}</div>
                      </div>
                    );
                  })}
               </div></TabPanel>
          </TabContext>
        </Box>
      </Paper>
      </div>
    </div>
  );
}   
export default CoursePage;