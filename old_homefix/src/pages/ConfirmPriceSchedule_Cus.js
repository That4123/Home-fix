import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../styles/ConfirmPriceSchedule.css"
function Confirm (props) {
    const order_info = {cus_name: "Phạm Thị A",
                      type: "Sửa máy giặt",
                      address: "QL1B - Phường XX, Quận XX, tp. HCM",
                      status_response: 1,
                      staff_name: "Thợ sửa 1",
                      cus_phone_number: "012345678",
                      staff_phone_number: "012345679",
                      order_id: "1012"
                    };
    const role = "customer";
    const [open, setOpen] = useState(false);
    const handleClickToOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
    };
    const [time, setTime] = useState("2023-10-26T11:39");
    const [price, setPrice] = useState(0);
    const datetimeString = "2023-10-26T11:39";
    const datetime = new Date(datetimeString);

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const date = datetime.toLocaleDateString(undefined, dateOptions);
    const time_ = datetime.toLocaleTimeString(undefined, timeOptions);
    if (role === "provider") {
        return (
            <div className="background-white">
                <div style={{fontSize:"30px"}}>Gửi yêu cầu xác nhận giá sửa chữa và lịch sửa chữa</div>
                <div className="user-info-area">
                    <div className="user-info">
                        <div>Khách hàng: {order_info.cus_name}</div>
                        <div>Yêu cầu sửa: {order_info.type}</div>
                        <div>Địa chỉ: {order_info.address}</div>
                        <div>Số điện thoại: {order_info.cus_phone_number}</div>
                    </div>
                    <div className="user-info">
                        <div>Thợ sửa: {order_info.staff_name}</div>
                        <div>Mã đơn hàng: {order_info.order_id}</div>
                        <div>Số điện thoại: {order_info.staff_phone_number}</div>
                    </div>
                </div>
                <div className="communicate-area">
                    <div className="communicate-note">
                    Trước khi thực hiện các thao tác xác nhận/ gửi yêu cầu xác nhận, 
                    khách hàng và nhân viên có thể thực hiện trao đổi thông tin thông 
                    qua cuộc gọi điện thoại qua số điện thoại được cung cấp phía trên 
                    hoặc qua room chat bằng cách bấm nút “Trò chuyện”.
                    </div>
                    <a className= "communicate-btn" href="/chat">
                        <button type="submit">Trò chuyện</button>
                    </a>
                </div>
                <form className="form-confirm">
                    <div>Lịch sửa chữa:</div>
                    <div className = "form-confirm-date-time">
                        <label>Thời gian</label>
                        <input type = "datetime-local" className="input-order-info" name="Giờ"/>
                    </div>
                    <div className = "form-confirm-price">
                        <label>Giá đề xuất</label>
                        <input type = "number" className="input-order-info" name="Chi phí"/>
                        <label>VND</label>
                    </div>
                    <div className="submit-area">
                    Gửi yêu cầu xác nhận xác nhận thông tin đơn hàng
                    <button type="submit" onClick={handleClickToOpen}> Gửi</button>
                    </div>
                </form>
                <div>
                <Modal
                open={open}
                onClose={handleToClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 600,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,}} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Gửi yêu cầu xác nhận thành công!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p>Khách hàng sẽ sớm nhận được thông báo. </p>
                    <p>Chờ thông báo đồng ý từ khách hàng để dịch vụ sửa chữa hiệu lực!</p>
                    </Typography>
                </Box>
                </Modal>
                
                   
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="background-white">
                <div style={{fontSize:"30px"}}>Xác nhận giá sửa chữa và lịch sửa chữa</div>
                <div className="user-info-area">
                    <div className="user-info">
                        <div>Khách hàng: {order_info.cus_name}</div>
                        <div>Yêu cầu sửa: {order_info.type}</div>
                        <div>Địa chỉ: {order_info.address}</div>
                        <div>Số điện thoại: {order_info.cus_phone_number}</div>
                    </div>
                    <div className="user-info">
                        <div>Thợ sửa: {order_info.staff_name}</div>
                        <div>Mã đơn hàng: {order_info.order_id}</div>
                        <div>Số điện thoại: {order_info.staff_phone_number}</div>
                    </div>
                </div>
                <div className="communicate-area">
                    <div className="communicate-note">
                    Trước khi thực hiện các thao tác xác nhận/ gửi yêu cầu xác nhận, 
                    khách hàng và nhân viên có thể thực hiện trao đổi thông tin thông 
                    qua cuộc gọi điện thoại qua số điện thoại được cung cấp phía trên 
                    hoặc qua room chat bằng cách bấm nút “Trò chuyện”.
                    </div>
                    <a className= "communicate-btn" href="/chat">
                        <button type="submit">Trò chuyện</button>
                    </a>
                </div>
                <div className="form-confirm">
                    <div>Lịch sửa chữa:</div>
                    <div className = "form-confirm-date-time">
                        <label>Thời gian</label>
                        <div type = "datetime-local" className="input-order-info" name="Giờ"> {date} {time_} </div>
                    </div>
                    <div className = "form-confirm-price">
                        <label>Giá đề xuất</label>
                        <div type = "number" className="input-order-info" name="Chi phí"> {price} </div>
                        <label>VND</label>
                    </div>
                    <div className="submit-area">
                    Xác nhận thông tin đơn hàng
                    <button type="submit" onClick={handleClickToOpen}> Xác nhận</button>
                    </div>
                </div>
                <Modal
                open={open}
                onClose={handleToClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 600,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,}} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Xác nhận thành công!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Nhân viên sửa chữa sẽ sớm thực hiện đơn hàng theo lịch đã xác nhận!
                    </Typography>
                </Box>
                </Modal>
                
            </div>
            
        )
    }
}
export default Confirm;


