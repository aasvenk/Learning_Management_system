import React, {useState} from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom"
 
function CreateModule ()  {
    const [courseId, setcourseId] = useState("")
    const [moduleName, setModuleNmae] = useState("")
    const [courseIdError, setCourseIdError] = useState(false)
    const [ModuleNameError, setModuleNameError] = useState(false)
 
    const handleSubmit = (event) => {
        event.preventDefault()
 
        setCourseIdError(false)
        setModuleNameError(false)
 
        if (courseId == '') {
            setCourseIdError(true)
        }
        if (moduleName == '') {
            setModuleNameError(true)
        }
 
        if (courseId && moduleName) {
           console.log("Module Added")
        }
    }
     
    return ( 
        <React.Fragment>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Add Module For a course</h2>
                <TextField 
                    label="Course ID"
                    onChange={e => setcourseId(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    value={courseId}
                    error={courseIdError}
                    fullWidth
                 />
                 <TextField 
                    label="Module Name"
                    onChange={e => setModuleNmae(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={moduleName}
                    error={ModuleNameError}
                    sx={{mb: 3}}
                    fullWidth
                 />
                 <Button variant="outlined" color="secondary" type="submit">Add</Button>
             
        </form>
        </React.Fragment>
     );
}
 
export default CreateModule;