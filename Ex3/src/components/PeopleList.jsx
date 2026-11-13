
import { NavLink } from "react-router";
import people from "../data/people";

function PeopleList() {
  return (
    <aside className="people-sidebar">
      <div className="sidebar-heading">
        <h2>People</h2>
        <span>{people.length} members</span>
      </div>

      <div className="people-list">
        {people.map((person) => (
          <NavLink
            key={person.id}
            to={`/people/${person.id}`}
            className={({ isActive }) =>
              isActive ? "person-item active" : "person-item"
            }
          >
            <div className="avatar">
              {person.name.charAt(0)}
            </div>

            <div className="person-info">
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </div>

            <span className="arrow">›</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default PeopleList;
