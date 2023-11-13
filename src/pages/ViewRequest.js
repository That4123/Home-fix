import React, { useState } from 'react';
import "../styles/ViewRequest.css";
const FixQueue = () => {
  const [requests, setRequests] = useState([
    { id: 1, customerName: 'Khách hàng A', repairType: 'Sửa chữa máy tính', address: '123 Đường ABC', imgSrc: '/assets/cus1.png', imageArray: ['/assets/image1.png','/assets/image1.png','/assets/image1.png','/assets/image1.png',], descript: 'Sửa giúp chị cái đi em ơi', status: 'Đang chờ duyệt', status_id:1, price: '500,000' },
    { id: 2, customerName: 'Khách hàng B', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi' ,status: 'Đang chờ duyệt', status_id:1,price: '200,000'},
    { id: 3, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi', status: 'Đã duyệt chờ trả phí', status_id: 2, price: '300,000' },
    { id: 4, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi', status: 'Đang thực hiện', status_id: 3, price: '400,000' },
    { id: 5, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi', status: 'Đã thực hiện xong chờ nhận tiền', status_id:4, price: '1000,000'},
    { id: 6, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi' , status: 'Công việc hoàn tất', status_id:5,price: '100,000'},
    {id: 7, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi', status: 'Công việc hoàn tất' ,status_id:5, price: '500,000'},
    {id: 8, customerName: 'Khách hàng M', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi', status: 'Đã duyệt chờ trả phí' ,status_id:2, price: '500,000'}
  ]);
  const [cancelRequestId, setCancelRequestId] = useState(null);
  const [detailRequest, setDetailRequestId] = useState(null);
  const handleCancel = (id) => {
    // Xử lý khi nút "Huỷ" được nhấn
    // Ở đây bạn có thể thực hiện logic để hủy yêu cầu
    console.log('Đã nhấp vào nút huỷ');
    setCancelRequestId(id);
  };
  const handlePayment = (id) => {
    console.log(`Đã nhấp vào nút thanh toán của công việc có id: ${id} `);
  }
  const handleConfirmCancel = () => {
    // Xử lý hành động huỷ yêu cầu ứng với cancelRequestId
    // Ví dụ: Cập nhật danh sách yêu cầu hoặc thực hiện các thao tác khác
    console.log(`Huỷ yêu cầu có ID ${cancelRequestId}`);
    // Đóng hộp thoại xác nhận và xóa ID của yêu cầu đang huỷ
    setCancelRequestId(null);
  };

  const handleDetail = (id) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt đến đầu trang
    });
    // Xử lý khi nút "Chi tiết" được nhấn
    // Ở đây bạn có thể chuyển đến trang chi tiết của yêu cầu hoặc hiển thị thông tin chi tiết trên cùng trang
    const selected = requests.find(request => request.id === id);
    console.log('Đã nhận được tín hiệu nhấp vào mục nút chi tiết');
    setDetailRequestId(selected);
  };
  const handleSendConfirmRequest = (id) => {
    console.log(`Gửi yêu cầu xác nhận sửa chữa ID ${id}`);
    // e.stopPropation();
  };
  const handleCloseDetails = () => {
    // Đóng hộp thoại chi tiết
    console.log('Đóng hộp thoại chi tiết');
    setDetailRequestId(null);
  };
  const setColorByID = (status_id)=> {
    const colorMap = {
        1: '#FFD700',
        2: '#4CAF50',
        3: '#007BFF',
        4:'#FF5733',
        5:'#E0E0E0'
    };
    return {backgroundColor: `${colorMap[status_id]}`};
  };
  
  return (
    <div>
      {/* <h1>Danh sách yêu cầu sửa chữa</h1> */}
      <ul className='RequestList'>
        {requests.map(request => (
            <li className= "Request" key={request.id}>
              <div className='image-box'>
            <img className= "profile-image" src={request.imgSrc} alt={`Hình ảnh của ${request.customerName}`}/>
            </div>
            <div className='Request-box'>
          <div className='NameCustomer' >  
          <h2> Khách hàng: {request.customerName}</h2>
          <h3 style={setColorByID(request.status_id)}> {request.status}</h3>
          </div>
          <div className='Request-Detail'>Loại sửa chữa: {request.repairType}<br />
          Địa chỉ: {request.address}<br />
          </div>
          <button className = "btn1 chitiet" onClick={() => handleDetail(request.id)}>Chi tiết</button>
          {request.status_id === 2 && (
  <button className="btn1 payment" onClick={() => handlePayment(request.id)}>
    Thanh toán
  </button>
)}
          </div>
        </li>
        
        ))}
      </ul>
      {cancelRequestId && (
        <div className='overlay'>  
        <div className="confirm-dialog">
          <div className="confirm-content">
            <p>Yêu cầu huỷ đơn phương của bạn sẽ được hệ thống xem xét.</p>
            <button className = "btn1 huy"onClick={handleConfirmCancel}>Xác nhận</button>
            <button className= "btn1 "onClick={()=> setCancelRequestId(null)}>Không</button>
          </div>
        </div>
        </div>
      )}
      {detailRequest && (
        <div className='overlay2'> </div>
      )}
       {detailRequest && (
        
        <div className="detail-dialog ">
          <h>Thông tin chi tiết yêu cầu</h>
          <div className='Detail-header-box'>
            <img src={detailRequest.imgSrc} alt={`Hình ảnh của ${detailRequest.customerName}`}  />
          <div className='Detail-request-box'>
              <h2 className='cusName'>Khách hàng: {detailRequest.customerName}</h2>
              <div className='Request-Detail'>Loại sửa chữa: {detailRequest.repairType}<br />
                  Địa chỉ: {detailRequest.address}<br />
              </div>
            </div>
          </div>

          <div className='Detail-Image'>
            <h3>Hình ảnh</h3>
            <div className='Detail-Image-List'>
              {detailRequest.imageArray.map(ImageElement=>(
                   <img src={ImageElement} alt={`Hình ảnh của yêu cầu sửa chữa`}/>
              ))
              }
            </div>
          </div>
          <div className='Request-Description'>
          <h3>Mô tả</h3>
          <h4>{detailRequest.descript}</h4>
          </div>
          <div className='Request-Description'>
          <h3>Thông tin</h3>
          <h5>Ngày yêu cầu sửa chữa : HH:MM DD/MM/YYYY </h5>
          <h5>Thời gian gửi yêu cầu xác nhận : HH:MM DD/MM/YYYY </h5>
          <h5>Thời gian khách hàng xác nhận: HH:MM DD/MM/YYYY </h5>
          <h5>Thời gian trả phí cho hệ thống: HH:MM DD/MM/YYYY </h5>
          <h5>Giá tiền dự kiến : {detailRequest.price}</h5>
          <h5>Thời gian sửa chữa dự kiến: Từ HH:MM DD/MM/YYYY đến HH:MM DD/MM/YYYY </h5>
          <h5>Thời gian đã sửa chữa: HH:MM DD/MM/YYYY </h5>
          <h5>Thời gian hoàn thành sửa chữa: HH:MM DD/MM/YYYY </h5>
          <h5>Thời gian khách hàng trả phí: HH:MM DD/MM/YYYY </h5>
          <h5>Trạng thái công việc: {detailRequest.status}</h5>

          </div>
          <button className="btn1"onClick={handleCloseDetails}>Đóng</button>
          <button className = "btn1 huy"  onClick={() => handleCancel(detailRequest.id)}>Yêu cầu huỷ</button>
          <button className="btn1 send" onClick={()=>handleSendConfirmRequest(detailRequest.id)}>Chat với khách hàng</button>
          {detailRequest.status_id === 2 && (
  <button className="btn1 payment" onClick={() => handlePayment(detailRequest.id)}>
    Thanh toán
  </button>
)}
        </div>
      )}
    </div>
  );
};

export default FixQueue;