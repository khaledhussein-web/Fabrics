import { Link } from "react-router-dom";
import Seo from "../../components/Seo";

export default function NotFound() {
  return (
    <div className="container py-5 text-center" dir="ltr">
      <Seo
        title="Page Not Found | StageWare"
        description="The requested StageWare page could not be found."
        noindex
      />
      <h1 className="display-6 fw-bold mb-3">Page not found</h1>
      <p className="lead text-muted mb-4">The page you are looking for is not available.</p>
      <Link to="/" className="btn btn-primary rounded-pill px-4">
        Back to home
      </Link>
    </div>
  );
}
