import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import axios from "axios"
import { useEffect, useState } from "react";
import * as React from 'react'
import { Alert } from '@mui/material';

export default function ComposeMessage(){
    const [status, setStatus] = useState({hidden : true, msg : "", severity : ""})
    const [courses, setCourses] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [currDisplay, setDisplay] = useState([]);
    
    const handleIndvClick = (studentid) =>{
      
      axios.post("createRoom/directMessage", {recipient_id : studentid},
      {
        headers: {
          Authorization : "Bearer " + localStorage.getItem("hoosier_room_token"),
        }
      }).then( (res) => {
        if(res.status === 200){
          setStatus({hidden : false, msg : "Created the chat room!", severity : "success"})
        }
        
      }).catch((error) => {
        setStatus({hidden : false, msg: error.response.data.error, severity : "error"})

      })
      setOpen(false)
    }
    const handleCourseClick = (courseid) => {
      axios.get("getClassmates/" + courseid, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
        }
      }).then((response) => {
          const {mates} = response.data;
          const structured_mates =  mates.map((mate) => React.cloneElement(<ListItemButton></ListItemButton>, {
            id : mate.user_id,
            onClick : () => { handleIndvClick(mate.user_id)}
          }, mate.name
          ));
          setDisplay(structured_mates);
      })
    }

    const generate = (element) => {      
        const ourclasses =  courses.map((course) => React.cloneElement(element, {
            onClick : () => { handleCourseClick(course.id)}
            

        }, "(" + course.course_number +  ") " + course.course_name))
        setDisplay(ourclasses);
    }
    useEffect(() => {
        axios
        .get("/courseInfo", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
          }
        })
        .then((response) => {
          const {courseInfo} = response.data
          setCourses(courseInfo)
          
        })
        .catch((error) => {
          console.error(error)
        });
        
      }, [])


      useEffect(() => {
        generate(<ListItemButton></ListItemButton>)
      },[courses])


    return <div>
      {status.hidden == false && <Alert severity = {status.severity}>{status.msg}</Alert>}
            <Popup open = {isOpen} onOpen = {() => {setOpen(true)}} trigger=
                {<button> <img width="48" height="48" src="https://img.icons8.com/color/96/multi-edit.png" alt="multi-edit"/> </button>}
                onClose = {() => generate(<ListItemButton></ListItemButton>)}
                modal>
                  
                  <List>
                {currDisplay}
                </List>
               
              
            </Popup>
    </div>
}
