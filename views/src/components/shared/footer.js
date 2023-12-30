import React from "react"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function Footer() {
    return (
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' , marginTop: '50px'}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='/'>
          HomeFix
        </a>
      </div>
    )
}

export default Footer;