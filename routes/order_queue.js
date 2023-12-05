const express = require('express');
const order_queue_router = express.Router();
const customer_order_queue_controller = require('../controllers/customer_order_queue');
const provider_order_queue_controller = require('../controllers/provider_order_queue');

const path = require("path");

order_queue_router.post("/customer/getAllOrder", customer_order_queue_controller.getAllOrder);
order_queue_router.post("/customer/cancelOrder", customer_order_queue_controller.cancelOrder);
order_queue_router.post("/provider/getAllOrder", provider_order_queue_controller.getAllOrder);
order_queue_router.post("/provider/cancelOrder", provider_order_queue_controller.cancelOrder);
order_queue_router.post("/provider/acceptOrder", provider_order_queue_controller.acceptOrder);


order_queue_router.post("/customer/getOrderDetails", customer_order_queue_controller.getOrderDetails);
order_queue_router.post("/provider/getOrderDetails", provider_order_queue_controller.getOrderDetails);


module.exports = order_queue_router;