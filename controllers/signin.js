var authentication_model = require("../model/DAO/authentication")
var authorization_model = require("../model/DAO/authorization")

module.exports = {
    signin: function (req, res) {
        let obj = {
            user_name: req.body.user_name,
            password: req.body.password
        };
        if (authentication_model.checkNoEmpty(obj)) {
            authentication_model.signin(res, obj);
            
        }
        else {
            res.status(400).json({ message: "Không bỏ trống bất kỳ trường thông tin đăng nhập nào!" });
        }
    },
    role: function (req, res) {
        let user_name = req.body.user_name;
        console.log(user_name);
        authorization_model.role(user_name, res)
    }
}