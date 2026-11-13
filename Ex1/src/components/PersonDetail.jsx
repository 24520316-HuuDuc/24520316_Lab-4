
import { useParams } from "react-router";
import people from "../data/people";
import NotFoundState from "./NotFoundState";

function PersonDetail() {
  const { id } = useParams();

  const person = people.find((p) => p.id === id);

  if (!person) {
    return <NotFoundState />;
  }

  return (
    <div className="person-detail">
      <h2>{person.name}</h2>

      <div className="detail-info">
        <p><strong>Role:</strong> {person.role}</p>
        <p><strong>Email:</strong> {person.email}</p>
        <p><strong>Age:</strong> {person.age}</p>
        <p><strong>Country:</strong> {person.country}</p>
      </div>
    </div>
  );
}

export default PersonDetail;
