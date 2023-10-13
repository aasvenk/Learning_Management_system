import { useParams } from "react-router-dom";
import AppHeader from "../../components/AppHeader";

function CoursePage() {
  const { id } = useParams()

  return (
    <div>
      <AppHeader />
      <div className="page-container">
        {id}
      </div>
    </div>
  );
}

export default CoursePage;