import { Button, Grid, ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import FileUpload from "../components/FileUpload";

function CourseModulePage() {
  // const [value, setValue] = useState("1");

  const { role } = useSelector((state) => state.user.userInfo);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [createModeLabel, setCreateModeLabel] = useState("Upload file");

  const [files, setFiles] = useState([]);
  const { courseId, moduleId } = useParams();

  useEffect(() => {
    axios
      .get("/module/" + moduleId + "/files")
      .then((resp) => {
        const { files } = resp.data
        console.log(files)
        setFiles(files)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isCreateMode]);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <Box>
      <AppHeader />
      <div className="page-container">
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Grid container spacing={3} style={{ margin: "auto" }}>
            {role === "Instructor" && (
              <Button
                color="primary"
                onClick={() => {
                  setIsCreateMode(!isCreateMode);
                  setCreateModeLabel(
                    isCreateMode ? "Upload file" : "View files"
                  );
                }}
              >
                {createModeLabel}
              </Button>
            )}
            <Grid
              item
              xs={12}
              style={{
                margin: "auto",
                display: !isCreateMode ? "none" : "block",
              }}
            >
              {role === "Instructor" && (
                  <FileUpload
                    moduleId={moduleId}
                    courseId={courseId}
                    uploadPath="/module/file/upload"
                    onfileUpload={(file) => alert("File uploaded successfully")}
                  />
                )}
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                margin: "auto",
                display: isCreateMode ? "none" : "block",
              }}
            >
              {files.length === 0 && (<div>No files</div>)}
              {files.length > 0 && (
              <div>
                <h3> All files </h3>
                <List>
                {files.map((file, index) => {
                  return (
                    <ListItem key={index}>
                      <a href={process.env.REACT_APP_BASE_URL +'/module/file/' + file.filepath} target="_blank" rel="noreferrer">{file.filename}</a>
                    </ListItem>
                  )}
                )}
                </List>
              </div>
              )}
            </Grid>
          </Grid>
          {/* <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label="Files" value="1" />
                  {role === "Instructor" && (
                    <Tab label="Upload file" value="2" />
                  )}
                </TabList>
              </Box>
              <TabPanel value="1">All files</TabPanel>
              <TabPanel value="2">
                {role === "Instructor" && (
                  <FileUpload
                    moduleId={1}
                    courseId={1}
                    uploadPath="/module/file/upload"
                    onfileUpload={(file) => console.log(file)}
                  />
                )}
              </TabPanel>
            </TabContext>
          </Box> */}
        </Paper>
      </div>
    </Box>
  );
}

export default CourseModulePage;
