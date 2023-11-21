//src/pages/FinancialMan.js
import React, { useState, useEffect } from "react";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";

const FinancialMan = (props) => {
  const subPages = ["Nạp tiền", "Rút tiền", "Biến động số dư"];

  const [subPage, setSubPage] = useState(subPages[0]);

  return (
    <div>
      <div className="row">
        <div className="col-2 border-end border-black h-100 fixed ">
          <div className="row px-4">
            {subPages.map((item, index) => (
              <div key={index}>
                <div
                  className={
                    subPage === item
                      ? "fs-4 py-3 fw-bold"
                      : "fs-6 py-3 hover-bold"
                  }
                  onClick={(e) => {
                    setSubPage((prev) => item);
                  }}
                >
                  {item}
                </div>
                <hr className="m-0 p-0"></hr>
              </div>
            ))}
          </div>
        </div>
        <div className="col-2"></div>
        <div className="col-10">
          {subPage === subPages[0] ? (
            <Deposit
              user={props.user}
              updateUserMoney={props.updateUserMoney}
            />
          ) : (
            <Withdraw />
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialMan;
