// src/pages/Testing.js
import React, { useState, useEffect } from "react";

function Testing() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/request?id=1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Data from API</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>RCost</th>
          </tr>
        </thead>
        <tbody>
          {data[0].map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.rcost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Testing;
