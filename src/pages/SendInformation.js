import React, { useState } from "react";
import { ItemTypeForm } from "../components/ItemTypeForm";
import { SpecificItemForm } from "../components/SpecificItemForm";
import { DescriptionForm } from "../components/DescriptionForm";
import dayjs from "dayjs";
import { MeetingTimeSchedule } from "../components/MeetingTimeScheduleForm";
import { ProviderForm } from "../components/ProviderForm";
import "../styles/SendInformation.css";
import { PositionForm } from "../components/PositionForm";
// import {ItemTypeForm,SpecificItemForm} from "../components";

const InformationForm = () => {
  const [formData, setFormData] = useState({
    itemType: "",
    specificItem: "",
    textDescription: "",
    imageDescription: null,
    position: "",
    meetingTimeSchedule: [dayjs("2022-04-17T15:30"), dayjs("2022-04-21T18:30")],
    provider: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleMeetingTimeSchedule = (name, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to your backend server here
  };

  return (
    <div className="informationForm-container">
      <h2 className="informationForm-name">Phiếu yêu cầu sửa chữa</h2>
      <form onSubmit={handleSubmit}>
        <ItemTypeForm formData={formData} handleChange={handleChange} />
        <SpecificItemForm formData={formData} handleChange={handleChange} />
        <DescriptionForm formData={formData} handleChange={handleChange} />
        <div className="image-button-container">
          <input
            name="imageDescription"
            onChange={handleChange}
            type="file"
            multiple
          />
        </div>
        <PositionForm formData={formData} handleChange={handleChange}></PositionForm>
        <MeetingTimeSchedule
          formData={formData}
          handleChange={handleMeetingTimeSchedule}
        />
        <ProviderForm formData={formData} handleChange={handleChange} />
        <div className="submit-button-container">
          <button type="submit">Xác nhận</button>
        </div>
      </form>
    </div>
  );
};

export default InformationForm;
