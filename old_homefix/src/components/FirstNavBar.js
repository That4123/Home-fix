import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../styles/FirstNavBar.css"
function FirstNavbar() {
  const location = useLocation();
  const navLink = [
    ["/", "HOME"],
    ["", "ABOUT US"],
    ["", "CONTACT"]
  ];
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/Login');
  }
  return (
    <nav className="Homepagenavbar">
    <img src="../img/logo_homefix.gif" alt="Ảnh Logo" className="logo" />
    <div className="homepageTab">
    <ul className="NavbarList">
            {navLink.map((item, index) => (
              <li className="active homenavbar">
                <Link to={item[0]} className="nav-link py-0">
                  <p
                    className={
                      location.pathname === item[0]
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
    <button className="Login-button" onClick={handleLogin}>LOGIN</button>
    </nav>
  );
}

export default FirstNavbar;
