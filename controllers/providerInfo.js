const path = require("path");
var authentication_model = require("../model/DAO/authentication");
var provider_model=require("../model/DAO/provider");
const authorization_model = require('../model/DAO/authorization');
module.exports = {
    getAllInfo: [authorization_model.loadCurMember,function (req, res) {
        provider_model.getAllInfo(req,res);
    }],
    editInfo: function (req, res) {
        let info = {
            name: req.body.name,
            street: req.body.street,
            district: req.body.district,
            province: req.body.province,
            town: req.body.town,
            phone_number: req.body.phone_number,
            provider_id: req.body.provider_id
        };
        provider_model.editInfo(info, res);
    }
}
