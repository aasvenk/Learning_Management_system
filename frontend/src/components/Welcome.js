import axios from "axios";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function Welcome() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/userInfo", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
        }
      })
      .then((response) => {
        console.log(response.data.userInfo)
        // dispatch(setUserInfo(response.data.userInfo))
      })
      .catch((error) => {
        console.error(error)
      });
 }, []);

  return (
    <div>
      <h1>Welcome {userInfo.lastName}, {userInfo.firstName}</h1>
    </div>
  );
}

export default Welcome;
