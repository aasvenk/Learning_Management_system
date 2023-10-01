import { Link } from "react-router-dom"
import "./AppHeader.css"
import { useSelector} from 'react-redux'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setToken} from '../slices/userSlice'
import axios from "axios"

function AppHeader() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const handleLogout = () => {
      axios
      .get("/logout", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
        }
      })
      .then((response) => {
        dispatch(setLoggedIn(false))
        dispatch(setToken(""))
      })
      .catch((error) => {
        console.error(error)
      });
  }
  return (
    <div className="login-header">
      <Link to="/">
        <span className="title">Hoosier Room</span>
      </Link>
      <p>
        { isLoggedIn && (<Button variant="contained" disableElevation onClick={handleLogout}>Logout</Button>)}
      </p>
    </div>
    
  );
}

export default AppHeader;
