// src/routes/user.js
const express = require("express");
const router = express.Router();
const { getConnection } = require("../config/db");

router.use(getConnection);

router.get("/user", async (req, res) => {
  const connection = req.dbConnection;

  const userId = req.query.id;

  if (!userId) {
    return res.status(400).json({ error: "Missing 'id' parameter" });
  }

  try {
    const [rows, fields] = await connection.query(
      `select * from user where id=${userId}`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

router.post("/user", async (req, res) => {
  const connection = req.dbConnection;
  try {
    const { id, money } = req.body;

    if (!id || !money) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await connection.query("UPDATE user SET money = ? WHERE Id = ?", [
      money,
      id,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
});

module.exports = router;
