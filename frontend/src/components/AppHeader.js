import Search from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserInfo } from "../slices/userSlice";
import "./AppHeader.css";

function AppHeader() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    axios
      .get("/userInfo", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
        },
      })
      .then((response) => {
        dispatch(setUserInfo(response.data.userInfo));
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleSearch = () => {
    navigation("/search")
  }

  const handleLogout = () => {
    navigation("/logout");
  };
  return (
    <div className="login-header">
      <div className="title-container">
        <Link to="/">
          <span className="title">Hoosier Room</span>
        </Link>
        <span className="user-role">{userInfo.role}</span>
      </div>
      <div>
        {isLoggedIn && (
          <div>
            <Button
              style={{ marginRight: "10px" }}
              variant="text"
              color="primary"
              type="submit"
              onClick={handleSearch}
              startIcon={<Search />}>Search</Button>
              
            <Button variant="contained" disableElevation onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppHeader;
