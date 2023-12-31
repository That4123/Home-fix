var connect_DB = require('./connect_db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

function checkNoEmpty(res, obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
                res.status(400).json({ message: "Vui lòng không để trống bất kỳ trường nào!" });
                return false;
            }
        }
    }
    return true;
}

function checkNoDuplicate(res, user_name, valid) {
    connect_DB.query("SELECT user_name FROM user_provider WHERE user_name= ? UNION SELECT user_name FROM user_customer WHERE user_name= ?", [user_name,user_name], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            valid(false);
        }
        else if (result.length > 0) {
            res.status(400).json({ message: "Thông tin bị trùng. Vui lòng kiểm tra xem bạn đã từng đăng ký với thông tin này chưa" });
            valid(false);
        }
        else {
            valid(true);
        }
    })
}

function validate(res, obj, register) {
    if (checkNoEmpty(res, obj)) {
        checkNoDuplicate(res, obj.user_name, function (valid) {
            register(valid);
        });
    }
    else
        register(false);
}

function register(res, obj) {
    validate(res, obj, function (valid) {
        if (valid) {
            let sql = "INSERT INTO user_customer (user_name, password, name, phone_number) VALUES (?, ?, ?, ?)"
            connect_DB.query(sql, [
                obj.user_name,
                obj.password,
                obj.name_customer,
                obj.phone_number
            ], function (err, result) {
                console.log("111111");
                if (err)
                    res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                else {
                    let sql = "SELECT customer_id FROM user_customer WHERE name = ?"
                    connect_DB.query(sql, [
                        obj.name_customer
                    ], function (err, result) {
                    let member = {
                        user_name: obj.user_name,
                        name: obj.name_customer,
                        user_id: result[0].customer_id,
                    };
                    console.log("Controller Registration")
                    console.log(member);
                    const token = jwt.sign(member, "RANDOM-TOKEN", { expiresIn: "59m" });
                    res.json({ member: member, token });
                    }
                    )
                }
            })
        }
    })
}

module.exports = { register }