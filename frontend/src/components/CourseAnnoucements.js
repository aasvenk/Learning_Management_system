import { Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CourseAnnoucements() {
  const [count, setCount] = useState(0)
  const {role} = useSelector((state) => state.user.userInfo)
  const [announcements, setannouncements] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/announcements/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
        },
      })
      .then((response) => {
        const { announcements } = response.data;
        setannouncements(announcements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, count]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
    formData['courseId'] = id
    console.log(formData)
    axios
    .post("/announcements/create", formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setCount(count + 1)
      }
    })
    .catch((e) => {
      console.log(e)
      alert("Error creating annoucement")
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div>
          {announcements.map((announcement, i) => {
            return (
              <div key={i} className="Announcement">
                <h3>{announcement.title} </h3>
                <div>{announcement.description}</div>
              </div>
            );
          })}
        </div>
      </Grid>
      <Grid item xs={6}>
        {role === "Instructor" && (
          <div>
          <h3>New announcement</h3>
          <div style={{ width: 500 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                style={{ width: "100%", marginTop: 5 }}
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
  
              <TextareaAutosize
                style={{ width: "100%", marginTop: 5 }}
                minRows={10}
                maxRows={10}
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </form>
          </div>
        </div>
        )}
      </Grid>
    </Grid>
  );
}

export default CourseAnnoucements;
