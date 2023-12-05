
var connect_DB = require('./connect_db');


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

module.exports = {getAllOrder}