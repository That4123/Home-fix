// src/routes/user.js
const express = require("express");
const router = express.Router();
const { getConnection } = require("../../config/db");

router.use(getConnection);

router.get("/self_payment", async (req, res) => {
  const connection = req.dbConnection;

  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: "Missing 'id' parameter" });
  }

  try {
    const [rows, fields] = await connection.query(
      `select * from self_payment where id=${id}`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

router.post("/self_payment", async (req, res) => {
  const connection = req.dbConnection;
  try {
    const { id, money } = req.body;

    if (!id || !money) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await connection.query("INSERT INTO self_payment VALUES (?,?,?)", [
      id,
      uid,
      money,
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
