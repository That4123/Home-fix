import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header';
import Cookies from "universal-cookie";
import '../../components/signin/signin.css'
const cookies = new Cookies();


function SignIn() {
    const [user_name, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    // const [login, setLogin] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/signin", {
            user_name,
            password
        })
            .then((response) => {
                cookies.set("TOKEN", response.data.token, {
                    path: "/",
                });
                navigate("/publicTest");
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                }
            })
    }
    return (
        <>
        <div class="wrapper">
                <form action="Home.js" method="GET">
                    <h2>Đăng nhập</h2>
                    <div class="input-box">
                        <input type="text" placeholder="Tên đăng nhập" required
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={user_name}
                    onChange={(e) => setEmail(e.target.value)}></input>
                        <i class='bx bxs-user'></i>
                    </div>

                    <div class="input-box">
                        <input type="password" placeholder="Mật khẩu" required  className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        <i class='bx bxs-lock'></i>
                    </div>

                    <button type="submit" class="btn" onClick={(e) => handleSubmit(e)}>Đăng nhập</button>
                    <div class="signup">
                        <p>Chưa có tài khoản? <a href="./signup">Đăng kí</a></p>
                    </div>
                </form>
                <p>{errorMessage ? errorMessage : ""}</p>
            </div>
        </>
       
    )

}
export default SignIn;