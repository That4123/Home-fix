var authentication_model = require("../model/DAO/authentication");
var provider_model=require("../model/DAO/provider");
const authorization_model = require('../model/DAO/authorization');
var service_order_model=require("../model/DAO/service_order");
module.exports = {
    getAllOrder: [authorization_model.loadCurMember,function (req, res) {
        provider_model.getAllOrder(req,res);
    }],
    cancelOrder:function (req, res) {
        service_order_model.cancelOrder(req,res);
    },
    acceptOrder:function (req, res) {
        service_order_model.acceptOrder(req,res);
    },
    getOrderDetails: [authorization_model.loadCurMember,function (req, res) {
        service_order_model.getOrderDetails(req,res);
    }],
}
