import { Link, useNavigate } from "react-router-dom"
import "./AppHeader.css"
import { useSelector} from 'react-redux'
import Button from '@mui/material/Button'

function AppHeader() {
  const navigation = useNavigate()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const userInfo = useSelector((state) => state.user.userInfo)

  const handleLogout = () => {
    navigation("/logout")
  }
  return (
    <div className="login-header">
      <div className="title-container">
        <Link to="/">
          <span className="title">Hoosier Room</span>
        </Link>
        <span className="user-role">{userInfo.role}</span>
      </div>
      <p>
        {isLoggedIn && (
          <Button variant="contained" disableElevation onClick={handleLogout}>
            Logout
          </Button>
        )}
      </p>
    </div>
  );
}

export default AppHeader;
