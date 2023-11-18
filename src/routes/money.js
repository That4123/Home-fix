// src/routes/user.js
const express = require("express");
const router = express.Router();
const { getConnection } = require("../config/db");

router.use(getConnection);

router.get("/money", async (req, res) => {
  const connection = req.dbConnection;

  const requestId = req.query.id;

  if (!requestId) {
    return res.status(400).json({ error: "Missing 'id' parameter" });
  }

  try {
    const [rows, fields] = await connection.query(
      `CALL getmoney(${requestId})`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = router;
