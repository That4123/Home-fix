// src/config/server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRouter = require("../routes/user");
const requestRouter = require("../routes/request");
const self_paymentRouter = require("../routes/testingRoute/self_payment");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", requestRouter);
app.use("/api", self_paymentRouter);

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
