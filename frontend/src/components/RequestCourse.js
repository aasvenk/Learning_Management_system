import {
  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, TextareaAutosize
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function RequestCourse() {
  const [pendingReqCount, setPendingReqCount] = useState(0)
  const [formData, setFormData] = useState({
    course_number: "",
    course_name: "",
    course_description: "",
  });
  const [pendingReqs, setPendingReqs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/makeCourseRequest", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
        },
      })
      .then((response) => {
        console.log(response.data.msg);
        setPendingReqCount(pendingReqCount + 1)
      })
      .catch((e) => {
        console.log(e)
        alert("Error requesting course")
      });
  };

  useEffect(() => {
    axios
      .get("/pendingRequests", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
        },
      })
      .then((resp) => {
        const { course_reqs } = resp.data;
        setPendingReqs(course_reqs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pendingReqCount]);
  
  return (
    <div>
      <h3>Pending requests</h3>
      {pendingReqs.length === 0 && "No requests"}
      {pendingReqs.length > 0 && (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingReqs.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.course_number}</TableCell>
                <TableCell>{row.course_name}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
      <div>
        <h3>New course request</h3>
        <div style={{ width: 500 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ width: "100%", marginTop: 5 }}
              label="Course number"
              name="course_number"
              value={formData.number}
              onChange={handleChange}
            />

            <TextField
              style={{ width: "100%", marginTop: 5 }}
              label="Course Name"
              name="course_name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextareaAutosize
              style={{ width: "100%", marginTop: 5 }}
              minRows={10}
              maxRows={10}
              placeholder="Course Description"
              name="course_description"
              value={formData.course_description}
              onChange={handleChange}
            />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestCourse;
