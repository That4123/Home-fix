import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'
import providerAvt from '../provider_avt.jpg';
import './RequestDetail.css';
import ImageCusDetail from './image1.png'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('TOKEN');
const ModalNoti=({isModalNotiOpen,setModalNoti,message,setLoading})=>{
  return(
    <Modal
      className={"popup-complete-config"}
      overlayClassName={"complete-config-ctn"}
      isOpen={isModalNotiOpen}
      onRequestClose={() => setModalNoti(false)}
      ariaHideApp={false}
    >
      <h2>Thông báo</h2>
      <span className="span-complete-config">
        <p className="complete-noti-content">{message}</p>
        <button onClick={() => setModalNoti(false)} className="complete-noti-btn">
          Đóng
        </button>
      </span>
    </Modal>
  )
}
function RequestDetails() {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [isModalNotiOpen, setModalNoti] = useState(false);

  const { order_id } = useParams();
  const cancelOrder = () => {
    axios
      .post('/api/orderQueue/customer/cancelOrder', {
        order_id: order_id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setResponseMessage('Hủy thành công');
        setModalNoti(true);
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          status: 'Đã hủy',
        }));
      })
      .catch((error) => {
        setResponseMessage('Yêu cầu không tồn tại hoặc đã bị hủy');
        setModalNoti(true);
      });
  }
  useEffect(() => {
    axios
      .post(
        '/api/orderQueue/customer/getOrderDetails',
        {
          order_id: order_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setErrorMessage('');
        setSelectedOrder(response.data.service_order);
        const src_image_description = [ImageCusDetail, ImageCusDetail];

        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          image_description: src_image_description,
        }));
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setLoading(false);
      });
  }, [order_id]);

  function StatusButton(status) {
      if (status === 'Đang xác nhận') {
        return (
          <>
            <button name="cancelOrder" className="action-button" onClick={()=>cancelOrder(order_id)}>Hủy đơn hàng</button>
            <a href={"/confirmPriceSchedule/" + order_id}>
              <button name="confirmDetails" className="action-button">Xác nhận chi tiết</button>
            </a>
              
           
          </>
        )
      } else if (status === 'Đã hủy') {
        return null;
      } else if (status === 'Đang chờ thực hiện') {
        return (
          <Link to='/ConfirmPriceScheduleCus'>
            <button name="confirmDetails" className="action-button">Xác nhận chi tiết</button>
          </Link>
        );
      }
      else if (status === 'Đã hoàn thành') {
        return (
          <Link to='/ConfirmPriceScheduleCus'>
            <button name="payment" className="action-button">Thanh toán</button>
          </Link>
        )
      }
      else {
        return (
          <p>bảng thông tin thanh toán</p>
        )
      }

  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      {selectedOrder && (
        <div className="detail-dialog">
          <h1>Thông tin chi tiết yêu cầu số {selectedOrder.order_id}</h1>
          <div className="Detail-header-box">
            <img src={providerAvt} alt={`Hình ảnh của nhà cung cấp ${selectedOrder.provider_name}`} />
            <div className="Detail-request-box">
              <h2 className="cusName">Khách hàng: {selectedOrder.customer_name}</h2>
              <div className="Request-Detail">
                Loại sửa chữa: {selectedOrder.specific_item}
                <br />
                Địa chỉ: {selectedOrder.province} - {selectedOrder.district} - {selectedOrder.town} - {selectedOrder.street}
                <br />
              </div>
            </div>
          </div>

          <div className="Request-Description">
            <h3>Mô tả</h3>
            <h4>{selectedOrder.text_description}</h4>
          </div>
          
          <div className='Detail-Image'>
            <h3>Hình ảnh</h3>
            <div className='Detail-Image-List'>
              {selectedOrder.image_description.map((image, index) => (
                <img key={index} src={image} alt={`Hình ảnh của yêu cầu sửa chữa`} />
              ))}
            </div>
          </div>
          
          <div className="Request-Description">
            <h3>Thông tin</h3>
            <h5>Ngày yêu cầu sửa chữa: {selectedOrder.start_time}</h5>
            <h5>Nhà sửa chữa: {selectedOrder.provider_name}</h5>
            <h5>Trạng thái công việc: {selectedOrder.status}</h5>
          </div>

          {StatusButton(selectedOrder.status)}
          <ModalNoti isModalNotiOpen={isModalNotiOpen} setModalNoti={setModalNoti} message={responseMessage} setLoading={setLoading}/>
        </div>
      )}
    </>
  );
}

export default RequestDetails;
