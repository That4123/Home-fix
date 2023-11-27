import '../styles/styleslogin.css'; // Import CSS file
import "boxicons";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';    
import FirstNavBar from '../components/FirstNavBar'
function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmitLogin = () => {
      // Thực hiện kiểm tra đăng nhập (có thể gửi request đến server để kiểm tra)
  
      // Giả sử đăng nhập thành công, chuyển hướng đến giao diện tương ứng
      if (username === 'provider' && password === '123') {
        navigate('/HomeProvider');
      } 
      else if (username === 'customer' && password === '123') {
       navigate('/HomeCustomer');
      }
      else {
        alert('Invalid username or password');
        navigate('/Login');
      }
    };
    return(
        <div>
            <FirstNavBar/>
           
            <div class="wrapper">
                <form action="Home.js" method="GET">
                    <h2>Đăng nhập</h2>
                    <div class="input-box">
                        <input type="text" placeholder="Tên đăng nhập" required  onChange={(e) => setUsername(e.target.value)}>
                       
                        </input>
                        <i class='bx bxs-user'></i>
                    </div>

                    <div class="input-box">
                        <input type="password" placeholder="Mật khẩu" required onChange={(e) => setPassword(e.target.value)}>
                        
                        </input>
                        <i class='bx bxs-lock'></i>
                    </div>

                    <button type="submit" class="btn" onClick={handleSubmitLogin}>Đăng nhập</button>
                    <div class="signup">
                        <p>Chưa có tài khoản? <a href="signup.html">Đăng kí</a></p>
                    </div>
                </form>
            </div>

        </div>
    );
}
export default Login;