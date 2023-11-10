import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navLink = [
    ["/SendInformation", "Send request"],
    ["/RequestQueue", "My request"],
    ["/FixQueue", "Fix requests"],
  ];
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <Link to="/" className="me-3">
          <img
            src="https://cdn1.iconfinder.com/data/icons/home-renovation-2/320/house_repairs_home_wrench-512.png"
            alt="Logo"
            style={{ height: "70px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
          style={{ height: "100%" }}
        >
          <ul className="navbar-nav mt-2">
            {navLink.map((item, index) => (
              <li className="nav-item active">
                <Link to={item[0]} className="nav-link py-0">
                  <p
                    className={
                      location.pathname == item[0]
                        ? "fs-4 mb-0 colorChange active"
                        : "fs-4 mb-0 colorChange"
                    }
                  >
                    {item[1]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
