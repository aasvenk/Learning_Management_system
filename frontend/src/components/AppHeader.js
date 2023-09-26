import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <div className="login-header">
      <Link to="/">
        <span className="title">Hoosier Room</span>
      </Link>
      <p>
        <span className="signup-msg">Don't have an account?</span>
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default AppHeader;
