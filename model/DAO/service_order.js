var connect_DB = require('./connect_db');

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

function makeOrder(req, res) {
    const sql = [
        'INSERT INTO service_order',
        '(item_type, specific_item, text_description, image_description, province, district, town, street, time_range, status, customer_id, provider_id)',
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ];
    
    console.log(req.body.service_order);
    
    const serviceOrder = req.body.service_order;
    
    connect_DB.query(sql.join(''), [
        serviceOrder.itemType,
        serviceOrder.specificItem,
        serviceOrder.textDescription,
        serviceOrder.imageDescription,
        serviceOrder.position.province,
        serviceOrder.position.district,
        serviceOrder.position.town,
        serviceOrder.position.street,
        serviceOrder.meetingTimeSchedule,
        'Đang xác nhận',
        1,  // Assuming customer_id is always 1, you may need to modify this
        serviceOrder.providerId,
    ], function (err, result, field) {
        if (err) {
            console.log('loi1',err,field,result);
            res.status(500).json({ message: err });
        }
        else {
            console.log('success2');
            res.status(200).json({message:"Gửi yêu cầu thành công"});
        }
    })

}

module.exports = { checkNoEmpty, makeOrder }