import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function CourseModuleList() {
    
    const navigate = useNavigate();
    const module_list = [
        {
            id: "01",
            course_id: "101",
            name: "Introduction to Algo"
        },
        {
            id: "02",
            course_id: "101",
            name: "Introduction to Lists"
        }
    ];
    

    return (
        <Box sx={{ display: 'flex',
        flexWrap: 'wrap'}}>
          {module_list.map((module, index) => {
            return (
              <Card sx={{maxWidth: 300}} md={{ maxWidth: 325 }} key={index} style={{margin: "5px"}}>
                <CardMedia
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Module {module.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {module.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate("course/module/")}>Open</Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
    );

}


export default CourseModuleList;