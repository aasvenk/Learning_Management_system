import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
}));

// Takes course id as input
function EventCalendar() {
  const [isCreating, setIsCreate] = useState(false);
  const [btnText, setBtnText] = useState("Create event");
  const { role } = useSelector((state) => state.user.userInfo);
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    dateChanged(dayjs())
  }, [isCreating])

  const dateChanged = (newDate) => {
    const dateStr = dayjs(newDate).format("YYYY-MM-DD");

    axios
      .post(
        "/events/" + id,
        { q_date: dateStr },
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("hoosier_room_token"),
          },
        }
      )
      .then((response) => {
        const { events } = response.data;
        console.log(events)
        setEvents(events);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [formData, setFormData] = useState({
    event_name: "",
    event_type: "",
    courseID: "",
    start_time: "",
    end_time: "",
    repeating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData["courseID"] = id;

    console.log(formData);

    if (dayjs(formData.end_time) < dayjs(formData.start_time)) {
      alert('End time can not be before start time')
      return;
    }

    axios
    .post("/createEvent", formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        alert("Event created successfully")
      }
    })
    .catch((e) => {
      console.log(e)
      alert("Error creating event")
    });
  };

  const startTimeChanged = (newDate) => {
    const isoString = dayjs(newDate).toISOString();
    setFormData({
      ...formData,
      'start_time': isoString,
    })
  }

  const endTimeChanged = (newDate) => {
    const isoString = dayjs(newDate).toISOString();
    setFormData({
      ...formData,
      'end_time': isoString,
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {role === "Instructor" && (
        <Button
          color="primary"
          onClick={() => {
            setIsCreate(!isCreating);
            setBtnText(isCreating ? "Create event" : "View events");
          }}
        >
          {btnText}
        </Button>
      )}
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        style={{ display: !isCreating ? "none" : "block" }}
      >
        {role === "Instructor" && (
          <div>
            <h3>New event</h3>
            <div style={{ width: 500 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  style={{ width: "100%", marginTop: 10 }}
                  label="Event name"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                />

                <FormControl style={{ width: "100%", marginTop: 10 }} fullWidth>
                  <InputLabel id="select-label">Select Option</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={formData["event_type"]}
                    name="event_type"
                    label="Select Option"
                    onChange={handleChange}
                  >
                    <MenuItem value="CLASS">Class</MenuItem>
                    <MenuItem value="DISCUSSION">Discussion</MenuItem>
                    <MenuItem value="LAB">Lab</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker label="Event start time" onChange={startTimeChanged} />
                  </DemoContainer>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker label="Event end time" onChange={endTimeChanged} />
                  </DemoContainer>
                </LocalizationProvider>
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </form>
            </div>
          </div>
        )}
      </Grid>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        style={{ display: isCreating ? "none" : "block" }}
      >
        <Grid item xs={12} md={3} style={{ margin: "auto" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={dateChanged} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={8} style={{ margin: "auto" }}>
          <StyledPaper>
            <h1>Events</h1>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Start time</TableCell>
                    <TableCell>End time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.type}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.start_time}</TableCell>
                      <TableCell>{row.end_time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventCalendar;
