const path = require("path");
const authorization_model = require('../model/DAO/authorization');
const order_model = require('../model/DAO/order')
module.exports = {
    loadRole: [authorization_model.loadCurMember, authorization_model.role],
    getInfoOrder: function(req, res){
        order_model.getInfoOrder(req.body.order_id.orderId, res);
    },
}