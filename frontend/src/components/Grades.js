import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Grades() {
  const { userInfo } = useSelector((state) => state.user);
  const role = userInfo.role
  const user_id = userInfo.id
  const {id} = useParams()

  const StudentView = () => {
    const [grades, setGrades] = useState([])
    const getGrades = () => {
      axios
      .post('/grades/all', {
        'course_id': id,
        'student_id': user_id
      })
      .then((res) => {
        console.log(res.data)
        const {grades} = res.data
        setGrades(grades)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    useEffect(() => {
      getGrades()
    }, [])
    return (
      <Box xs={8}>
        {grades.length === 0 && (<p>No Assignments created</p>)}
        {grades.length !== 0 && (
              <Box sx={{ textAlign: "center" }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Assignment</TableCell>
                        <TableCell>Marks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {grades.map((row, index) => (
                        <TableRow key={index} sx={{cursor: 'pointer'}}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{row.marks + '/' + row.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
        )}
      </Box>
    )
  }

  const InstructorView = () => {
    const {id} = useParams()
    const [grading, setGrading] = useState({
      rows: [],
      cols: []
    })
    const getGrading = () => {
      axios
      .post('/grading', {
        course_id: id
      })
      .then((res) => {
        const {rows, cols} = res.data
        console.log(rows)
        console.log(cols)
        setGrading({
          rows: rows,
          cols: cols
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
    useEffect(() => {
      getGrading()
    }, [])

    const handleMarksChange = (e, row_idx, col_idx) => {
      const newMarks = e.target.value
      let newRows = [...grading.rows]
      newRows[row_idx][col_idx]['marks'] = newMarks
      setGrading({...grading, rows: newRows})
    }

    const updateMarks = (e, row_idx, col_idx) => {
      let newRows = [...grading.rows]
      const student_id = newRows[row_idx][0]['student_id']
      const assignment_id = newRows[row_idx][col_idx]['assignment_id']
      const newMarks = newRows[row_idx][col_idx]['marks']
      axios
      .post('/update_marks', {
        'assignment_id': assignment_id,
        'student_id': student_id,
        'marks': newMarks,
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    return (
      <Box sx={{ textAlign: "center"}}>
        <TableContainer component={Paper} sx={{overflowY: 'auto', height: '70vh'}}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {
                  grading.cols.map((item, index) => {
                    return (
                      <TableCell key={index}>{item.name}</TableCell>
                    )
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                grading.rows.map((row, idx) => {
                  return (
                    <TableRow key={idx}>
                      {
                        row.map((item, index) => {
                          if (index === 0) {
                            return (
                              <TableCell key={index}>{item.student_name}</TableCell>
                            )
                          }
                          return (
                            <TableCell key={index}>
                              <TextField value={item.marks} sx={{width: 50}} 
                              onKeyDownCapture={(e) => {
                                if (e.key === 'Enter'){
                                  updateMarks(e, idx, index)
                                }
                              }}
                              onBlur={(e) => updateMarks(e, idx, index)} 
                              onChange={(e) => handleMarksChange(e, idx, index)}></TextField>
                            </TableCell>
                          )
                        })
                      }
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  const toRender = () => {
    switch (role) {
      case 'Student':
        return <StudentView />
      
      case 'Instructor':
        return <InstructorView />
    
      default:
        return <div>Invalid role</div>
    }
  }

  return (
    <Grid 
      container 
      spacing={2} 
      justifyContent="center"
      alignItems="center">
      <Grid item xs={12}>
        {toRender()}
      </Grid>
    </Grid>
  );
}
export default Grades;
