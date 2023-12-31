const completed_order_model = require("../model/DAO/completed_order");

module.exports = {
  getCompletedOrderByCustomerId: function (req, res) {
    const { customer_id } = req.query;
    completed_order_model.getCompletedOrderByCustomerId(customer_id, res);
  },
  getCompletedOrderByOrderId: function (req, res) {
    const { order_id } = req.query;
    completed_order_model.getCompletedOrderByOrderId(order_id, res);
  },
  getPicByOrderId: function (req, res) {
    const { order_id } = req.query;
    completed_order_model.getPicByOrderId(order_id, res);
  },
  getPriceListByOrderId: function (req, res) {
    const { order_id } = req.query;
    completed_order_model.getPriceListByOrderId(order_id, res);
  },
  complete: function (req, res) {
    const data = req.body;
    console.log(data);
    completed_order_model.complete(data, res);
  },
};
