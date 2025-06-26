import { Link, useLocation, useNavigate } from "react-router";

import { useColor } from "../context/colorContext";


export default function Navbar() {
  const { darkMode, setDarkMode, userId, logout } = useColor();
  const location = useLocation();
  const navigate = useNavigate();

  // Show "Go Back" except on dashboard/home
  const showGoBack = location.pathname !== "/dashboard" && location.pathname !== "/";

  // Custom logout handler to redirect to login
  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="navbar__logo" onClick={() => navigate("/dashboard")}>
        NavFlix
      </div>
      <div className="navbar__links">
        <Link to="/dashboard">Home</Link>
        <Link to="/like">Likes</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="navbar__actions">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? "LigthMode" : "DarkMode"}
        </button>
        {showGoBack && (
          <button onClick={() => navigate(-1)} className="goback-btn">
            Go Back
          </button>
        )}
        {userId ? (
          <>
            <span className="navbar__user">
              {userId.split("@")[0]}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
}