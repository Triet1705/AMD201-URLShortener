import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <header className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            Chibi Link
          </Link>
          {isAuthenticated && (
            <Link to="/preview" className="nav-link">
              Preview
            </Link>
          )}
        </div>
        <nav className="navbar-right">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-link logout-button">
              Logout
            </button>
          ) : (
            <>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <span className="separator">|</span>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
