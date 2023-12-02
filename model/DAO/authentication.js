var connect_DB = require('./connect_db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

function checkNoEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
                return false;
            }
        }
    }
    return true;
}

function signin(res, obj) {
    connect_DB.query("SELECT user_name,password FROM user_provider WHERE user_name = ? UNION SELECT user_name,password FROM user_customer WHERE user_name = ?", [obj.user_name,obj.user_name], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
        }
        else if (result.length == 0) {
            res.status(400).json({ message: "Người dùng không tồn tại hoặc sai thông tin đăng nhập. Vui lòng thử lại" });
        }
        else {
            console.log("obj",obj,"   queru",result[0]);
            bcrypt.compare(obj.password, result[0].password)
                .then((passwordCheck) => {
                    if (!passwordCheck) {
                        res.status(400).json({ message: "Người dùng không tồn tại hoặc sai thông tin đăng nhập" });
                    }
                    else {
                        let member = {
                            user_name: result[0].user_name,
                        };
                        const token = jwt.sign(member, "RANDOM-TOKEN", { expiresIn: "15m" });
                        res.json({ member: member, token });
                    }
                })
                .catch((error) => {
                    res.status(400).json({ message: "Người dùng không tồn tại hoặc sai thông tin đăng nhập. Vui lòng thử lại" });
                })
        }
    })

}

module.exports = { checkNoEmpty, signin }