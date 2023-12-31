import React, { useState,useEffect   } from "react";

import Modal from 'react-modal';
import "./SendInformation.css";
import { ProviderForm } from "./ProviderForm";

import {PositionForm}  from './CityDropdown';
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('TOKEN');

const ModalNoti = ({isModalOpen, closeModal, errorMessage}) => {
  const modalContent = () => {
    if (errorMessage) {
      console.log(errorMessage);
      return <p>{errorMessage}</p>;
    }
    return (
      <>
        <div className='upload-file-ctn'>
          <label className='upload-file-lb'>{errorMessage}</label>
        </div>
      </>
    );
  };
  
  return (
    <Modal 
      className={"popup-confirm-config"} 
      overlayClassName={"cfm-config-ctn"}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <h2>Thông báo</h2>
      {modalContent()}
      <div className='btn-ctn-cfm-cfg'>
        <button onClick={() => closeModal()} className="cfm-config-btn">Đóng</button>
      </div>
    </Modal>
  );
};
const InformationForm = () => {
  const [formData, setFormData] = useState({
    itemType: "",
    specificItem: "",
    textDescription: "",
    imageDescription: "",
    position: [],
    meetingTimeSchedule: "",
    provider: "",
    providerId: "",
  });
  const [errorMessage,setErrorMessage]=useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    const formattedTime = value.replace("T", " ").toString().substring(0, 16);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedTime,
    }));

  };
  const handleLocationChange = ({ province, district, town, street }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      position: {
        province,
        district,
        town,
        street,
      },
    }));
    console.log(formData.position);
  };
  const handleProviderChange = (provider) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      provider: provider.target.value.name,
      providerId: provider.target.value.provider_id,
    }));
  };
  const [modalSubmit,setModalSubmit]=useState(false);
  const closeModalSubmit=()=>{
    setModalSubmit(false);
  }
  const openModelSubmit=()=>{
    setModalSubmit(true);
  }
  const handleSubmit = (e) => {
    console.log("send information: handle submit");
    e.preventDefault();
    axios.post("/api/sendInformation/sendInformation", {
        service_order:formData,
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("send information, handle submit success");
        setErrorMessage(response.data.message);
        openModelSubmit();
      })
      .catch((error) => {
        console.log("send information, handle submit fail");
        setErrorMessage(error.response.data.message);
        openModelSubmit();
      })
  };
  const itemTypes = ['Nội thất', 'Đồ gia dụng', 'Dụng cụ nhà bếp', 'Vật dụng công nghệ'];
  return (
    <div className="informationForm-container">
        <h2 className="informationForm-name">Phiếu yêu cầu sửa chữa</h2>
        <form> 
            <div className="informationForm-group">
                <label>Loại vật dụng </label>
                <select  name="itemType" value={formData.itemType} onChange={handleChange}>
                    <option value=''>Chọn loại vật dụng</option>
                    {itemTypes.map((itemType) => (
                        <option key={itemType} value={itemType}>{itemType}</option>
                    ))}
                </select>
            </div>
            <div className="informationForm-group">
                <label>Tên vật dụng</label>
                <input
                    type="text"
                    name="specificItem"
                    value={formData.specificItem}
                    onChange={handleChange}
                    placeholder="Tên vật dụng"
                    />
            </div>
            <div className="informationForm-group">
                <label>Mô tả</label>
                <textarea 
                name="textDescription"
                rows="4"
                value={formData.textDescription}
                onChange={handleChange}
                placeholder="Mô tả"
                />
            </div>
            <div className="image-button-container">
            <div className="input-group" style={
                {
                    position: 'relative',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    width: '100%',
                    justifyContent: 'flex-end',
                }
            }>
                    <label className="input-group-text" htmlFor="formFileMultiple">
                    Chọn hình ảnh
                    </label>
                    <input
                    name="imageDescription"
                    type="file"
                    className="Imageform-control"
                    id="formFileMultiple"
                    multiple
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    />
                    <span className="input-group-text" style = {{minWidth: '300px', backgroundColor: 'white'}}>{formData.imageDescription}</span>
                </div>
            </div>
            <div className="informationForm-group">
                <label>Vị trí</label>
                <PositionForm onLocationChange={handleLocationChange} />
                
            </div>
            <div className="informationForm-group">
                <label> Thời gian </label>
                <input
                    type="datetime-local"
                    id="meetingTime"
                    name="meetingTimeSchedule"
                    value={formData.meetingTimeSchedule.toString().substring(0, 16)||''}
                    onChange={handleDateTimeChange}
                />
            </div>
            <ProviderForm formData={formData} onProviderChange={handleProviderChange} />
            <div className="submit-button-container">
              <button type="submit" onClick={handleSubmit}>Xác nhận</button>
            </div>
        </form>
        <ModalNoti isModalOpen={modalSubmit} closeModal={closeModalSubmit} errorMessage={errorMessage} />
    </div>
  );
};

export default InformationForm;
