import React, { useState } from 'react';
import "../styles/FixRequestQueue.css";
const FixQueue = () => {
  const [requests, setRequests] = useState([
    { id: 1, customerName: 'Khách hàng A', repairType: 'Sửa chữa máy tính', address: '123 Đường ABC', imgSrc: '/assets/th.jpg' },
    { id: 2, customerName: 'Khách hàng B', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/th.jpg'},
    // Thêm các yêu cầu khác vào đây
  ]);

  const handleCancel = (id) => {
    // Xử lý khi nút "Huỷ" được nhấn
    // Ở đây bạn có thể thực hiện logic để hủy yêu cầu
    console.log(`Huỷ yêu cầu có id: ${id}`);
  };

  const handleDetail = (id) => {
    // Xử lý khi nút "Chi tiết" được nhấn
    // Ở đây bạn có thể chuyển đến trang chi tiết của yêu cầu hoặc hiển thị thông tin chi tiết trên cùng trang
    console.log(`Xem chi tiết yêu cầu có id: ${id}`);
  };

  return (
    <div>
      <h1>Danh sách yêu cầu sửa chữa</h1>
      <ul className='RequestList'>
        {requests.map(request => (
            <li className= "Request" key={request.id}>
            <img className= "profile-image" src={request.imgSrc} alt={`Hình ảnh của ${request.customerName}`}  /><br />
            <div className='Request-box'>
          <h2 className='NameCustomer'> Khách hàng: {request.customerName}</h2>
          <div className='Request-Detail'>Loại sửa chữa: {request.repairType}<br />
          Địa chỉ: {request.address}<br /></div>
          <button className = "btn huy"  onClick={() => handleCancel(request.id)}>Huỷ</button>
          <button className = "btn chi tiet" onClick={() => handleDetail(request.id)}>Chi tiết</button>
          </div>
        </li>
        
        ))}
      </ul>
    </div>
  );
};

export default FixQueue;