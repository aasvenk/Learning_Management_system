import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState } from "react";

export default function AdminDashboard(){
    const [value, setValue] = useState("1");
    const [requests, updateRequest] = useState([]);
    

   const reloadRequests = () => {
      axios.get('/getCourseRequests',{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
        }
      }).then(response => {
        let data = response.data['courses']
        if(data.length === 0){data[0] = {"id":"","course_number": "", "course_name" : "No pending requests", "description" : "", "instructor_id" : ""}; }
        updateRequest(data);

      })
   }
   if(requests.length === 0){
    reloadRequests()
   }
    const acceptReq = (req) => {
      if(window.confirm("Are you sure you want to accept request for " + req.course_name + "?")){
        axios.post("/acceptRequest", {
          "courseReq" :  req.course_name
        }, {
          headers: {Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')}
        }
        ).then(response => {
          document.getElementById('response').innerHTML = response.data["msg"];
          reloadRequests()
        })
      }
    }
    const denyReq = (req) => {
      if(window.confirm("Are you sure you want to deny request for " + req.course_name + "?")){
        axios.post("/denyRequest", {
          "courseReq" :  req.course_name
        }, {
          headers: {Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')}
        }
        ).then(response => {
          document.getElementById('response').innerHTML = response.data["msg"];
          reloadRequests()
        })
      }
    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
    return (<div>

        <Paper elevation={2} style={{ padding: "10px" }}>
          <Box sx={{ width: "100%"}}>
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
                <h3>Course Requests</h3>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Instructor</TableCell>
            <TableCell align="right">Course Number</TableCell>
            <TableCell align="right">Course Description</TableCell>
            <TableCell align="right">Accept</TableCell>
            <TableCell align="right">Deny</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((row) => (
            <TableRow
              key={row.course_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.course_name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.instructor_id}</TableCell>
              <TableCell align="right">{row.course_number}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell  align="right"><IconButton disabled= {row.course_name === "No pending requests"} onClick={() => acceptReq(row)}><AddCircleTwoToneIcon></AddCircleTwoToneIcon></IconButton></TableCell>
              <TableCell align="right"><IconButton  disabled= {row.course_name === "No pending requests"} onClick ={() => denyReq(row)}><RemoveCircleTwoToneIcon></RemoveCircleTwoToneIcon></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
           
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
        <p id = "response"></p>
      </div>)
}