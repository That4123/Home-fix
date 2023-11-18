// src/config/db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "homefix",
  port: 3306,
  connectionLimit: 100,
});

const getConnection = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    req.dbConnection = connection;
    next();
  } catch (error) {
    console.error("Error establishing database connection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  pool,
  getConnection,
};
