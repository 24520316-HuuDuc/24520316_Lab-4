
import { useParams, Link } from "react-router";
import people from "../data/people";
import NotFound from "./NotFound";

function PersonDetail() {
  const { id } = useParams();

  const person = people.find((p) => p.id === id);

  if (!person) {
    return <NotFound />;
  }

  return (
    <section className="detail-panel">
      <div className="detail-header">
        <div className="detail-avatar">
          {person.name.charAt(0)}
        </div>

        <div>
          <span className="detail-label">PERSON PROFILE</span>
          <h2>{person.name}</h2>
          <p>{person.role}</p>
        </div>
      </div>

      <div className="detail-content">
        <h3>Personal Information</h3>

        <div className="detail-grid">
          <div className="detail-item">
            <span>Full Name</span>
            <strong>{person.name}</strong>
          </div>

          <div className="detail-item">
            <span>Age</span>
            <strong>{person.age} years old</strong>
          </div>

          <div className="detail-item">
            <span>Email Address</span>
            <strong>{person.email}</strong>
          </div>

          <div className="detail-item">
            <span>Country</span>
            <strong>{person.country}</strong>
          </div>

          <div className="detail-item">
            <span>Profession</span>
            <strong>{person.role}</strong>
          </div>
        </div>

        <div className="description-box">
          <h3>About</h3>
          <p>{person.description}</p>
        </div>

        <Link to="/people/1" className="back-link">
          ← Back to People List
        </Link>
      </div>
    </section>
  );
}

export default PersonDetail;
