import React from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FileUpload from "./FileUpload";
import {useState} from 'react';
const UploadSubmissionToggle = ({assignment_id,user_id}) => {

    const [switchState, changeSwitch] = useState(0);
 
    const switchtheswitch = (event) => {
  
        switch (switchState){
            case 0: 
                changeSwitch(1);
                break;
        default:
            changeSwitch(0);    
        }
    }
    const submission_bx_style = {
        width : '61vw',
        height : '61vh',
    }
 
    const submitText = () => {
        let textbox = document.getElementById('entry')
        console.log(textbox.value)
        }
    return (
        <div>
            <Switch checked={switchState} onChange = {() => switchtheswitch()}>
	</Switch>
	{switchState == 0 && ( <div> <h3>Upload Submission:</h3>
            <FileUpload
              assignmentId={assignment_id}
              studentId={user_id}
              uploadPath="/submission/file/upload"
              onfileUpload={(file) => {
              
                alert("File uploaded successfully")
              }}
            /> </div>)}
	{switchState == 1 && <div> <h3>Manually Enter Submission:</h3> 
	<textarea style = {submission_bx_style} id = "entry"  /><br/><br/>
	<Button variant="contained" onClick = {() => submitText()}>Submit</Button>
	</div>}
        </div>
    );
}

export default UploadSubmissionToggle;
