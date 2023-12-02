const express = require('express');
const send_information_router = express.Router();
const send_information_controller = require('../controllers/send_information');
const path = require("path");

send_information_router.post("/sendInformation", send_information_controller.sendInformation);

module.exports = send_information_router;