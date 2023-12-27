import React from "react"
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useNavigate
} from "react-router-dom";
import Popper from "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "../../img/SIMSBCLogo.png";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

export default function Navbar(props) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);
  const [role, setRole] = useState(null);
  const user_name = cookies.get("USER_NAME")
  
  useEffect(() => {
    const token = cookies.get("TOKEN");
    console.log(user_name)
    if (!token) {
      setSignIn(false);
    }
    else {
      axios.post("/api/signin/role", { user_name })
      .then((response) => {
        setRole(response.data.role);
        console.log(role);
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [])

  const handleSignOut = (e) => {
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("USER_NAME", {path: "/"} );
    setSignIn(false);
    navigate("signin");
  }


  let navItem = null, renderSignOut = null, renderSignIn = null, renderSignUp = null, renderInfo = null;
  if (!signIn) {
    navItem = (
      <>
        <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">
                Trang chủ
            </Link>
        </li>
      </>
    )
    renderSignUp = (
      <Link className="nav-link mx-4" to="/signup">
        Đăng ký
      </Link>
    );
    renderSignIn = (
      <Link className="nav-link" to="/signin">
          Đăng nhập
      </Link>
    );
  }
  else {
    if (role === "customer"){
      navItem = (
        <>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sendInformation">
              Gởi yêu cầu 
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/CustomerOrderQueue">
              Xem yêu cầu
            </Link>
          </li>
        </>
      )
    }
    else {
      navItem = (
        <>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ProviderOrderQueue">
              Yêu cầu mới
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/CompletedOrder">
              Yêu cầu đã hoàn thành
            </Link>
          </li>
        </>
      )
    
      renderInfo = (
        <Link to={`/providerInfo`}> 
              <button type="submit" className="btn btn-light m-2" >
            Profile
              </button>
          </Link>
       
      )
    }

    
    renderSignOut = (
      <button type="submit" className="btn btn-light" onClick={handleSignOut}>
          Log Out
      </button>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg border-bottom border-body">
            <div className="container-fluid" style={{ marginLeft: '50px', marginRight: '50px' }}>
                <Link className="navbar-brand" to="/">
                    THINGS FIX
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navItem}
                    </ul>
                    {renderSignUp}
                    {renderSignIn}
                    {renderInfo}
                    {renderSignOut}
                </div>
            </div>
        </nav>
  );
}
