var authentication_model = require("../model/DAO/authentication");
var customer_model=require("../model/DAO/customer");
var service_order_model=require("../model/DAO/service_order")
module.exports = {
    getAllOrder: function (req, res) {
        customer_model.getAllOrder(req,res);
    },
    cancelOrder:function (req, res) {
        service_order_model.cancelOrder(req,res);
    },
}
