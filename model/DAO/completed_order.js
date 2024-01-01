var connect_DB = require("./connect_db");
var jwt = require("jsonwebtoken");

function getCompletedOrderByCustomerId(req, res) {
  connect_DB.query(
    `
    SELECT * 
    FROM service_order
    WHERE customer_id = ? and fixed is not NULL;
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
        FROM service_order
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
function complete(req, res) {
  const id = req.order_id;
  console.log(id);
  const data = req.formData;
  console.log(data);
  for (cost of data.componentCosts) {
    let sql =
      "INSERT INTO completedorderpricelist (order_id, component_name, cost, description) VALUES (?,?,?,?)";
    connect_DB.query(sql, [
      id.order_id,
      cost.name,
      cost.value,
      cost.description,
    ]);
  }
  sqlUpdateStatus = `
    UPDATE service_order 
    SET 
      status = 'Đã hoàn thành', 
      fixed_description = ?, 
      fixed = ?,
      wage = ?  
    WHERE order_id = ?
    `;
  connect_DB.query(sqlUpdateStatus, [
    data.jobDescription,
    data.status,
    data.wage,
    id.order_id,
  ]);

  // sqlComplete =
  //   "UPDATE service_order SET (order_id, description, order_status, wage) VALUES (?,?,?,?)";
  // connect_DB.query(sqlComplete, [
  //   id.order_id,
  //   data.jobDescription,
  //   data.status,
  //   data.wage,
  // ]);
}
function paidByOrderId(req, res) {
  connect_DB.query(
    `
      UPDATE service_order SET paid = 1 WHERE order_id = ?
    `,
    req.order_id,
    (err, result, field) => {
      if (err) {
        res.status(500).json({ message: "Không thể thanh toán" });
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
  addRateByOrderId,
  changeRateByOrderId,
  delRateByOrderId,
  complete,
  paidByOrderId,
};
