import React from "react";
import "../styles/Home.css"

function Navbar2() {

  return (
    <div className="navdiv">
    <nav>
         
    <img src="../img/logo_homefix.gif" alt="Ảnh Logo" className="logo" />
    <div className = "tab">
      <div className="active"><a href="">TRANG CHỦ</a></div>
      <div><a href="">YÊU CẦU MỚI</a></div>
      <div><a href="">XEM YÊU CẦU</a></div>
      <div><a href="">PHẢN HỒI</a></div> 
    </div>
    <div className="hicon">
        <a href=""><img src="../img/Account.png" alt="Tài khoản" className="acc" /></a>
        <a href=""><img src="../img/Notification.png" alt="Thông báo" className="noti" /></a>
    </div>
    
   
 
    </nav>
    </div>
  );
}

export default Navbar2;
