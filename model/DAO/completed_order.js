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
          .json({ message: "Không thể lấy danh sách yêu cầu của người dùng" });
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
        res.status(500).json({ message: "Không thể lấy thông tin order" });
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
        res.status(500).json({ message: "Không thể lấy danh sách hình ảnh" });
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
        res.status(500).json({ message: "Không thể lấy danh sách giá tiền" });
      } else {
        res.json(result);
      }
    }
  );
}
function getRateByOrderId(req, res) {
  connect_DB.query(
    `
      SELECT *
      FROM feedback
      WHERE order_id = ?;
    `,
    req.order_id,
    (err, result, field) => {
      if (err) {
        res.status(500).json({ message: "Không thể lấy thông tin đánh giá" });
      } else {
        res.json(result);
      }
    }
  );
}
function addRateByOrderId(req, res) {
  connect_DB.query(
    `
      INSERT INTO feedback
      (rate,comment,order_id)
      VALUES
      (?,?,?);
    `,
    // req.rate,
    [req.rate, req.comment, req.order_id],
    (err, result, field) => {
      if (err) {
        res.status(500).json({ message: "Không thể thêm đánh giá" });
      }
    }
  );
}
function changeRateByOrderId(req, res) {
  connect_DB.query(
    `
      UPDATE feedback
      SET 
        rate = ?,
        comment = ?
      WHERE order_id = ?;
    `,
    [req.rate, req.comment, req.order_id],
    (err, result, field) => {
      if (err) {
        res.status(500).json({ message: "Không thể cập nhật đánh giá" });
      }
    }
  );
}
function delRateByOrderId(req, res) {
  connect_DB.query(
    `
      DELETE FROM feedback
      WHERE order_id = ?;
    `,
    req.order_id,
    (err, result, field) => {
      if (err) {
        res.status(500).json({ message: "Không thể xóa đánh giá" });
      }
    }
  );
}
module.exports = {
  getCompletedOrderByCustomerId,
  getCompletedOrderByOrderId,
  getPicByOrderId,
  getPriceListByOrderId,
  getRateByOrderId,
  changeRateByOrderId,
  addRateByOrderId,
  delRateByOrderId,
};
