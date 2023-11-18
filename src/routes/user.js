// src/routes/user.js
const express = require("express");
const router = express.Router();
const { getConnection } = require("../config/db");

router.use(getConnection);

router.get("/user", async (req, res) => {
  const connection = req.dbConnection;

  try {
    const [rows, fields] = await connection.query("SELECT * FROM user");
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = router;
