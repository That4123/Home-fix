import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'
import providerAvt from './provider_avt.jpg';
import './providerInfo.css';
import Cookies from 'universal-cookie';
// import {ModalActionNoti} from '../RequestQueue'

const cookies = new Cookies();
const token = cookies.get('TOKEN');
function ProviderInfo()  {
    const [errorMessage, setErrorMessage] = useState(null);
    const [providerProfile, setProviderInfo] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const [isModalNotiOpen, setModalNoti] = useState(false);
    const {user_name} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [reFresh, setReFresh] = useState(0)
    const [message, setMessage] = useState()
    const [isModalAcceptOrder,setModalAcceptOrder]=useState(false);
    const [editContent, setEditContent] = useState(null)
      
    useEffect(() => {
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
          setProviderInfo(response.data.allInfo[0]);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          console.error(error.response.data.message);
        });
    }, [reFresh]);
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
export default ProviderInfo;