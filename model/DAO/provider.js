
var connect_DB = require('./connect_db');

function checkNoEmpty(obj) {
    if (obj == null || typeof obj !== 'object' || JSON.stringify(obj) === '{}') return false;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
                return false;
            }
        }
    }
    return true;
}

function getAllOrder(req, res) {
    const sql = [
        'SELECT * FROM service_order WHERE `provider_id`=?'
        
    ];
    
    connect_DB.query(sql.join(''), [
        req.cur_member.user_id,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({allOrder:result});
        }
    })

}
function getAllInfo(req, res) {
    const sql = [
        'SELECT so.*, json_arrayagg(t.repair_type) AS repair_types FROM user_provider so JOIN repair_type t ON so.provider_id = t.provider_id WHERE so.provider_id = ?'
    ];
    
    connect_DB.query(sql.join(''), [
        req.cur_member.user_id,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({allInfo:result});
        }
    })


}
function editInfo(req, res) {
    if (!checkNoEmpty(req)) {
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin cần cập nhật cho trang cá nhân!" });
        return;
    };
    let sql = 'UPDATE user_provider SET `name` = ?, `street` = ?, `town` = ?, `district` = ?, `province` = ?, `phone_number` = ? WHERE `provider_id`=?';
    connect_DB.query(sql, [req.name,
        req.street,
        req.town,
        req.district,
        req.province,
        req.phone_number,
        req.provider_id,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            
            res.status(200).json({allInfo:result});
        }
    })
}
function getInfoCustomer(req, res) {
    const sql = [
        'SELECT so.*, json_arrayagg(t.repair_type) AS repair_types FROM user_provider so JOIN repair_type t ON so.provider_id = t.provider_id WHERE so.provider_id = ?'
    ];
    
    connect_DB.query(sql.join(''), [
        req
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({allInfo:result});
        }
    })
}
function getFeedBack(req, res) {
    const sql = [
        'select f.* from feedback f JOIN service_order so ON f.order_id = so.order_id WHERE so.provider_id = ?'
    ];
    connect_DB.query(sql.join(''), [req], function(err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({allFeedBack:result});
        }
    })
}


module.exports = {getAllOrder, getAllInfo, editInfo, getInfoCustomer,getFeedBack}