import { Button } from "@mui/material";
import axios from "axios"

function SocialConnections() {
  const handleGoogleSignIn = () => {
    axios
    .get('/auth/google')
    .then((response) => {
      let {auth_url} = response.data
      window.location.assign(auth_url)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <div>
      <center>
        <Button variant="contained" disableElevation onClick={handleGoogleSignIn}>Google</Button>
      </center>
    </div>
  );
}

export default SocialConnections;
