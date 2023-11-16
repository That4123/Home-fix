import React, { useState } from 'react';
import "../styles/FixRequestQueue.css";
const FixQueue = () => {
  const [requests, setRequests] = useState([
    { id: 1, customerName: 'Khách hàng A', repairType: 'Sửa chữa máy tính', address: '123 Đường ABC', imgSrc: '/assets/cus1.png', imageArray: ['/assets/image1.png','/assets/image1.png','/assets/image1.png','/assets/image1.png',], descript: 'Sửa giúp chị cái đi em ơi' },
    { id: 2, customerName: 'Khách hàng B', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi' },
    { id: 3, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi' },
    { id: 4, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi' },
    { id: 5, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi' },
    { id: 6, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi' },
    {id: 7, customerName: 'Khách hàng C', repairType: 'Sửa chữa điều hòa', address: '456 Đường XYZ', imgSrc: '/assets/cus1.png',imageArray: ['/assets/image1.png','/assets/image1.png'],descript: 'Sửa giúp chị cái đi em ơi' }
  ]);
  const [cancelRequestId, setCancelRequestId] = useState(null);
  const [detailRequest, setDetailRequestId] = useState(null);
  const handleCancel = (id) => {
    // Xử lý khi nút "Huỷ" được nhấn
    // Ở đây bạn có thể thực hiện logic để hủy yêu cầu
    console.log('Đã nhấp vào nút huỷ');
    setCancelRequestId(id);
  };
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
          <h2 className='NameCustomer'> Khách hàng: {request.customerName}</h2>
          <div className='Request-Detail'>Loại sửa chữa: {request.repairType}<br />
          Địa chỉ: {request.address}<br /></div>
          <button className = "btn1 chitiet" onClick={() => handleDetail(request.id)}>Chi tiết</button>
          <button className = "btn1 huy"  onClick={() => handleCancel(request.id)}>Huỷ</button>
          </div>
        </li>
        
        ))}
      </ul>
      {cancelRequestId && (
        <div className='overlay'>  
        <div className="confirm-dialog">
          <div className="confirm-content">
            <p>Bạn có chắc chắn muốn huỷ yêu cầu này?</p>
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
          <button className="btn1"onClick={handleCloseDetails}>Đóng</button>
          <button className = "btn1 huy"  onClick={() => handleCancel(detailRequest.id)}>Huỷ</button>
          <button className="btn1 send" onClick={()=>handleSendConfirmRequest(detailRequest.id)}>Gửi yêu cầu xác nhận sửa chữa</button>
        </div>
      )}
    </div>
  );
};

export default FixQueue;