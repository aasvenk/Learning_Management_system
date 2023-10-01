import { useState, useEffect } from 'react';
import axios from "axios"


function Welcome() {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    axios
      .get("/userInfo", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
        }
      })
      .then((response) => {
        console.log(response.data.userInfo)
        setUserInfo(response.data.userInfo)
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
