import React, { useState, useEffect } from "react";

export const AccountLite = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col-11">
          <div className="text-white pt-4">Name: </div>
          <div className="text-white">
            Money: {props.user.money.toLocaleString()} VND
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
};
