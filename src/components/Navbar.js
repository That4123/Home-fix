import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/bootstrap.min.css";
import { AccountLite } from "./AccountLite";

function Navbar(props) {
  const location = useLocation();
  const navLink = [
    ["/SendInformation", "Send request"],
    ["/RequestQueue", "My request"],
    ["/FixQueue", "New Requests"],
    ["/ViewRequest", "View Request"],
    ["/FinancialMan", "Financial Management"],
  ];
  return (
    <div className="row bg-dark fixed-top" style={{ height: "100px" }}>
      <div className="col-10">
        <nav
          className="navbar navbar-expand-lg"
          style={{ backgroundColor: "black", height: "100px" }}
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
                  <li className="nav-item active" key={index}>
                    <Link to={item[0]} className="nav-link py-0">
                      <p className="fs-4 mb-0 colorChange mx-2">{item[1]}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="col-2 text-white">
        <AccountLite user={props.user}></AccountLite>
      </div>
    </div>
  );
}

export default Navbar;
