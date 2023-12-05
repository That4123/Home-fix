const express = require('express');
const order_queue_router = express.Router();
const customer_order_queue_controller = require('../controllers/customer_order_queue');
const path = require("path");

order_queue_router.post("/getAllCustomerOrder", customer_order_queue_controller.getAllOrder);
order_queue_router.post("/cancelOrder", customer_order_queue_controller.cancelOrder);

order_queue_router.post("/getOrderDetails", customer_order_queue_controller.getOrderDetails);

module.exports = order_queue_router;