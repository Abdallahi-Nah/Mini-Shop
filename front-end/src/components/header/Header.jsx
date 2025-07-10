"use client";

import { useContext, useState } from "react";
import logo from "../../assets/4-UN.jpg";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { User } from "../../context/UserContext";
import Cookies from "universal-cookie";
import axios from "axios";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const paths = ["/", "/about", "/contact", "/register", "/login"];
  const user = useContext(User);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const logout = async () => {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cookie.remove("Bearer");
  };

  // Function to check if link is active
  const isActiveLink = (path) => {
    if (path === "/" && currentPath === "/") {
      return true;
    }
    if (path !== "/" && currentPath.startsWith(path)) {
      return true;
    }
    // Special case for dashboard - check if current path starts with /dashboard
    if (path === "/dashboard/users" && currentPath.startsWith("/dashboard")) {
      return true;
    }
    return false;
  };

  return (
    <div className="header">
      <div className="logo-nav">
        <Link to={"/"} className="logo-link">
          <img src={logo || "/placeholder.svg"} alt="logo" />
        </Link>
        <button
          className="burger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
        <div className={`nav ${isMobileMenuOpen ? "show" : ""}`}>
          <ul>
            {paths.includes(currentPath) && (
              <>
                <Link
                  to="/"
                  className={`Link ${isActiveLink("/") ? "active" : ""}`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`Link ${isActiveLink("/about") ? "active" : ""}`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`Link ${isActiveLink("/contact") ? "active" : ""}`}
                >
                  Contact
                </Link>
                {user.auth.token && (
                  <Link
                    to="/dashboard/users"
                    className={`Link ${
                      isActiveLink("/dashboard/users") ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
              </>
            )}
            {/* Show navigation even when not in main paths but user is authenticated */}
            {!paths.includes(currentPath) && user.auth.token && (
              <>
                <Link
                  to="/"
                  className={`Link ${isActiveLink("/") ? "active" : ""}`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`Link ${isActiveLink("/about") ? "active" : ""}`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`Link ${isActiveLink("/contact") ? "active" : ""}`}
                >
                  Contact
                </Link>
                <Link
                  to="/dashboard/users"
                  className={`Link ${
                    isActiveLink("/dashboard/users") ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="actions">
        {user.auth.token ? (
          <Link to="/login" onClick={logout} className="logout">
            Log out
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className={`register ${
                currentPath === "/register" ? "active-btn" : ""
              }`}
            >
              Register
            </Link>
            <Link
              to="/login"
              className={`login ${
                currentPath === "/login" ? "active-btn" : ""
              }`}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
