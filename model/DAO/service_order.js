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
        req.cur_member.user_id,
        serviceOrder.providerId,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({message:"Gửi yêu cầu thành công"});
        }
    })

}
function cancelOrder(req,res){
    const sql = 'UPDATE service_order SET status = \'Đã hủy\' WHERE order_id = ?';
    connect_DB.query(sql, [
        req.body.order_id,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else{
            res.status(200).json({message:"Thành công hủy yêu cầu"});
        }
    })
}
function acceptOrder(req,res){
    const sql = 'UPDATE service_order SET status = \'Đang chờ thực hiện\' WHERE order_id = ?';
    connect_DB.query(sql, [
        req.body.order_id,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else{
            res.status(200).json({message:"Thành công chấp nhận yêu cầu"});
        }
    })
}
function getOrderDetails(req,res){
    const sql = 'SELECT * FROM service_order WHERE order_id=?';
    connect_DB.query(sql, [
        req.body.order_id,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else if (result.length===0){
            res.status(404).json({message:"yêu cầu không tồn tại"});
        }
        else {
            console.log(result);
        
            const formattedOrder = {
                ...result[0],
                start_time: new Date(result[0].start_time).toLocaleString('en-US'),
                time_range: new Date(result[0].time_range).toLocaleString('en-US'),
            };
        
            const providerQuery = 'SELECT name FROM user_provider WHERE provider_id = ?';
            connect_DB.query(providerQuery, [result[0].provider_id], function (errProvider, resultProvider, fieldProvider) {
                if (errProvider) {
                    res.status(500).json({ message: errProvider });
                } else {
                    if (resultProvider.length > 0) {
                        formattedOrder.provider_name = resultProvider[0].name;
                    }
        
                    // Fetch customer name based on customer ID
                    const customerQuery = 'SELECT name FROM user_customer WHERE customer_id = ?';
                    connect_DB.query(customerQuery, [result[0].customer_id], function (errCustomer, resultCustomer, fieldCustomer) {
                        if (errCustomer) {
                            res.status(500).json({ message: errCustomer });
                        } else {
                            if (resultCustomer.length > 0) {
                                formattedOrder.customer_name = resultCustomer[0].name;
                            }
                            res.status(200).json({ message: "Thành công lấy thông tin yêu cầu", service_order: formattedOrder });
                        }
                    });
                }
            });
        }        
    })
}

function getProviders(req,res){
    const sql = 'SELECT * FROM user_provider, repair_type WHERE user_provider.provider_id = repair_type.provider_id';
    connect_DB.query(sql, function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({ message: "Thành công lấy danh sách nhà cung cấp", providers: result });
        }
    })
}

module.exports = { checkNoEmpty, makeOrder,cancelOrder,getOrderDetails,acceptOrder, getProviders }