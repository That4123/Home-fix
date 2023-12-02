var authentication_model = require("../model/DAO/authentication")

module.exports = {
    signin: function (req, res) {
        let obj = {
            user_name: req.body.user_name,
            password: req.body.password
        };
        if (authentication_model.checkNoEmpty(obj)) {
            console.log("asldfjalsdfjdfjl");
            authentication_model.signin(res, obj);
            
        }
        else {
            console.log("asldfjalsdfjdfjl");
            res.status(400).json({ message: "Không bỏ trống bất kỳ trường thông tin đăng nhập nào!" });
        }
    }
}