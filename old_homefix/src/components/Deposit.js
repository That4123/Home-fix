import React, { useState, useEffect } from "react";

const Deposit = (props) => {
  const userCopy = { ...props.user };
  const paymentMethod = ["Ngân hàng điện tử", "Visa", "Paypal", "Momo", "ATM"];
  const selectInform = "Selecting";

  const [isExpendPayment, setIsExpandPayment] = useState(false);
  const [money, setMoney] = useState(0);
  const [currentPayment, setCurrentPayment] = useState(paymentMethod[0]);
  const [isDone, setIsDone] = useState(false);
  const [alertDisplay, setAlertDisplay] = useState("");

  const handleInputChange = (e) => {
    const onlyNumber =
      e.target.value === ""
        ? 0
        : parseInt(e.target.value.replace(/\D/g, ""), 10);
    setMoney((prev) => onlyNumber);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(parseInt(money)) && parseInt(money) !== 0) {
      userCopy.money = parseInt(money) + parseInt(userCopy.money);
      props.updateUserMoney(userCopy);
      setMoney((prev) => 0);
      setIsDone((prev) => true);
    } else {
      setAlertDisplay((prev) => "Vui lòng nhập giá trị lớn hơn 0 đồng");
    }
  };
  return (
    <div>
      {!isDone && (
        <div className="container-fluid pt-5">
          <div className="row">
            <div className="col-8 offset-2">
              <div className="fs-4">1. Chọn phương thức thanh toán:</div>
              <div
                className="container border mt-3 p-0 ms-0 border-black"
                style={{ width: "300px" }}
              >
                <div
                  className="row"
                  onClick={() => {
                    if (!isExpendPayment) {
                      setIsExpandPayment((prev) => !isExpendPayment);
                      setCurrentPayment((prev) => selectInform);
                    }
                  }}
                >
                  {currentPayment !== selectInform && (
                    <div className="col-auto">
                      <div
                        className="my-1 ms-1 border border-black"
                        style={{ height: "50px", width: "50px" }}
                      >
                        <img
                          src="/assets/paymentLogo.png"
                          style={{ height: "50px", width: "50px" }}
                          alt="logo"
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className={
                      currentPayment !== selectInform
                        ? "col my-1"
                        : "col my-1 ms-3"
                    }
                    style={{ lineHeight: "50px" }}
                  >
                    {currentPayment}
                  </div>
                </div>
                {isExpendPayment &&
                  paymentMethod.map((item, index) => (
                    <div key={index}>
                      <hr className="p-0 m-0"></hr>
                      <div
                        className="row"
                        onClick={() => {
                          setIsExpandPayment((prev) => !prev);
                          setCurrentPayment((prev) => item);
                        }}
                      >
                        <div className="col-auto">
                          <div
                            className="my-1 ms-1 border border-black"
                            style={{ height: "50px", width: "50px" }}
                          >
                            <img
                              src="/assets/paymentLogo.png"
                              style={{ height: "50px", width: "50px" }}
                              alt="logo"
                            />
                          </div>
                        </div>
                        <div
                          className="col my-1"
                          style={{ lineHeight: "50px" }}
                        >
                          {item}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <hr></hr>
              {currentPayment !== selectInform && (
                <div>
                  <div className="fs-4">2. Nhập số tiền cần nạp:</div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-auto ps-0">
                        <input
                          type="text"
                          className="border-black px-2 rounded-0 py-2 h-50px lh-50px border-1"
                          value={money.toLocaleString()}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-auto w-75px h-50px lh-50px ps-0">
                        {" "}
                        VND
                      </div>
                      <div className="row">
                        <div
                          className="bg-white px-1 border-1 col-auto text-center border border-black mt-2 w-150px py-1"
                          onClick={handleSubmit}
                        >
                          Thanh toán
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="fs-6 ps-0 mt-1 c-red">{alertDisplay}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isDone && (
        <div>
          <div className="row">
            <div className="col-8 offset-2">
              <div className="row">
                <div className="fs-4">Thanh toán thành công</div>
              </div>
              <hr></hr>
              <div className="row">
                <div className="col-4">Mã giao dịch:</div>
                <div className="col">0001</div>
              </div>
              <div className="row">
                <div className="col-4">Số tiền:</div>
                <div className="col">{money} VND</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
