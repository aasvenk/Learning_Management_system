import {
  Alert,
  Box,
  Button,
  Checkbox,
  OutlinedInput,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  TextareaAutosize,
  InputLabel, MenuItem, Select
} from "@mui/material";
import axios from "axios";
import SelectDownload from './SelectDownload.js';
import DisplayOptions from './DisplayOptions.js';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FileUpload from "./FileUpload";
import UploadSubmissionToggle from './UploadSubmissionToggle.js';


function Assignments() {
  const { userInfo } = useSelector((state) => state.user);
  const role = userInfo.role
  const user_id = userInfo.id
  const [view, setView] = useState([]);
  const {id} = useParams()
 
  


  const ViewAll = ({changeView}) => {
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
      axios
      .get('/course/' + id + '/assignment/all')
      .then((res) => {
        const {assignments} = res.data
        setAssignments(assignments)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [])
    
    return (
      <Box>
        <h2>All Assignments</h2>
        {/* {assignments.length === 0 && (
          <Box sx={{ textAlign: "center" }}>
            <img src="/undraw_void_3ggu.png" alt="Empty" height={500}></img>
            <Typography>No assignments</Typography>
          </Box>
        )} */}
        {assignments.length !== 0 && (
          <Box sx={{ textAlign: "center" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.map((row, index) => (
                    <TableRow key={index} onClick={() => changeView(['view_single', row.id])} sx={{cursor: 'pointer'}}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    );
  };

  const Create = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault()
      axios
      .post('/course/' + id + '/assignment/create', formData)
      .then((res) => {
        const {status} = res.data
        if (status === 'success') {
          alert('Created successfully')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    return (
      <Box>
        <h2>Create Assignment</h2>
        <Alert severity="info">Go to assignment in "View all" after creating to upload files</Alert>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ width: "100%", marginTop: 5 }}
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <br/>
          <TextareaAutosize
            style={{ width: "100%", marginTop: 5 }}
            minRows={10}
            maxRows={10}
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </form>
      </Box>
    );
  };

  const Assignment = ({assignment_id}) => {
    const [assignment, setAssignment] = useState({
      title: '',
      description: '',
      files: ['file']
    })
    const [submissions, setSubmissions] = useState([])
    const getSubmissions = () => {
      axios
      .post('/submission/all', {
        'assignment_id': assignment_id,
        'student_id': user_id
      })
      .then((res) => {
        const {submissions} = res.data
        setSubmissions(submissions)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    const getAssignment = () => {
      axios
      .get('/assignment/' + assignment_id)
      .then((res) => {
        const {assignment} = res.data
        setAssignment(assignment)
      })
      .catch((err) => {
        console.log(err)
      })
      if (role === 'Student') {
        getSubmissions()
      }
    }
    useEffect(() => {
      getAssignment()
    }, [])
    return (
      <Box>
        <h2>{assignment.title}</h2>
        <p>{assignment.description}</p>
        <h3>Files</h3>
		<SelectDownload options = {assignment.files} />
        <br/>
        <br/>
        <br/>
        {role === 'Instructor' && (	 <div>  <Box>
            <hr/>
            <h2>Instructor Area</h2>
            <h3>Upload new file</h3>
            <FileUpload
              assignmentId={assignment.id}
              uploadPath="/assignment/file/upload"
              onfileUpload={(file) => {
                alert("File uploaded successfully")
                getAssignment()
              }}
            />
          </Box><DisplayOptions assignmentId ={assignment_id} courseId = {id}/> </div>)
        }
		
        {role === 'Student' && (
          <Box id = 'contained-box'>
            <hr/>
            <h3>Submissions</h3>
            <h4>Previous submissions</h4>
            {submissions.length === 0 && <p>No previous submissions</p>}
            {submissions.length !== 0 && (
              <SelectDownload options = {submissions} />
            )}
            <h4>New submission</h4>
              <UploadSubmissionToggle assignment_id = {assignment.id} user_id ={user_id} updateSubmissions={getSubmissions}></UploadSubmissionToggle>
            
          </Box>
        )}
      </Box>
      
    )
  }

  const toRender = () => {
    switch (view[0]) {
      case "view_all":
        return <ViewAll changeView={(view) => setView(view)}/>;
      case "create":
        return <Create />;
      case 'view_single':
        return <Assignment assignment_id={view[1]}/>
      default:
        return <ViewAll changeView={(view) => setView(view)}/>;
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ margin: "auto" }}>
        <Grid item xs={3}>
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                setView(["view_all"]);
              }}
            >
              <ListItemButton>
                <ListItemText primary="View All" />
              </ListItemButton>
            </ListItem>
            {role === 'Instructor' && (
              <ListItem
                disablePadding
                onClick={() => {
                  setView(["create"]);
                }}
              >
                <ListItemButton>
                  <ListItemText primary="Create" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
          {/* </Box> */}
        </Grid>
        <Grid item xs={8}>
          {toRender()}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Assignments;
