import React from 'react';
import { useParams } from 'react-router-dom';
import "../styles/SendInformation.css";
import {ItemTypeForm} from "../components/ItemTypeForm";
import {SpecificItemForm} from "../components/SpecificItemForm";
import { DescriptionForm } from "../components/DescriptionForm";
import dayjs from "dayjs";
import { MeetingTimeSchedule } from "../components/MeetingTimeScheduleForm";
import { ProviderForm } from "../components/ProviderForm";

function RequestDetails() {
  const { requestId } = useParams(); // Get the request ID from the URL params

  // Sample requestData object
  const requestData = {
    ID: 125,
    status: "nhà sửa chữa Phúc An",
    itemType: "Máy giặt",
    specificItem: "Máy giặt Toshiba 15x",
    textDescription: "Không khởi động được",
    imageDescription: null,
    position: "Đống Đa, Hà Nội",
    meetingTimeSchedule: [
      dayjs('2022-04-17T15:30'),
      dayjs('2022-04-21T18:30'),
    ],
    provider: "nhà sửa chữa Phúc An",
  };

  // Extract properties from requestData object

  // Render the request details
  return (
    <div className="form-container">
        <h2 className="form-name">Phiếu yêu cầu sửa chữa số {requestData.ID}</h2>
      <form aria-readonly >
        <ItemTypeForm formData={requestData}  />
        <SpecificItemForm formData={requestData}  />
        <DescriptionForm formData={requestData} />
        <div className="image-button-container">
            <input name="imageDescription"  type="file" multiple/>
        </div>
        <div className="form-group">
          <label>Vị trí
            <input 
              type="text"
              name="position"
              value={requestData.position}
              placeholder="vị trí"
            />
          </label>
        </div>
        <MeetingTimeSchedule formData={requestData} />
        <ProviderForm formData={requestData} />
        <div className="submit-button-container">
          <button type="submit">Xác nhận</button>
        </div>
      </form>
    </div>
  );
}

export default RequestDetails;
