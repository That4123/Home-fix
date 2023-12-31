const express = require("express");
const completed_order_router = express.Router();
const completed_order_controller = require("../controllers/completed_order");
const path = require("path");

completed_order_router.get(
  "/",
  completed_order_controller.getCompletedOrderByCustomerId
);
completed_order_router.get(
  "/detail",
  completed_order_controller.getCompletedOrderByOrderId
);
completed_order_router.get("/pic", completed_order_controller.getPicByOrderId);
completed_order_router.get(
  "/priceList",
  completed_order_controller.getPriceListByOrderId
);
completed_order_router.post("/complete", completed_order_controller.complete);

module.exports = completed_order_router;
