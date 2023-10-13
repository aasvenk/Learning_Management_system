import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

function CourseList() {
  const navigate = useNavigate();

  const courses = [
    {
      title: "Course 1",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
    {
      title: "Course 1",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
    {
      title: "Course 1",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
    {
      title: "Course 1",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
    {
      title: "Course 1",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
    {
      title: "Course 1",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
    {
      title: "Course 1",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
    {
      title: "Course 1",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
  ];
  return (
    <Box sx={{ display: 'flex',
    flexWrap: 'wrap'}}>
      {courses.map((course, index) => {
        return (
          <Card sx={{maxWidth: 300}} md={{ maxWidth: 325 }} key={index} style={{margin: "5px"}}>
            <CardMedia
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/course/1")}>Open</Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}

export default CourseList;
