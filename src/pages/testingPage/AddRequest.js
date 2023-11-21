// src/pages/AddRequest.js
import React, { useState } from "react";

const AddRequest = () => {
  const [id, setId] = useState("");
  const [rcost, setRcost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem id và rcost có giá trị không
    if (!id || !rcost) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, rcost }),
      });

      if (response.ok) {
        // Nếu request thành công, bạn có thể xử lý dữ liệu hoặc hiển thị thông báo thành công
        alert("Request added successfully!");
      } else {
        // Nếu có lỗi từ server, bạn có thể hiển thị thông báo lỗi
        alert("Failed to add request. Please try again.");
      }
    } catch (error) {
      console.error("Error adding request:", error);
      alert("Internal Server Error. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Add Request</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label>
          RCost:
          <input
            type="text"
            value={rcost}
            onChange={(e) => setRcost(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddRequest;
