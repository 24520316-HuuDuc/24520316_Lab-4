
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router";

import PeopleList from "./components/PeopleList";
import PersonDetail from "./components/PersonDetail";

function MainLayout() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <span className="header-tag">PEOPLE DIRECTORY</span>
          <h1>People Management System</h1>
          <p>Explore and manage people information</p>
        </div>
      </header>

      <main className="master-detail-layout">
        <PeopleList />

        <section className="detail-container">
          <Outlet />
        </section>
      </main>

      <footer className="app-footer">
        People Management System © 2026
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to="/people/1" replace />}
          />

          <Route
            path="/people/:id"
            element={<PersonDetail />}
          />

          <Route
            path="*"
            element={<Navigate to="/people/1" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
