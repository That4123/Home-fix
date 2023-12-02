var authentication_model = require("../model/DAO/authentication")
var service_order_model=require("../model/DAO/service_order")
module.exports = {
    sendInformation: function (req, res) {
        if(service_order_model.checkNoEmpty(req.body.service_order)){
            service_order_model.makeOrder(req,res);
        }
        else{
            console.log(123);
            res.status(500).json({message:'server error'});
        }
    },
}