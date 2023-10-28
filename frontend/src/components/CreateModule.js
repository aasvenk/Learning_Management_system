import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CreateModule() {
  const [moduleName, setModuleNmae] = useState("");
  const [ModuleNameError, setModuleNameError] = useState(false);
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    setModuleNameError(false);

    if (moduleName === "") {
      setModuleNameError(true);
    }

    const formData = {
      course_id: id,
      module_name: moduleName,
    };

    axios
      .post("/module/create", formData)
      .then((resp) => {
        if (resp.status === 200) {
          alert("Module created successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error creating module")
      });
  };

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Add module</h2>
        <TextField
          label="Module Name"
          onChange={(e) => setModuleNmae(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          value={moduleName}
          error={ModuleNameError}
          sx={{ mb: 3 }}
          fullWidth
        />
        <Button variant="outlined" color="secondary" type="submit">
          Add
        </Button>
      </form>
    </React.Fragment>
  );
}

export default CreateModule;
