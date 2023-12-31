import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header';
import Cookies from "universal-cookie";
import '../../components/signup/signup.css'
const cookies = new Cookies();

function SignUp() {
    const [user_id, setUserID] = useState("");
    const [user_name, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [name_customer, setNameCustomer] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const handlePasswordChange = () => {
    const password1El = document.getElementById('password1');
    const password2El = document.getElementById('password2');

    // Check if passwords match
    if (password1El.value === password2El.value) {
      setPasswordsMatch(true);
      password1El.style.borderColor = 'green';
      password2El.style.borderColor = 'green';
    } else {
      setPasswordsMatch(false);
      password1El.style.borderColor = 'red';
      password2El.style.borderColor = 'red';
    }
  };
    // const [login, setLogin] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        cookies.set("USER_NAME", user_name, { path: "/" });
        axios.post("/api/register", {
            user_name,
            name_customer,
            phone_number,
            password
        })
            .then((response) => {
                cookies.set("TOKEN", response.data.token, {path: "/"});
                console.log("Sign Up")
                console.log(response.data.token)
                setTimeout(() => {
                  window.location.reload();
                }, 100);
                navigate("/");
            })
            .catch((error) => {
              console.log("EERROR")
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                }
            })
    }
    return (
        <>



        <div className="wrapper">
        <form>
          <h2>Đăng kí</h2>
          <div className="input-box">
            <input type="text" placeholder="Tên đăng nhập" required  onChange={(e) => setUserName(e.target.value)}/>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input type="text" placeholder="Tên" required  onChange={(e) => setNameCustomer(e.target.value)}/>
            <i className="bx bx-text"></i>
          </div>

          <div className="input-box">
            <input
              type="tel"
              placeholder="Số điện thoại (VD: 032-658-1111)"
              required
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <i className="bx bxs-phone"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password1"
              placeholder="Mật khẩu"
              required
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
              onChange={(e) => {setPassword(e.target.value); handlePasswordChange();}}
            />
            <i className="bx bxs-lock"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password2"
              placeholder="Nhập lại mật khẩu"
              required
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              onChange={handlePasswordChange}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" className="btn-signup" disabled={!passwordsMatch} onClick={(e) => handleSubmit(e)} >
            Đăng kí
          </button>
          <p>{errorMessage ? errorMessage : ""}</p>
          <a href="./signin" className="btn-close">
            Quay lại
          </a>
        </form>
      </div>
        
        
        </>
        
    )

}
export default SignUp;