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
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [rated, setRated] = useState(0);
  const [paid, setPaid] = useState(0);
  useEffect(() => {
    axios
      .post("/api/completedOrder/getRate", {
        params: { order_id: order_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.length !== 0) {
          setRated(1);
          var data = response.data[0];
          setComment(data.comment);
          setRate(data.rate);
        }
      })
      .catch((error) => {});
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
        setCompletedOrder((prev) => response.data[0]);
        if (response.data[0].paid == 1) setPaid(1);
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
        setPriceList(response.data);
      })
      .catch((error) => {});
  }, []);
  // rate

  const handleRate = (e) => {
    setRate(parseInt(e.target.getAttribute("value")) + 1);
  };

  // comment

  const handleInputChange = (event) => {
    setComment(event.target.value);
    adjustTextareaHeight(event.target);
  };
  const handleChangeRate = (e) => {
    axios
      .post("/api/completedOrder/changeRate", {
        params: {
          order_id: order_id,
          comment: comment,
          rate: rate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("changed");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  //submit rate
  const handleSubmitRate = (e) => {
    setRated(1);
    axios
      .post("/api/completedOrder/addRate", {
        params: {
          order_id: order_id,
          comment: comment,
          rate: rate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("rated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // delete rate
  const handleDelRate = (e) => {
    setRated(0);
    setRate(0);
    setComment("");
    axios
      .post("/api/completedOrder/delRate", {
        params: {
          order_id: order_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("rated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // payment
  const handlePayment = (e) => {
    var popupPayment = document.getElementById("popupPayment");
    popupPayment.classList.remove("d-none");
    popupPayment.classList.add("popup-5s");
    setPaid(1);
    axios
      .post("/api/completedOrder/paid", {
        params: {
          order_id: order_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("paid");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  var totalCost = priceList.reduce((prev, cur) => {
    return prev + cur.cost;
  }, 0);
  totalCost += completedOrder.wage;
  return (
    <div className="container-fluid w-100 position-relative">
      <div
        id="popupPayment"
        className="position-absolute border-gray border-3 px-3 py-3 bg-white d-none"
        style={{ top: "10px", right: "10px" }}
      >
        Bạn đã thanh toán yêu cầu "{completedOrder.order_id}"<br></br>
        Tài khoản -{totalCost.toLocaleString()} VND
      </div>
      <div className="row w-100 border-bottom mt-3">
        <div className="col-8">
          <div className="fw-bold fs-3 mb-3">Nội dung sửa chữa</div>
          <div className="container mb-3">
            <div className="fs-3 c-gray">Ghi chú sửa chữa</div>
            <div className="fs-4 ps-3">{completedOrder.description}</div>
          </div>
          <hr></hr>
          <div className="container mb-3">
            <div className="fs-3 c-gray">Tình trạng hoàn thành</div>
            <div className="fs-4 ps-3">
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
          <div className="fw-bold fs-3 mb-3">Chi tiết hóa đơn</div>
          <div className="fs-3">Linh kiện</div>
          {priceList.map((item, index) => (
            <div className="container" key={index}>
              <div className="fs-4">{item.component_name}</div>
              <div className="fs-5 c-gray ps-3">Mô tả: {item.description}</div>
              <div className="fs-5 c-gray ps-3">
                Giá tiền: {item.cost.toLocaleString("vi-VN")} VND
              </div>
            </div>
          ))}
          <hr></hr>
          <div className="fs-4">
            Tiền công: {parseInt(completedOrder.wage).toLocaleString("vi-VN")}{" "}
            VND
          </div>
          <hr></hr>
          <div className="fs-3 fw-bold">
            Tổng số tiền: {totalCost.toLocaleString("vi-VN")} VND
          </div>
          <div
            onClick={paid === 1 ? null : handlePayment}
            className={
              (paid === 0 ? "hover-mouse hover-bg-green hover-c-white" : "") +
              " fs-3 fw-bold border-green border-3 my-3 mx-5 text-center"
            }
          >
            {paid === 1 ? "Đã thanh toán" : "Thanh Toán"}
          </div>

          {/* Rate */}
          <div className="fw-bold fs-3">Đánh giá</div>
          <div className="container mb-3">
            {Array.from({ length: 5 }, (_, index) => (
              <i
                className={
                  "bi " +
                  (index < rate ? "bi-star-fill" : "bi-star") +
                  " fs-1 px-2 hover-mouse"
                }
                key={index}
                onClick={handleRate}
                value={index}
              ></i>
            ))}
          </div>
          <textarea
            className={"p-3 w-100" + (rate === 0 ? " d-none" : "")}
            value={comment}
            onChange={handleInputChange}
            placeholder="Để lại lời đánh giá..."
            style={{
              resize: "none",
              overflowY: "hidden",
            }}
          />
          <div
            className={
              "hover-mouse hover-c-white hover-bg-blue fs-3 fw-bold border-blue border-3 w-25 text-center" +
              (rate === 0 || rated === 1 ? " d-none" : "")
            }
            onClick={handleSubmitRate}
          >
            Gửi
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div
                className={
                  "hover-mouse hover-c-white hover-bg-orange fs-3 fw-bold border-orange border-3 text-center" +
                  (rated === 0 ? " d-none" : "")
                }
                onClick={handleChangeRate}
              >
                Chỉnh sửa
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className={
                  "hover-mouse hover-c-white hover-bg-red fs-3 fw-bold border-red border-3 text-center" +
                  (rated === 0 ? " d-none" : "")
                }
                onClick={handleDelRate}
              >
                Xóa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedOrder;
