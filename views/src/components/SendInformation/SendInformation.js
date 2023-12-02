import React, { useState,useEffect   } from "react";


import "./SendInformation.css";
import { ProviderForm } from "./ProviderForm";

import {PositionForm}  from './CityDropdown';

const InformationForm = () => {
  const [formData, setFormData] = useState({
    itemType: "",
    specificItem: "",
    textDescription: "",
    imageDescription: "",
    position: [],
    meetingTimeSchedule: "",
    provider: "nhà sửa chữa An Sơn",
  });

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
    console.log(formattedTime);
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
  const handleSubmit = (e) => {
    e.preventDefault();

  };
  const itemTypes = ['Máy giặt', 'Điều hòa', 'Đường ống nước', 'Đồ bếp', '1', '2'];
  return (
    <div className="informationForm-container">
        <h2 className="informationForm-name">Phiếu yêu cầu sửa chữa</h2>
        <form onSubmit={handleSubmit}> 
            <div className="informationForm-group">
                <label>Loại vật dụng </label>
                <select  name="itemType" value={formData.itemType} onChange={handleChange}>
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
            <ProviderForm formData={formData} handleChange={handleChange} />
            <div className="submit-button-container">
            <button type="submit">Xác nhận</button>
            </div>
        </form>
    </div>
  );
};

export default InformationForm;
