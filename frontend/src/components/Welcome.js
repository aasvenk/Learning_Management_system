import { useState, useEffect } from 'react';
import axios from "axios"


function Welcome() {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    axios
      .get("/userInfo", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        setUserInfo(response.data.userInfo)
      })
      .catch((error) => {
        console.error(error)
      });
 }, []);

  return (
    <div>
      <h1>Welcome {userInfo.firstName}, {userInfo.lastName}</h1>
    </div>
  );
}

export default Welcome;
