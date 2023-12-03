var connect_DB = require('./connect_db');
function getInfoOrder(id, res) {
    connect_DB.query(`SELECT
    service_order.order_id,
    service_order.item_type,
    service_order.specific_item,
    service_order.text_description,
    service_order.image_description,
    service_order.province,
    service_order.district,
    service_order.town,
    service_order.street,
    service_order.time_range,
    service_order.status,
    user_customer.customer_id,
    user_customer.user_name AS customer_username,
    user_customer.name AS customer_name,
    user_customer.balance AS customer_balance,
    user_customer.phone_number AS customer_phone_number,
    user_provider.provider_id,
    user_provider.user_name AS provider_username,
    user_provider.name AS provider_name,
    user_provider.balance AS provider_balance,
    user_provider.province AS provider_province,
    user_provider.district AS provider_district,
    user_provider.town AS provider_town,
    user_provider.street AS provider_street,
    user_provider.phone_number AS provider_phone_number
FROM
    service_order
INNER JOIN
    user_customer ON service_order.customer_id = user_customer.customer_id
INNER JOIN
    user_provider ON service_order.provider_id = user_provider.provider_id
WHERE
    service_order.order_id = ?;`, [id], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
        }
        else {
            res.json(result)
        }
    })
};
function setCSP(req, res){
    connect_DB.query(`INSERT INTO agreement (price, time_schedule, order_id) VALUES (?, ?, ?);`, [req.price, req.datetime, req.id.orderId], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
        }
        else {
            res.json(result)
        }
    })
}
function getCSP(req, res){
    connect_DB.query(`SELECT * FROM agreement WHERE order_id = ?;`, [req.order_id.orderId], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
        }
        else {
            res.json(result)
        }
    })
}
module.exports = {
    getInfoOrder,
    setCSP,
    getCSP}