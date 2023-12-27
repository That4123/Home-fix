import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../../styles/style.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const cookies = new Cookies();

function CustomerComfirmCompletion() {
  const [completedOrder, setCompletedOrder] = useState([]);
  const token = cookies.get("TOKEN");

  useEffect(() => {
    axios
      .get("/api/completedOrder", {
        params: { customer_id: 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCompletedOrder(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col mx-auto">
          <div className="container border border-2 mt-3">
            <div className="fw-bold text-center fs-2 mb-3 mt-3">
              Danh sách yêu cầu đã hoàn thành
            </div>
            <table className="table m-0">
              <tr className="row bg-dark text-white py-2">
                <td className="col-3">Thiết bị</td>
                <td className="col-6">Mô tả</td>
                <td className="col-3">Người sửa chữa</td>
              </tr>
              {completedOrder.map((item, index) => (
                <tr
                  key={index}
                  className="row hover-bg-gray hover-c-white hover-mouse py-2"
                  onClick={() => {
                    window.location.href = "/CompletedOrder/" + item.order_id;
                  }}
                >
                  <td className="col-3">{item.item}</td>
                  <td className="col-6">{item.description}</td>
                  <td className="col-3">{item.name}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerComfirmCompletion;
