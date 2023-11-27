import {useState, useEffect} from 'react'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import {MenuItem, Box} from '@mui/material/';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SelectDownload from './SelectDownload.js';
import FileUpload from "./FileUpload";
export default function DisplayOptions(props){
	const [student, update] = useState([]);
	const course = props.courseId;
	const assignment = props.assignmentId;
	const [students, updatelist] = useState([]);
	const [viewer, setsubmissions] = useState([])
	const updateStudent = (event) => {    update(event.target.value);}
	  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
useEffect(() => {
      axios
      .post('/submission/all', {
        'assignment_id': props.assignmentId,
        'student_id': student
      })
      .then((res) => {
        const {submissions} = res.data
		console.log(submissions);
        setsubmissions(submissions)
      })
      .catch((err) => {
        console.log(err)
      })
}, [student,assignment])
    
	const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
	useEffect( () => {
	axios.get('getClassmates/' + course).then((resp) => {
		
		const {mates} = resp.data;
		let tmp = [];
		for(let i =0 ; i < mates.length ; i ++){ console.log(mates[i].name); tmp.push([mates[i].user_id , mates[i].name])}
		updatelist(tmp);
		
	})
	
	
	
	
	
	}
	
	
	
	, []);


	return (
	
	<div>

	<h3>View Submissions</h3>
		      <FormControl sx={{ m: 1, width: 300 }} >
        <InputLabel id="demo-simple-select-autowidth-label">Select a Student</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={student}
          onChange={updateStudent}
          MenuProps={MenuProps}
          label="Select a Student"
        >
		{students.map((val) => 
		<MenuItem value={val[0]}>{val[1]}</ MenuItem>
		)}
        </Select>
		{viewer.length > 0 && <SelectDownload options = {viewer}> </SelectDownload>}
      </FormControl>
	
	
		
	
	
	</div>
	
	
	
	
	
	
	
	);



}