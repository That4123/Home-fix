const express = require('express');
const confirm_price_schedule_router = express.Router();
const confirm_price_schedule_controller = require('../controllers/confirm_price_schedule');
const path = require("path");


confirm_price_schedule_router.post("/loadRole", confirm_price_schedule_controller.loadRole)
confirm_price_schedule_router.post("/getInfoOrder", confirm_price_schedule_controller.getInfoOrder)
confirm_price_schedule_router.post("/setCSP", confirm_price_schedule_controller.setCSP)
confirm_price_schedule_router.post("/getCSP", confirm_price_schedule_controller.getCSP)
module.exports = confirm_price_schedule_router;