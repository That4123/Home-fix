// src/config/server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRouter = require("../routes/user");
const requestRouter = require("../routes/request");
const moneyRouter = require("../routes/money");
const myappliedrequestRouter = require("../routes/myappliedrequest");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api", userRouter); // Sử dụng router cho người dùng với tiền tố "/api/user"
app.use("/api", requestRouter); // Sử dụng router cho sản phẩm với tiền tố "/api/product"
app.use("/api", moneyRouter);
app.use("/api", myappliedrequestRouter);
const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
