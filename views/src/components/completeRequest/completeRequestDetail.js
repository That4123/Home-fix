import React, { useState, useEffect, useRef} from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./ConfirmPriceSchedule.css"
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import Cookies from "universal-cookie";
import {useParams} from 'react-router-dom';

const cookies = new Cookies();

  
function CompleteRequestDetail () {
    const [info_order, setInfoOrder] = useState([])
    const id = useParams();
    const [role, setRole] = useState();
    const [isReturn, setIsReturn] = useState(false);
    const user_name = cookies.get("USER_NAME");
    const [signIn, setSignIn] = useState(true);

    const [evidenceImages, setEvidenceImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [jobDescription, setJobDescription] = useState("");
    const [unrepairableParts, setUnrepairableParts] = useState("");
    const [componentCosts, setComponentCosts] = useState([]);

    const handleFormSubmit = () => {
        // Prepare the form data to be sent to the server
        const formData = {
          evidenceImages,
          videos,
          jobDescription,
          unrepairableParts,
          componentCosts,
        };
    
        // Send the form data to the server (adjust the endpoint as needed)
        axios.post("/api/confirmPriceSchedule/submitForm", { id, formData })
          .then((response) => {
            // Handle the response as needed
            console.log("Form submitted successfully:", response.data);
            // You may also close the modal or perform other actions
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            // Handle the error
          });
      };

    useEffect(() => {
        const token = cookies.get("TOKEN");
        console.log(user_name)
        if (!token) {
          setSignIn(false);
        }
        else {
          axios.post("/api/signin/role", { user_name })
          .then((response) => {
            setRole(response.data.role);
            console.log(123);
            console.log("ID is", id)
            console.log(response.data.role);
          }).catch((error) => {
            console.log(error);
          })
        }
      }, [])


    useEffect(()=> {    
        axios.post("/api/confirmPriceSchedule/getCSP", {order_id: id}).
    then((response) => {
       if (response.data.length !== 0) {
            setDateTime(response.data[0].time_schedule);
            setPrice(response.data[0].price);
            handleTime(response.data[0].time_schedule);
       }
    }).catch((error) => { });}, [])


    useEffect(()=> {    
        axios.post("/api/confirmPriceSchedule/getInfoOrder", {order_id: id}).
    then((response) => {
       setInfoOrder(response.data);
       console.log(response.data)
       setIsReturn(true);    
    }).catch((error) => { });}, [])

    
    const [open, setOpen] = useState(false);
    const [datetime, setDateTime] = useState("");
    const [price, setPrice] = useState(0);
    const handleClickToOpen = (e) => {
        e.preventDefault()
        setOpen(true);
        axios.post("/api/confirmPriceSchedule/setCSP", {id, datetime, price}).
        then((response) => {
        }).catch((error) => { });
    };
    const handleClickToOpenCustomer = (e) => {
        setOpen(true);
    }
    const handleChange = (e) => {
        console.log(e.target.value)
    }
    const handleToClose = () => {
        setOpen(false);
    };
    const [time, setTime] = useState("");
    const [day, setDay] = useState("")
    const handleTime = (date_time) => {
        const datetime = new Date(date_time);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

        const date = datetime.toLocaleDateString(undefined, dateOptions);
        const time_ = datetime.toLocaleTimeString(undefined, timeOptions);
        setTime(time_)
        setDay(date)
    }
    const handleUpdate = () => {
        axios.post("/api/confirmPriceSchedule/updateAfterCSP", {id}).
    then((response) => {
    }).catch((error) => { });
    }
    
    const handleCostNameChange = (index, newName) => {
        const updatedCosts = [...componentCosts];
        updatedCosts[index].name = newName;
        setComponentCosts(updatedCosts);
      };
    
      const handleCostValueChange = (index, newValue) => {
        const updatedCosts = [...componentCosts];
        updatedCosts[index].value = newValue;
        setComponentCosts(updatedCosts);
      };
    
    if (isReturn && role === "provider") {
        
        return (
            <div className="background-white">
                <h3 className="mt-4">Báo cáo xác nhận hoàn thành</h3>
                <div className="user-info-area">
                <div className="user-info">
                        <div>Khách hàng: {info_order[0].customer_name}</div>
                        <div>Yêu cầu sửa: {info_order[0].item_type}</div>
                        <div>Địa chỉ: {info_order[0].street} {info_order[0].town} {info_order[0].district} {info_order[0].province}</div>
                        <div>Số điện thoại: {info_order[0].user_phone_number}</div>
                    </div>
                    <div className="user-info">
                        <div>Thợ sửa: {info_order[0].provider_name}</div>
                        <div>Mã yêu cầu: {info_order[0].order_id}</div>
                        <div>Số điện thoại: {info_order[0].provider_phone_number}</div>
                    </div>
                </div>
                
                <form>
                    <table className="table table-bordered mt-3">
                    <tbody>
                        <tr>
                        <td><label htmlFor="evidenceImages">Evidence Images:</label></td>
                        <td>
                            <input
                            type="file"
                            id="evidenceImages"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                const files = e.target.files;
                                setEvidenceImages(Array.from(files));
                            }}
                            />
                        </td>
                        </tr>

                        {/* Input field for videos */}
                        <tr>
                        <td><label htmlFor="videos">Videos:</label></td>
                        <td>
                            <input
                            type="file"
                            id="videos"
                            multiple
                            accept="video/*"
                            onChange={(e) => {
                                const files = e.target.files;
                                setVideos(Array.from(files));
                            }}
                            />
                        </td>
                        </tr>

                        {/* Input field for job description */}
                        <tr>
                        <td><label htmlFor="jobDescription">Job Description:</label></td>
                        <td>
                            <input
                            id="jobDescription"
                            className="form-control"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </td>
                        </tr>

                        {/* Input field for unrepairable parts */}
                        <tr>
                        <td><label htmlFor="unrepairableParts">Unrepairable Parts:</label></td>
                        <td>
                            <input
                            id="unrepairableParts"
                            className="form-control"
                            value={unrepairableParts}
                            onChange={(e) => setUnrepairableParts(e.target.value)}
                            />
                        </td>
                        </tr>

                        {/* Input field for component costs */}
                        <tr>
                            <td><label htmlFor="componentCosts">Component Costs:</label></td>
                            <td>
                                <ul className="no-bullets"> {/* Add a class for styling */}
                                {componentCosts.map((cost, index) => (
                                    <li key={index}>
                                    <div className="input-group mb-3">
                                        <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={cost.name}
                                        onChange={(e) => handleCostNameChange(index, e.target.value)}
                                        />
                                        <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Cost"
                                        value={cost.value}
                                        onChange={(e) => handleCostValueChange(index, e.target.value)}
                                        />
                                        <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            const updatedCosts = [...componentCosts];
                                            updatedCosts.splice(index, 1);
                                            setComponentCosts(updatedCosts);
                                        }}
                                        >
                                        Remove
                                        </button>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                                <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setComponentCosts([...componentCosts, { name: "", value: "" }])}
                                >
                                Add Component Cost
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    </table>

                    <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>
                    Submit Form
                    </button>
                </form>
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
                    Nhân viên sửa chữa sẽ sớm thực hiện yêu cầu theo lịch đã xác nhận!
                    </Typography>
                </Box>
                </Modal>
                
            </div>
            
        )
    }
    else return (<></>)
}
export default CompleteRequestDetail;

