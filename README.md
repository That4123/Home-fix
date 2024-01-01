# HƯỚNG DẪN CÀI ĐẶT

## YÊU CẦU
- [Node.js](https://nodejs.org/en/download)
- [XAMPP](https://www.apachefriends.org/download.html)
- Clone toàn bộ dự án Homefix về máy.

## THIẾT LẬP

### DATABASE
1. Khởi động XAMPP với quyền admin, bật Apache và MySQL.
2. Truy cập [http://localhost/phpmyadmin/index.php](http://localhost/phpmyadmin/index.php)
3. Chọn "Import" và tải lên file homefix.sql từ thư mục bạn đã clone từ GitHub.

### ỨNG DỤNG
1. Mở Command Prompt (cmd) tại thư mục đã được clone về.
2. Thực hiện các lệnh sau:

```bash
npm install
cd views
npm install
cd ../
npm run dev
```
3. Khởi chạy ứng dụng hoàn tất, người dùng có thể truy cập trang web từ http://localhost:3000/.
  
