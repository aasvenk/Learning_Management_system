import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setLoggedIn, setToken} from '../slices/userSlice'
import axios from "axios"


function Logout() {
  const navigation = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get("/logout", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
        }
      })
      .then((response) => {
        dispatch(setLoggedIn(false))
        dispatch(setToken(""))
        navigation("/")
      })
      .catch((error) => {
        console.error(error)
      });
  })


  return (
    <div>
      Redirecting...
      {/* <h2>Logged out successfully</h2>
      <Link to="/">
        Go home
      </Link> */}
    </div>
  );
}

export default Logout;
