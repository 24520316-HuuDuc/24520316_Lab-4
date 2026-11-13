
import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router";

import people from "./data/people";
import Skeleton from "./components/Skeleton";

const PersonDetail = lazy(() =>
  import("./components/PersonDetail")
);

function Home() {
  return (
    <div className="people-list">
      <h2>People Directory</h2>
      <p>Select a person to view their details.</p>

      <div className="people-grid">
        {people.map((person) => (
          <Link
            to={`/people/${person.id}`}
            className="person-card"
            key={person.id}
          >
            <h3>{person.name}</h3>
            <p>{person.role}</p>
            <span>View Details →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="app-container">
        <header className="app-header">
          <h1>People Management System</h1>
          <p>Exercise 1.2 - Performance & Resiliency</p>
          <Link to="/">Home</Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/people/:id"
            element={
              <Suspense fallback={<Skeleton />}>
                <PersonDetail />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={<h2>404 - Page Not Found</h2>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
