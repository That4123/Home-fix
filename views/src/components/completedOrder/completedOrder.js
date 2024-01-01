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
        params: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCompletedOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col mx-auto">
          <div className="container border border-2 mt-3">
            <div className="fw-bold text-center fs-2 mb-3 mt-3">
              Danh sách yêu cầu Đã hoàn thành
            </div>
            <table className="table m-0">
              <tr className="row bg-dark text-white py-2">
                <td className="col-2">Thiết bị</td>
                <td className="col-4">Mô tả</td>
                <td className="col-4">Ghi chú sửa chữa</td>
                <td className="col-2">Tình trạng</td>
              </tr>
              {completedOrder.map((item, index) => (
                <tr
                  key={index}
                  className="row hover-bg-gray hover-c-white hover-mouse py-2"
                  onClick={() => {
                    window.location.href = "/CompletedOrder/" + item.order_id;
                  }}
                >
                  <td className="col-2">{item.specific_item}</td>
                  <td className="col-4">{item.text_description}</td>
                  <td className="col-4">{item.description}</td>
                  <td className="col-2">
                    {item.order_status === "total"
                      ? "Hoàn thiện"
                      : item.order_status === "partial"
                      ? "Sửa một phần"
                      : "Không thể sửa"}
                  </td>
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
