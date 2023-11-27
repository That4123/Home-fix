// src/routes/user.js
const express = require("express");
const router = express.Router();
const { getConnection } = require("../config/db");

router.use(getConnection);

router.get("/request", async (req, res) => {
  const connection = req.dbConnection;

  const requestId = req.query.id;

  if (!requestId) {
    return res.status(400).json({ error: "Missing 'id' parameter" });
  }

  try {
    const [rows, fields] = await connection.query(
      `CALL newrequest(${requestId})`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

router.post("/request", async (req, res) => {
  const connection = req.dbConnection;

  try {
    const { id, rcost } = req.body;

    if (!id || !rcost) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await connection.query("INSERT INTO request (id, rcost) VALUES (?, ?)", [
      id,
      rcost,
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
