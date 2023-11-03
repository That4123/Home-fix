import React from 'react';
import dayjs from "dayjs";
import "../styles/RequestQueue.css";
import { Link } from 'react-router-dom';

function RequestQueue() {
  const requestData1={
    ID:123,
    status:"hoàn thành",
    itemType: "",
    specificItem: "",
    textDescription:"",
    imageDescription:null,
    position: "",
    meetingTimeSchedule: [
      dayjs('2022-04-17T15:30'),
      dayjs('2022-04-21T18:30'),
    ],
    provider:"",
  }
  const requestData2={
    ID:124,
    status:"đang chờ chấp nhận",
    itemType: "",
    specificItem: "",
    textDescription:"",
    imageDescription:null,
    position: "",
    meetingTimeSchedule: [
      dayjs('2022-04-17T15:30'),
      dayjs('2022-04-21T18:30'),
    ],
    provider:"",
  }
  const requestData3={
    ID:125,
    status:"nhà sửa chữa Phúc An",
    itemType: "",
    specificItem: "",
    textDescription:"",
    imageDescription:null,
    position: "",
    meetingTimeSchedule: [
      dayjs('2022-04-17T15:30'),
      dayjs('2022-04-21T18:30'),
    ],
    provider:"",
  }
  const allRequestData= [requestData1, requestData2, requestData3];

  const allRequestDataItems = allRequestData.map((requestData) => (
    <Link key={requestData.ID} to={'/request/${requestData.ID}'} className='request-link'>
      <div key={requestData.ID} className='request-container'>
        <h5 className='request-id'>Phiếu yêu cầu số {requestData.ID}</h5>
        <h5 className='request-status ${requestData.status}'>Trạng thái: {requestData.status}</h5>
      </div>
    </Link>
  ));  
  return (
    <div className='allRequest-container'>
        <h2>DANH SÁCH YÊU CẦU SỬA CHỮA</h2>
        {allRequestDataItems}
    </div>
  )
}

export default RequestQueue;