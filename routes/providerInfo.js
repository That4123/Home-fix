const express = require('express');
const providerInfoRouter = express.Router();
const providerInfoController = require('../controllers/providerInfo');

const path = require("path");

providerInfoRouter.post("/",providerInfoController.getAllInfo);
providerInfoRouter.post("/edit",providerInfoController.editInfo);

module.exports = providerInfoRouter; 