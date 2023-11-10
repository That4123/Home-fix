import React from 'react';
import './homepage.css'; // Import CSS file

function Homepage() {
  return (
    <div>
      <div className="navdiv">
        <nav>
          <div>
            <img src="/asset/img/logo_homefix.gif" alt="Ảnh Logo" className="logo" />
            <ul>
              <li className="active"><a href="#">TRANG CHỦ</a></li>
              <li><a href="#">GỬI YÊU CẦU</a></li>
              <li><a href="#">XEM YÊU CẦU</a></li>
              <li><a href="#">PHẢN HỒI</a></li>
            </ul>
          </div>
          <div className="hicon">
            <a href="#"><img src="/asset/img/Account.png" alt="Tài khoản" className="acc" /></a>
            <a href="#"><img src="/asset/img/Notification.png" alt="Thông báo" className="noti" /></a>
          </div>
        </nav>
      </div>
      <br />
      <br />

      <main>
        <div className="mid-img">
          <img className="mi" src="/asset/img/homepic.png" alt="Hình ảnh trang chủ" />
          <a className="btn" href="#">GET A QUOTE</a>
        </div>

        <div className="end-note">
          <h4 className="qua">Quality Improvements and Repairs</h4>
          <p>You can be sure that Homefix are reliable and will return your call. We are punctual and we will complete the job with superb attention-to-detail so all work is to the highest standard. Fully guaranteed and insured.</p>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
