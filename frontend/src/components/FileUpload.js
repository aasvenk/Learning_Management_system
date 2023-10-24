import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios"

function FileUpload({uploadPath, onfileUpload, courseId, moduleId}) {
  
  const [formData, setFormData] = useState({})
  const handleFileUpload = (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append("file", formData["file"])
    data.append("course_id", courseId)
    data.append("module_id", moduleId)
    axios.post(uploadPath, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
      }
    }).then(resp => {
      onfileUpload(formData.file)
    }).catch(err => {
      console.error(err)
    })
  };
  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <form onSubmit={handleFileUpload}>
        <TextField 
          type="file" 
          name="file"
          onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
        />
        <br />
        <Button
          style={{"marginTop": "10px" }}
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </form>
    </div>
  );
}

export default FileUpload;
