import React, { useState } from 'react';
import '../styles/stylesignup.css';
import 'boxicons'; // Make sure to adjust the path and create the appropriate CSS file

const SignUp = () => {
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

  return (
    <div>
      
      <div className="wrapper">
        <form>
          <h2>Đăng kí</h2>
          <div className="input-box">
            <input type="text" placeholder="Tên đăng nhập" required />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input type="text" placeholder="Tên" required />
            <i className="bx bx-text"></i>
          </div>

          <div className="input-box">
            <input
              type="tel"
              placeholder="Số điện thoại (VD: 032-658-1111)"
              required
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
              onChange={handlePasswordChange}
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

          <button type="submit" className="btn-signup" disabled={!passwordsMatch}>
            Đăng kí
          </button>
          <a href="login.html" className="btn-close">
            Quay lại
          </a>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
