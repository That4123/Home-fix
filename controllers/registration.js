var bcrypt = require("bcrypt");
var registration_model = require("../model/DAO/registration")

module.exports = {
    register: function (req, res) {
        if (req.body.password) {
            bcrypt.hash(req.body.password, 10)
                .then((hashedPassword) => {
                    let user = {
                        name_customer: req.body.name_customer,
                        user_name: req.body.user_name,
                        phone_number: req.body.phone_number,
                        password: hashedPassword
                    };
                    registration_model.register(res, user);
                })
                .catch((error) => {
                    res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                })
        }
        else {
            res.status(400).json({ message: "Vui lòng không để trống trường nào!" });
        }
    }
}