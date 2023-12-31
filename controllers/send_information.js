const authorization_model = require('../model/DAO/authorization');
var service_order_model=require("../model/DAO/service_order")
module.exports = {
    sendInformation:[authorization_model.loadCurMember, function (req, res) {
        console.log("controller sendinformation");
        if(service_order_model.checkNoEmpty(req.body.service_order)){
            service_order_model.makeOrder(req,res);
        }
        else{
            console.log(123);
            res.status(500).json({message:'Vui lòng không bỏ trống trường nào'});
        }
    }],
    getProviders:[function (req, res) {
        service_order_model.getProviders(req,res);
    }],
}