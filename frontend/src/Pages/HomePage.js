
import "./HomePage.css";
import AppHeader from "../components/AppHeader";
import { useSelector} from 'react-redux'
import Login from "../components/Login";
import DashboardPage from "./DashboardPage";

function HomePage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  // console.log(isLoggedIn)
  return (
    <div>
      <AppHeader />
      <div className="page-container">
        {!isLoggedIn && <Login />}
        {isLoggedIn && <DashboardPage />}
      </div>
    </div>
  );
}

export default HomePage;
