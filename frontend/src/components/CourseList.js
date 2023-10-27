// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Box from '@mui/material/Box';
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios"

// function CourseList() {
//   const [courses, setCourses] = useState([])
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//     .get("/courseInfo", {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
//       }
//     })
//     .then((response) => {
//       const {courseInfo} = response.data
//       setCourses(courseInfo)
//     })
//     .catch((error) => {
//       console.error(error)
//     });
//   }, [])

//   return (
//     <Box sx={{ display: 'flex',
//     flexWrap: 'wrap'}}>
//       {courses.map((course, index) => {
//         return (
//           <Card sx={{maxWidth: 300}} md={{ maxWidth: 325 }} key={index} style={{margin: "5px"}}>
//             <CardMedia
//               image="/static/images/cards/contemplative-reptile.jpg"
//               title="green iguana"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {course.course_name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {course.description}
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button size="small" onClick={() => navigate("/course/" + course.id)}>Open</Button>
//             </CardActions>
//           </Card>
//         );
//       })}
//     </Box>

//   );
// }
// export default CourseList;


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
      title: "Software Engineering I",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B501",
    },
    {
      title: "Software Engineering II",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B502",
    },
    {
      title: "Software Development",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B503",
    },
    {
      title: "Object Oriented Programming System",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B504",
    },
    {
      title: "Introduction to Database",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B505",
    },
    {
      title: "Applied Engineering",
      description:
        "long descrption long descrption long descrption long descrption long descrption",
      courseNumber: "B506",
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