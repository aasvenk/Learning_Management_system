import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input"
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"

export default function AddCourseRequest(){
    const showForm = () => {
        let submission = document.getElementById("form")
        if(submission.hidden){submission.hidden = false; document.getElementById("addCrs").innerHTML = "Hide";}else{submission.hidden = true; document.getElementById("addCrs").innerHTML = "Submit Course Request"; document.getElementById('msg').innerHTML = '';}
    }

    const submitCrsRqst = () =>{
        const course_ID = document.getElementById("course_ID");
        const course_description = document.getElementById("course_description");
        const course_name = document.getElementById("course_name");
        const course_number = document.getElementById("course_number")
        
        let data = {course : {
            ID : course_ID.value,
            course_number : course_number.value,
            course_name : course_name.value,
            course_description : course_description.value
        }}
        axios.post("/makeCourseRequest",data,  {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
            }
            
        }
        ).then( (response) => {
            console.log(response.data.msg)
            document.getElementById('msg').innerHTML = response.data.msg

        }).catch( (e) => {
            console.log(e)
        })
    }
    return <div>
        <Button id = "addCrs" onClick = { () => showForm() } variant="contained">Submit Course Request</Button>
        
        <div id="form" hidden = {true}>
        
        <div className="mbsc-row">
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
        <Input  type= "number" id = "course_ID" label="ID" inputStyle="box" labelStyle="floating" placeholder="Course ID" />
    </div>
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
        <Input id = "course_number" label="Number" inputStyle="box" labelStyle="floating" placeholder="Course Number" passwordToggle="true" />
    </div>
    <div className="mbsc-col-12 mbsc-col-lg-6">
        <Input id = "course_name" label="Name" inputStyle="box" labelStyle="floating" placeholder="Course Name" />
    </div>
</div>
<div className="mbsc-row">
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
        <Input id = "course_description" label="Description" inputStyle="box" labelStyle="floating" placeholder="Description" />
    </div>
   
</div>
<div className="mbsc-row">
    <div className="mbsc-col-12 mbsc-col-md-12 mbsc-col-lg-3">
        <div className="mbsc-button-group-block">
            <Button onClick = {() => submitCrsRqst()} color="success">Submit Course Request</Button>
            <p id = 'msg'></p>
        </div>
    </div>
    </div>
</div>
    
    
    </div>;
}