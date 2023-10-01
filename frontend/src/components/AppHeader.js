import { Link } from "react-router-dom";
import "./AppHeader.css"

function AppHeader() {
  return (
    <div className="login-header">
      <Link to="/">
        <span className="title">Hoosier Room</span>
      </Link>
      <p>
      </p>
    </div>
    
  );
}

export default AppHeader;
