import { Button } from "@mui/material";
import axios from "axios"
import "./SocialConnections.css"

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
    <div className="social-login">
      <h2>Sign in using</h2>
      <center>
        <Button variant="text" disableElevation onClick={handleGoogleSignIn}>
          <img
            style={{ width: "50px", height: "50px", paddingTop: "10px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
          />
        </Button>
        {/* <button className="">
          Log in With Google
        </button> */}
      </center>
    </div>
  );
}

export default SocialConnections;
