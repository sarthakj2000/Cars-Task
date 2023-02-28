import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav>
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo left">
          Cars
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {token ? (
            <>
              <li>
                <Link to="/create">Create Car</Link>
              </li>
              <li>
                <Link to="/mycars">My Car</Link>
              </li>
              <li>
                <button
                  className="red btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                   
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
