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
        "long descrption long descrption long descrption long descrption long descrption 1 ",
      courseNumber: "B505",
    },
    {
      title: "Course 2",
      description:
        "long descrption long descrption long descrption long descrption long descrption 2",
      courseNumber: "B506",
    },
    {
      title: "Course 3",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B507",
    },
    {
      title: "Course 4",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B508",
    },
    {
      title: "Course 5",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B508",
    },
    {
      title: "Course 6",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B509",
    },
    {
      title: "Course 7",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B510",
    },
    {
      title: "Course 8",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B511",
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
              <Button size="small" onClick={() => navigate("/course/{course.courseNumber}}")}>Open</Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>

  );
}
export default CourseList;
