const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = process.env.PORT || 3000;

// Thêm dòng này để xử lý yêu cầu như là JSON
app.use(express.json());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "homefix",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");

  // Route để thực hiện truy vấn SELECT và xuất dữ liệu
  app.get("/api/user", (req, res) => {
    connection.query("SELECT * FROM user", (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error executing query");
        return;
      }
      console.log("Query results:", results);
      res.json(results);
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
