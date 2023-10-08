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

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
}));

// Takes course id as input
function EventCalendar() {
  const [events, setEvents] = useState([])
  const dateChanged = (newDate) => {
    console.log(dayjs(newDate).toISOString());
    setEvents([
      {
        "id": 1,
        "title": "Title 1",
        "description": "Description 1"
      },
      {
        "id": 2,
        "title": "Title 2",
        "description": "Description 2"
      },
      {
        "id": 3,
        "title": "Title 3",
        "description": "Description 3"
      }
    ])
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 1 }}>
        <Grid item xs={12} md={3}>
          <StyledPaper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar onChange={dateChanged} />
            </LocalizationProvider>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={9}>
          <StyledPaper>
            <h1>Events</h1>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
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
