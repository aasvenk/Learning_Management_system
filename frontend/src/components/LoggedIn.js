import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setLoggedIn, setToken} from '../slices/userSlice'
import { useEffect } from "react"

function LoggedIn() {
  const nav = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token=query.get('token')
    if(token){
      dispatch(setLoggedIn(token))
      dispatch(setToken(token))
      return nav('/')
    }
  })

  return (
    <div className="page-container">
      
    </div>
    
  );
}

export default LoggedIn;
