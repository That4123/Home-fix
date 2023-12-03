const { crossOriginResourcePolicy } = require('helmet');
var connect_DB = require('./connect_db');


function getAllOrder(req, res) {
    console.log(req.body.customerId);
    const sql = [
        'SELECT * FROM service_order WHERE `customer_id`=?'
    ];
    
    connect_DB.query(sql.join(''), [
        req.body.customerId,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({allOrder:result});
        }
    })

}

module.exports = {getAllOrder }