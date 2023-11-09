import React from 'react';
import { useParams } from 'react-router-dom';
import "../styles/SendInformation.css";
import {ItemTypeForm} from "../components/ItemTypeForm";
import {SpecificItemForm} from "../components/SpecificItemForm";
import { DescriptionForm } from "../components/DescriptionForm";
import dayjs from "dayjs";
import { MeetingTimeSchedule } from "../components/MeetingTimeScheduleForm";
import { ProviderForm } from "../components/ProviderForm";
import { PositionForm } from '../components/PositionForm';
function RequestDetails() {
  const { requestId } = useParams(); // Get the request ID from the URL params

  // Sample requestData object
  const requestData1={
    ID:123,
    status:"hoàn thành",
    itemType: "m",
    specificItem: "n",
    textDescription:"q",
    imageDescription:null,
    position: "q",
    meetingTimeSchedule: [
      dayjs('2022-04-17T15:30'),
      dayjs('2022-04-21T18:30'),
    ],
    provider:"w",
  }
  const requestData2={
    ID:124,
    status:"đang chờ chấp nhận",
    itemType: "a",
    specificItem: "a",
    textDescription:"a",
    imageDescription:null,
    position: "a",
    meetingTimeSchedule: [
      dayjs('2022-04-17T15:30'),
      dayjs('2022-04-21T18:30'),
    ],
    provider:"a",
  }
  const requestData3={
    ID:125,
    status:"nhà sửa chữa Phúc An",
    itemType: "b",
    specificItem: "b",
    textDescription:"b",
    imageDescription:null,
    position: "b",
    meetingTimeSchedule: [
      dayjs('2022-04-17T15:30'),
      dayjs('2022-04-21T18:30'),
    ],
    provider:"b",
  }
  const allRequestData= [requestData1, requestData2, requestData3];
  const requestData = allRequestData.find(request => request.ID === parseInt(requestId))
  // const requestData=requestData1;

  // Extract properties from requestData object

  // Render the request details
  return (
    <div className="informationForm-container">
        <h2 className="informationForm-name">Phiếu yêu cầu sửa chữa số {parseInt(requestId)}</h2>
      <form aria-readonly >
        <ItemTypeForm formData={requestData}  />
        <SpecificItemForm formData={requestData}  />
        <DescriptionForm formData={requestData} />
        <div className="image-button-container">
            <input name="imageDescription"  type="file" multiple/>
        </div>
        <PositionForm formData={requestData} ></PositionForm>
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
