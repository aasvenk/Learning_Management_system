import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import CreateModule from "../../components/CreateModule";
import ModuleUI from "../../components/ModuleUI";

function InstructorDashboard() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
  <div>
    <Paper elevation={2} style={{ padding: "10px" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="All Modules" value="1"/>
              <Tab label = "Create Module" value = "2"/>
            </TabList>
          </Box>
          <TabPanel value="1"><ModuleUI /></TabPanel>
          <TabPanel value="2"><CreateModule /></TabPanel>
        </TabContext>
      </Box>
    </Paper>
  </div>
);
}

export default InstructorDashboard;
