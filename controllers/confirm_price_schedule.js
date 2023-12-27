const path = require("path");
const authorization_model = require('../model/DAO/authorization');
const order_model = require('../model/DAO/order')
module.exports = {
    loadRole: [authorization_model.loadCurMember, authorization_model.role],
    getInfoOrder: function(req, res){
        
        order_model.getInfoOrder(req.body.order_id.order_id, res);
    },
    setCSP: function(req, res){
        order_model.setCSP(req.body, res);
    },
    getCSP: function(req, res){
        order_model.getCSP(req.body, res);
    },
    updateAfterCSP: function(req, res){
        console.log(req.body)
        order_model.updateAfterCSP(req.body, res);
    }
}