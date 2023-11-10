import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "../styles/SendInformation.css";
import {ItemTypeForm} from "../components/ItemTypeForm";
import {SpecificItemForm} from "../components/SpecificItemForm";
import { DescriptionForm } from "../components/DescriptionForm";
import dayjs from "dayjs";
import { MeetingTimeSchedule } from "../components/MeetingTimeScheduleForm";
import { ProviderForm } from "../components/ProviderForm";
import { PositionForm } from '../components/PositionForm';
import "../styles/RequestDetail.css"
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
    status:"đang được thực hiện",
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
  const handleCancelOrder = () => {
    const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng?");
    if (confirmCancel) {
      // Perform the cancellation logic here
      // ...
    }
  };
  function StatusButton(status){
    if (status==='đang chờ chấp nhận'){
      return(
        <button onClick={handleCancelOrder}>Hủy đơn hàng</button>
      )
    }
    else if (status==='hoàn thành'){
      return;
    }
    else return(
      <Link to='/ConfirmPriceSchedule'>
        <button>Xác nhận chi tiết</button>
      </Link>
    )
  }
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
        <div className="status-container">
        <label>Trạng thái</label>
            <h5 className='request-status'>{requestData.status}</h5>
        </div>
        <div className="detail-button-container">
          {StatusButton(requestData.status)}
          <Link to={'/RequestQueue'}>
            <button>Quay lại</button>
          </Link>
        </div>
      </form>
      
    </div>
  );
}

export default RequestDetails;
