
import { NavLink, Outlet } from "react-router";

function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <h1>People Management System</h1>
        <p>Exercise 1.3 & 1.3.1</p>

        <nav className="navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        People Management System © 2026
      </footer>
    </div>
  );
}

export default Layout;
