import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import providerAvt from '../provider_avt.jpg';
import './RequestDetail.css';
import ImageCusDetail from './image1.png'
const cookies = new Cookies();
const token = cookies.get('TOKEN');

function RequestDetails() {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { order_id } = useParams();

  useEffect(() => {
    axios
      .post(
        '/api/orderQueue/getOrderDetails',
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
    if (status === 'đang chờ chấp nhận') {
      return <button>Hủy đơn hàng</button>;
    } else if (status === 'hoàn thành') {
      return null;
    } else {
      return (
        <Link to='/ConfirmPriceScheduleCus'>
          <button>Xác nhận chi tiết</button>
        </Link>
      );
    }
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      {selectedOrder && (
        <div className="detail-dialog">
          <h>Thông tin chi tiết yêu cầu số {selectedOrder.order_id}</h>
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
            <h5>Ngày yêu cầu sửa chữa: {selectedOrder.start_time.toLocaleString('en-US')}</h5>
            {/* Replace with actual property for estimated_price */}
            <h5>Giá tiền dự kiến: {selectedOrder.estimated_price}</h5>
            <h5>Trạng thái công việc: {selectedOrder.status}</h5>
          </div>

          {StatusButton(selectedOrder.status)}
        </div>
      )}
    </>
  );
}

export default RequestDetails;
