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

function CompletedOrder() {
  const [completedOrder, setCompletedOrder] = useState([]);
  const [pic, setPic] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const token = cookies.get("TOKEN");
  const { order_id } = useParams();

  useEffect(() => {
    axios
      .get(
        "/api/completedOrder/detail",

        {
          params: { order_id: order_id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCompletedOrder(response.data[0]);
      })
      .catch((error) => {});
    axios
      .get("/api/completedOrder/pic", {
        params: { order_id: order_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPic(response.data);
      })
      .catch((error) => {});
    axios
      .get("/api/completedOrder/priceList", {
        params: { order_id: order_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPriceList(response.data);
      })
      .catch((error) => {});
  }, []);

  var totalCost = priceList.reduce((prev, cur) => {
    return prev + cur.cost;
  }, 0);
  totalCost += completedOrder.wage;
  console.log(totalCost);
  return (
    <div className="container-fluid w-100">
      <div className="row w-100 border-bottom mt-3">
        <div className="col-8">
          <div className="fw-bold fs-3 mb-3 text-center">Nội dung sửa chữa</div>
          <div className="container mb-3">
            <div className="fs-3 c-gray">Mô tả</div>
            <div className="fs-4 fst-italic">{completedOrder.description}</div>
          </div>
          <hr></hr>
          <div className="container mb-3">
            <div className="fs-3 c-gray">Tình trạng hoàn thành</div>
            <div className="fs-4 fst-italic">
              {completedOrder.order_status === "total"
                ? "Toàn bộ"
                : completedOrder.order_status === "partial"
                ? "Một phần"
                : "Không sửa được"}
            </div>
          </div>
          <hr></hr>
          <div className="container mb-3">
            <div className="fs-3 c-gray">Hình ảnh</div>
            <div className="row">
              {pic.map((item, index) => (
                <div className="col-lg-6 mb-3" key={index}>
                  <img
                    src={item.image}
                    className="object-fit-cover w-100"
                  ></img>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-4 border-start border-3">
          <div className="fw-bold fs-3 mb-3 text-center">Chi tiết hóa đơn</div>
          <div className="fs-3">Linh kiện</div>
          {priceList.map((item, index) => (
            <div className="container" key={index}>
              <div className="fs-4">{item.component_name}</div>
              <div className="fs-5 c-gray ps-3">Mô tả: {item.description}</div>
              <div className="fs-5 c-gray ps-3">
                Giá tiền: {item.cost.toLocaleString("vi-VN")} đồng
              </div>
            </div>
          ))}
          <hr></hr>
          <div className="fs-4">
            Tiền công: {parseInt(completedOrder.wage).toLocaleString("vi-VN")}{" "}
            đồng
          </div>
          <hr></hr>
          <div className="fs-3 fw-bold">
            Tổng số tiền: {totalCost.toLocaleString("vi-VN")} đồng
          </div>
          <div
            onClick={() => {
              alert("Chuyển hướng đến trang web thanh toán");
            }}
            className="hover-mouse hover-bg-green fs-3 fw-bold border-green border-3 my-3 mx-5 hover-c-white text-center"
          >
            Thanh Toán
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedOrder;
