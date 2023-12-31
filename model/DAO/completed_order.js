var connect_DB = require("./connect_db");
var jwt = require("jsonwebtoken");

function getCompletedOrderByCustomerId(req, res) {
  connect_DB.query(
    `
    SELECT * 
    FROM (SELECT CompletedOrder.*,service_order.customer_id customer_id, service_order.time_range time_range, service_order.specific_item item, user_provider.user_name, user_provider.name 
      FROM CompletedOrder
      INNER JOIN service_order
      ON CompletedOrder.order_id = service_order.order_id
      INNER JOIN user_provider
      ON service_order.provider_id = user_provider.provider_id) a
    WHERE a.customer_id = ?;
    `,
    req,
    (err, result, field) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
      } else {
        res.json(result);
      }
    }
  );
}
function getCompletedOrderByOrderId(req, res) {
  connect_DB.query(
    `
        SELECT *
        FROM CompletedOrder
        WHERE order_id = ?;
    `,
    req,
    (err, result, field) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
      } else {
        res.json(result);
      }
    }
  );
}
function getPicByOrderId(req, res) {
  connect_DB.query(
    `
      SELECT image
      FROM CompletedOrderPic
      WHERE CompletedOrderPic.order_id = ?;
    `,
    req,
    (err, result, field) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
      } else {
        res.json(result);
      }
    }
  );
}
function getPriceListByOrderId(req, res) {
  connect_DB.query(
    `
      SELECT *
      FROM CompletedOrderPriceList
      WHERE order_id = ?;
    `,
    req,
    (err, result, field) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
      } else {
        res.json(result);
      }
    }
  );
}

function complete(req, res) {
  const id = req.order_id;
  console.log(id);
  const data = req.formData;
  console.log(data);
  for (cost of data.componentCosts) {
    let sql = "INSERT INTO completedorderpricelist (order_id, component_name, cost, description) VALUES (?,?,?,?)";
    connect_DB.query(
      sql,
      [id.order_id, cost.name, cost.value, cost.description]
    );
  }
  sqlUpdateStatus = "UPDATE service_order SET status = 'Đã hoàn thành' WHERE order_id = ?";
  connect_DB.query(sqlUpdateStatus, [id.order_id]);
  
  sqlComplete = "INSERT INTO completedorder (order_id, description, order_status, wage) VALUES (?,?,?,?)";
  connect_DB.query(sqlComplete, [id.order_id, data.jobDescription, data.status, data.wage]);
}

module.exports = {
  getCompletedOrderByCustomerId,
  getCompletedOrderByOrderId,
  getPicByOrderId,
  getPriceListByOrderId,
  complete
};
