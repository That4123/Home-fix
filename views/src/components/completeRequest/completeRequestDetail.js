import React, { useState, useEffect, useRef} from "react";
import "./completeRequestDetail.css"
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
    const [jobDescription, setJobDescription] = useState("");
    const [status, setStatus] = useState("");
    const [componentCosts, setComponentCosts] = useState([]);
    const [wage, setWage] = useState("");

    const navigate = useNavigate();

    const handleFormSubmit = () => {
        if (!jobDescription || !status || !wage || componentCosts.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        const formData = {
            evidenceImages,
            jobDescription,
            status,
            componentCosts,
            wage,
        };

        axios.post("/api/completedOrder/complete", { order_id: id, formData })
        .then((response) => {
            console.log("Form submitted successfully:", response.data);
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
        });
        navigate(`../../ProviderOrderQueue/details/${id.order_id}`);
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
          }).catch((error) => {
            console.log(error);
          })
        }
      }, [])

    useEffect(()=> {    
        axios.post("/api/confirmPriceSchedule/getInfoOrder", {order_id: id})
        .then((response) => {
            setInfoOrder(response.data);
            setIsReturn(true);    
        }).catch((error) => { });
    }, [])
    
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

    const handleCostDescriptionChange = (index, newDescription) => {
        const updatedCosts = [...componentCosts];
        updatedCosts[index].description = newDescription;
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
                        <td><label htmlFor="evidenceImages">Hình ảnh:</label></td>
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

                        <tr>
                            <td><label htmlFor="jobDescription">Mô tả công việc:</label></td>
                            <td>
                                <input
                                id="jobDescription"
                                className="form-control"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Nhập mô tả công việc"
                                />
                            </td>
                        </tr>
                            <td><label htmlFor="jobDescription">Tình trạng công việc:</label></td>
                            <td>
                                <select 
                                className="form-select" 
                                aria-label="Default select example" 
                                onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option selected>Chọn tình trạng</option>
                                    <option value="total">Toàn bộ</option>
                                    <option value="partial">Một phần</option>
                                    <option value="not">Không sửa được</option>
                                </select>
                            </td>
                        <tr>

                        </tr>

                        {/* Input field for component costs */}
                        <tr>
                            <td><label htmlFor="componentCosts">Chi phí linh kiện:</label></td>
                            <td>
                                <ul className="no-bullets"> {/* Add a class for styling */}
                                {componentCosts.map((cost, index) => (
                                    <li key={index}>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tên linh kiện"
                                            value={cost.name}
                                            onChange={(e) => handleCostNameChange(index, e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Chi phí"
                                            value={cost.value}
                                            onChange={(e) => handleCostValueChange(index, e.target.value)}
                                        />

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mô tả"
                                            value={cost.description}
                                            onChange={(e) => handleCostDescriptionChange(index, e.target.value)}
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
                                        Xóa
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
                                Thêm linh kiện
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="wage">Tiền công:</label></td>
                            <td>
                                <input
                                type="text"
                                id="wage"
                                className="form-control"
                                placeholder="Nhập tiền công"
                                onChange={(e) => setWage(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                    </table>

                    <button type="button" className="btn btn-primary mt-4" onClick={handleFormSubmit}>
                    Xác nhận hoàn thành
                    </button>
                </form>
            </div>
            
        )
    }
    else return (<></>)
}
export default CompleteRequestDetail;

