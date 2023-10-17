import { useState} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useParams } from "react-router-dom";


const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
}));

// Takes course id as input
function EventCalendar() {
  const [events, setEvents] = useState([])
  const { id } = useParams()

  const dateChanged = (newDate) => {
    const dateStr = dayjs(newDate).format('YYYY-MM-DD')
    console.log(dateStr)

    axios
    .post("/events/" + id, {q_date: dateStr}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
      },
    })
    .then((response) => {
      const {events} = response.data
      setEvents(events)
    })
    .catch((error) => {
      console.error(error)
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 1 }}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar onChange={dateChanged} />
            </LocalizationProvider>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <h1>Events</h1>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
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
