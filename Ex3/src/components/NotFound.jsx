
import { Link } from "react-router";

function NotFound() {
  return (
    <section className="not-found">
      <h2>404</h2>
      <h3>Person Not Found</h3>

      <p>
        Sorry, the person you are looking for does not exist.
      </p>

      <Link to="/people/1" className="back-link">
        ← Back to People List
      </Link>
    </section>
  );
}

export default NotFound;
