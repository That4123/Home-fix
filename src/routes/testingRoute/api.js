// src/routes/api.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

router.use((req, res, next) => {
  // Middleware có thể được thêm ở đây nếu cần
  next();
});

router.get("/data", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "homefix",
    port: 3306,
  });
  try {
    const [rows, fields] = await connection.query("SELECT * FROM request");
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/myrequest", async (req, res) => {
  const requestId = req.query.id;

  if (!requestId) {
    return res.status(400).json({ error: "Missing 'id' parameter" });
  }

  try {
    // Thực hiện truy vấn CALL myrequest(<id>)
    const [rows, fields] = await connection.query(
      `CALL myrequest(${requestId})`
    );

    // Trả về dữ liệu dưới dạng JSON
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
