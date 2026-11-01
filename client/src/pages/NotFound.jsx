
import { Link } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">

        <Link to="/" className="not-found-logo">
          <Package size={27} />
          FindIt<span>.</span>
        </Link>

        <div className="not-found-number">404</div>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you are looking for does not exist
          or may have been moved.
        </p>

        <Link to="/" className="not-found-button">
          <ArrowLeft size={17} />
          Back to Homepage
        </Link>

      </div>
    </div>
  );
}
