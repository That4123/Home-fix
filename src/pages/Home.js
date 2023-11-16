import React from 'react';
import '../styles/Home.css'; // Import CSS file

function Home() {

  // // Get the subMenu element.
  // const subMenu = document.getElementById('subMenu');

  // // Toggle the visibility of the subMenu element when the noti icon is clicked.
  // const notiIcon = document.querySelector('.noti');
  // notiIcon.addEventListener('click', () => {
  // subMenu.classList.toggle('open-menu');
  // });
  
  return (
    <div>
      <div className="navdiv">
        <nav>
          <div>
            <img src="../img/logo_homefix.gif" alt="Ảnh Logo" className="logo" />
            <ul>
              <li className="active"><a href="">TRANG CHỦ</a></li>
              <li><a href="">YÊU CẦU MỚI</a></li>
              <li><a href="">XEM YÊU CẦU</a></li>
              <li><a href="">PHẢN HỒI</a></li>
            </ul>
          </div>
          <div className="hicon">
            <a href=""><img src="../img/Account.png" alt="Tài khoản" className="acc" /></a>
            <a href=""><img src="../img/Notification.png" alt="Thông báo" className="noti" /></a>
          </div>
        </nav>

        <div class="content" id="subMenu">
            <hr />
            <a href="" class="noti-link">
                <div class="ctitle">
                    <img src="../img/Account.png"/>
                    <h4>Đơn yêu cầu của khách hàng Nguyễn Văn A</h4>
                </div>
                <p>Địa chỉ: aaa, xxx, ddd</p>
                <span href="">Chi tiết '{'>'}'</span>
            </a>
            <hr />
            <a href="" class="noti-link">
                <div class="ctitle">
                    <img src="/asset/img/Account.png"/>
                    <h4>Đơn yêu cầu của khách hàng Nguyễn Văn A</h4>
                </div>
                <p>Địa chỉ: aaa, xxx, ddd</p>
                <span href="">Chi tiết '{'>'}'</span>
            </a>
            <hr />
            <a href="" class="noti-link">
                <div class="ctitle">
                    <img src="../img/Account.png"/>
                    <h4>Đơn yêu cầu của khách hàng Nguyễn Văn A</h4>
                </div>
                <p>Địa chỉ: aaa, xxx, ddd</p>
                <span href="">Chi tiết '{'>'}'</span>
            </a>
            <hr />
            <a href="" class="noti-link">
                <div class="ctitle">
                    <img src="../img/Account.png"/>
                    <h4>Đơn yêu cầu của khách hàng Nguyễn Văn A</h4>
                </div>
                <p>Địa chỉ: aaa, xxx, ddd</p>
                <span href="">Chi tiết '{'>'}'</span>
            </a>
            <hr />
        </div>
      </div>

      <br />
      <br />

      <main>
        <div className="mid-img">
          <img className="mi" src="../img/homepic.png" alt="Hình ảnh trang chủ" />
          {/* <a className="btn" href="">GET A QUOTE</a> */}
        </div>

        <div className="end-note">
          <h4 className="qua">Quality Improvements and Repairs</h4>
          <p>You can be sure that Homefix are reliable and will return your call. We are punctual and we will complete the job with superb attention-to-detail so all work is to the highest standard. Fully guaranteed and insured.</p>
        </div>
      </main>
    </div>
  );
}

export default Home;


// import React from 'react'

// function Home() {
//   return (
//     <div>Hello world</div>
//   );
// }

// export default Home