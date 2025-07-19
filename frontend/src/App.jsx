import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <header className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            Chibi Link
          </Link>
          <Link to="/preview" className="nav-link">
            Preview
          </Link>
        </div>

        <nav className="navbar-right">
          <Link to="/register" className="nav-link">
            Register
          </Link>
          <span className="separator">|</span>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
