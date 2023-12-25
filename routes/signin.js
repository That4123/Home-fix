const express = require('express');
const signin_router = express.Router();
const signin_controller = require('../controllers/signin');
const path = require("path");

signin_router.post("/", signin_controller.signin)
signin_router.post("/role", signin_controller.role)

module.exports = signin_router;