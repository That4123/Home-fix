import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'
import providerAvt from './provider_avt.jpg';
import providerBanner from './provider_banner.jpg'
import './providerInfo.css';
import Cookies from 'universal-cookie';
// import {ModalActionNoti} from '../RequestQueue'

const cookies = new Cookies();
const token = cookies.get('TOKEN');
function ProviderInfo()  {
    const [signIn, setSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [providerProfile, setProviderInfo] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const [isModalNotiOpen, setModalNoti] = useState(false);
    const user_name = cookies.get("USER_NAME");
    const [isEditing, setIsEditing] = useState(false);
    const [reFresh, setReFresh] = useState(0)
    const [message, setMessage] = useState()
    const [isModalAcceptOrder,setModalAcceptOrder]=useState(false);
    const [editContent, setEditContent] = useState(null)
    const [role, setRole] = useState();
    const [feedBack, setFeedBack] = useState();
    const [providerId, setProviderId] = useState();
      
  
    useEffect(() => {
      // const token = cookies.get("TOKEN");
      if (!token) {
        setSignIn(false);
      }
      else {
        axios.post("/api/signin/role", { user_name })
        .then((response) => {
          setRole(response.data.role);
          // setRole("customer");
          console.log(user_name);
          console.log(response.data.role);
        }).catch((error) => {
          console.log(error);
        })
      }
    }, [])



    useEffect(() => {
      if(role === "provider"){
      axios
        .post('/api/providerInfo', {
          // customerId:3,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setErrorMessage('');
          console.log(response.data)
          setProviderInfo(response.data.allInfo[0]);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          console.error(error.response.data.message);
        });}
        else if (role === "customer"){
          //const pro_id = useParams();
          let pro_id = 2
          setProviderId(pro_id);
      axios
        .post ('/api/providerInfo/cusview', {provider_id: pro_id})
        .then((response) => {
          setErrorMessage('');
          console.log(response.data)
          setProviderInfo(response.data.allInfo[0]);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          console.error(error.response.data.message);
        });
        }
        else{

        }
    }, [role,reFresh]);

    useEffect(() => {
      axios
        .post ('/api/providerInfo/feedback', {provider_id: providerId})
        .then((response) => {
          setErrorMessage('');
          setFeedBack(response.data.allFeedBack);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          console.error(error.response.data.message);
        });
    }, [providerId])
    
    const handleEditClick = (provider) => {
      let editInfo = {
        name: provider.name,
        street: provider.street,
        town: provider.town,
        district: provider.district,
        province: provider.province,
        phone_number: provider.phone_number,
        provider_id: provider.provider_id
    };
      setReFresh(prevKey=>prevKey+1)
      setEditContent(editInfo);
      setIsEditing(true);

    };
    const handleSaveClick = (Info) => {
      console.log(Info);
      axios.post('/api/providerInfo/edit', Info)
      .then(response => { console.log(response.data.message)
        setReFresh(prevKey => prevKey + 1);
        console.log('Đã lưu thông tin chỉnh sửa');
        setMessage(null)
        // Kết thúc chế độ chỉnh sửa
      setIsEditing(false);
      })
      .catch(error => {
        console.error('Error fetching info:', error); 
      setMessage(error.response.data.message)

    });
  };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditContent((prevInfo) => ({ ...prevInfo, [name]: value }));
    };
  
    if (role === "provider") {
      
    return (
      <div>
        {providerProfile && (
        <div className='view-information'>
            <h1>Mã số nhà cung cấp: {providerProfile.provider_id}</h1>
            <img src={providerAvt} alt='Provider Avatar'/>
            <div className='provider-information'>
              <div className='Column'>
              <div>
                <label className='special'>Độ uy tín nhà cung cấp: </label> <span className='special'>{providerProfile.rate}</span>
              </div>
              <div>
                <label>Tên nhà cung cấp: </label> {isEditing ? (
                <input className='form-control' type="text" name="name" value={editContent.name} onChange={handleInputChange} />
                ) : (
                  <span>{providerProfile.name}</span>
                )}
              </div>
              <div>
                <label>Đường:</label> {isEditing ? (
                <input className='form-control' type="text" name="street" value={editContent.street} onChange={handleInputChange} />
                ) : (
                  <span>{providerProfile.street}</span>
                )}
              </div>

              <div>
                <label>Phường/Xã:</label> {isEditing ? (
                  <input className='form-control' type="text" name="town" value={editContent.town} onChange={handleInputChange} />
                ) : (
                  <span>{providerProfile.town}</span>
                )}
              </div>
              </div>
              <div className='Column'>
              <div>
                <label>Quận/Huyện:</label> {isEditing ? (
                  <input className='form-control' type="text" name="district" value={editContent.district} onChange={handleInputChange} />
                ) : (
                  <span>{providerProfile.district}</span>
                )}
              </div>
              
              <div>
                <label>Tỉnh/Thành phố:</label> {isEditing ? (
                  <input className='form-control' type="text" name="province"  value={editContent.province} onChange={handleInputChange} />
                ) : (
                  <span>{providerProfile.province}</span>
                )}
              </div>
              <div>
              <label>Số điện thoại:</label> {isEditing ? (
                  <input className='form-control' type="text" name="phone_number"  value={editContent.phone_number} onChange={handleInputChange} />
                ) : (
                  <span>{providerProfile.phone_number}</span>
                )}
              </div>
              <div>
              <label className='special'>Số dư hiện tại:</label> <span className='special' >{providerProfile.balance}</span>
              </div>
              
              <p>{message ? message: ''}</p>
              
              {isEditing ? (
                  <button className= "btn btn-light p-2 text-lg w-25 " onClick={() => handleSaveClick(editContent)}>Lưu</button>
                ) : (
                  <button className= "btn btn-light p-2 text-lg w-25" onClick={() => handleEditClick(providerProfile)}>Chỉnh sửa</button>
                )}
                </div>
              
            </div>
          </div>
        )}
      </div>
    )
  }
  else if (role === "customer") {
  return (
    <div>
      {providerProfile&&feedBack&&(
        <div className='ProfileCusView'>
      <p>Thông tin nhà cung cấp dịch vụ</p>
      
      <div className=' Column1'>
      <img className ="img1 "src={providerAvt} alt='Provider Avatar'/>

      
      <div className='Profile-block'>
        <p >Dịch vụ sửa chữa: {providerProfile.name}</p>
        <ul>
          <li>Địa chỉ: {providerProfile.street}, {providerProfile.town}, {providerProfile.district}, {providerProfile.province}</li>
          <li>SĐT liên hệ: {providerProfile.phone_number}</li>
          <li>Hoạt động: 24/7. Tất cả các ngày trong tuần và ngày lễ</li>
          <li>Loại sửa chữa: { providerProfile.repair_types.join(", ")}</li>
        </ul>
      </div>
      <div className='RateCircle'>
        <p>{providerProfile.rate}</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" className="star">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <img src={providerBanner} alt='Provider Banner'/>
      </div>

      <div className='Column2'>
          <button className= "btn btn-light p-2 text-lg w-25" >Xác nhận chọn</button>
          <button className= "btn btn-light p-2 text-lg w-25" >Nhận thông báo</button>
          <button className= "btn btn-light p-2 text-lg w-25">Đánh giá nhà cung cấp</button>
          <button className= "btn btn-light p-2 text-lg w-25">Xem địa chỉ trên google map</button>
      
      <div className='FeedBackBlock'> 
        <p id='feedbacktitle'>Đánh giá hàng đầu</p>
        <ul className='feedList'>
        {feedBack.map((feedback, index) => (
          <li key={index}>
            <p>Đánh giá số: {feedback.feedback_id}</p>
            <p>Đơn dịch vụ mã số: {feedback.order_id}</p>
            <p>Đánh giá: {feedback.rate}/5 </p>
            <p>Nội dung: {feedback.comment}</p>
            </li>
        ))}
        </ul>
      </div>
      
      </div>
      

       </div>

        
      )}


    </div>
  )
  }
  else return (<></>)
}
export default ProviderInfo;