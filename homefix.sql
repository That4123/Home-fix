-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2023 at 03:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4
DROP database IF EXISTS homefix;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homefix`
--
CREATE DATABASE IF NOT EXISTS `homefix` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `homefix`;

-- --------------------------------------------------------

--
-- Table structure for table `agreement`
--
-- Creation: Dec 02, 2023 at 06:29 AM
--

CREATE TABLE IF NOT EXISTS `agreement` (
  `agreement_id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL,
  `time_schedule` datetime NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`agreement_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `agreement`:
--   `order_id`
--       `service_order` -> `order_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--
-- Creation: Dec 02, 2023 at 06:29 AM
--

CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `rate` smallint(6) NOT NULL,
  `comment` text NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `feedback`:
--   `order_id`
--       `service_order` -> `order_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `make`
--
-- Creation: Dec 02, 2023 at 06:32 AM
--

CREATE TABLE IF NOT EXISTS `make` (
  `order_id` int(11) NOT NULL,
  `agreement_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`agreement_id`),
  KEY `agreement_id` (`agreement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `make`:
--   `order_id`
--       `service_order` -> `order_id`
--   `agreement_id`
--       `agreement` -> `agreement_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `receive`
--
-- Creation: Dec 02, 2023 at 06:29 AM
--

CREATE TABLE IF NOT EXISTS `receive` (
  `order_id` int(11) NOT NULL,
  `feedback_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`feedback_id`),
  KEY `feedback_id` (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `receive`:
--   `feedback_id`
--       `feedback` -> `feedback_id`
--   `order_id`
--       `service_order` -> `order_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `repair_type`
--
-- Creation: Dec 02, 2023 at 01:36 PM
--

CREATE TABLE IF NOT EXISTS `repair_type` (
  `provider_id` int(11) NOT NULL,
  `repair_type` enum('Nội thất','Đồ gia dụng','Dụng cụ nhà bếp','Vật dụng công nghệ') NOT NULL,
  PRIMARY KEY (`provider_id`,`repair_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `repair_type`:
--

-- --------------------------------------------------------

--
-- Table structure for table `service_order`
--
-- Creation: Dec 02, 2023 at 06:29 AM
-- Last update: Dec 02, 2023 at 02:24 PM
--

CREATE TABLE IF NOT EXISTS `service_order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_type` enum('Nội thất','Đồ gia dụng','Dụng cụ nhà bếp','Vật dụng công nghệ') NOT NULL,
  `specific_item` varchar(40) NOT NULL,
  `text_description` text NOT NULL,
  `image_description` varchar(40) NOT NULL,
  `province` varchar(40) NOT NULL,
  `district` varchar(40) NOT NULL,
  `town` varchar(40) NOT NULL,
  `street` varchar(50) NOT NULL,
  `time_range` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('Đang xác nhận','Đã hủy','Đã hoàn thành','Đang chờ thực hiện','Xác thực hoàn tất') NOT NULL,
  `customer_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `provider_id` (`provider_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `service_order`:
--   `customer_id`
--       `user_customer` -> `customer_id`
--   `provider_id`
--       `user_provider` -> `provider_id`
--

--
-- Dumping data for table `service_order`
--

INSERT INTO `service_order` (`order_id`, `item_type`, `specific_item`, `text_description`, `image_description`, `province`, `district`, `town`, `street`, `time_range`, `status`, `customer_id`, `provider_id`) VALUES
(1, 'Vật dụng công nghệ', 'abc', 'abcy', 'abcx', 'phu tho', 'ba dinh', 'kontum', 'street', '2023-12-02 20:33:25', 'Đã huỷ', 1, 2),
(2, 'Vật dụng công nghệ', 'abc', 'abcy', 'abcx', 'phu tho', 'ba dinh', 'kontum', 'street', '2023-12-02 21:09:33', 'Đã huỷ', 1, 2),
(3, 'Đồ gia dụng', 'Máy giặt Toshiba 15x', 'Không vào điện', 'https://tse1.mm.bing.net/th?id=OIP.h43m6JfyuhSB1ZgT7-_h0QHaJ4&pid=Api&P=0&h=220', 'Tỉnh Vĩnh Phúc', 'Huyện Tam Đảo', 'Thị trấn Đại Đình', '220, Hùng Vương', '2023-12-02 21:08:00', 'Đang xác nhận', 1, 2),
(4, 'Đồ gia dụng', 'Máy giặt Toshiba 15x', 'Không vào điện', 'https://tse1.mm.bing.net/th?id=OIP.h43m6JfyuhSB1ZgT7-_h0QHaJ4&pid=Api&P=0&h=220', 'Tỉnh Vĩnh Phúc', 'Huyện Tam Đảo', 'Thị trấn Đại Đình', 'tran phu', '2023-12-02 21:08:00', 'Đang xác nhận', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_customer`
--
-- Creation: Dec 02, 2023 at 02:00 PM
-- Last update: Dec 02, 2023 at 02:00 PM
--

CREATE TABLE IF NOT EXISTS `user_customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(40) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `phone_number` varchar(10) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user_customer`:
--

--
-- Dumping data for table `user_customer`
--

INSERT INTO `user_customer` (`customer_id`, `user_name`, `password`, `name`, `balance`, `phone_number`) VALUES
(1, 'customer1', '$2b$10$LmHWQ8e/4zG1lhc6LJtVZOYEzRPw86fgOpuj7/GBJFwNAQ4AXOQkK', 'Trần Thị A', 0.00, '');

-- --------------------------------------------------------

--
-- Table structure for table `user_provider`
--
-- Creation: Dec 02, 2023 at 01:59 PM
-- Last update: Dec 02, 2023 at 01:59 PM
--

CREATE TABLE IF NOT EXISTS `user_provider` (
  `provider_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(40) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `province` varchar(20) NOT NULL,
  `district` varchar(20) NOT NULL,
  `town` varchar(20) NOT NULL,
  `street` varchar(40) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `rate` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`provider_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user_provider`:
--

--
-- Dumping data for table `user_provider`
--

INSERT INTO `user_provider` (`provider_id`, `user_name`, `password`, `name`, `balance`, `province`, `district`, `town`, `street`, `phone_number`, `rate`) VALUES
(2, 'provider1', '$2b$10$iZkUu9bm2731fYMEd75aGOY6jwpYUPomTtmBOa6zTj2AW8cD9FVlW', 'Nguyễn Văn A', 0.00, 'Hcm', 'q10', 'phú ', '112', '1234567890', '4.7');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agreement`
--
ALTER TABLE `agreement`
  ADD CONSTRAINT `agreement_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `service_order` (`order_id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `service_order` (`order_id`);

--
-- Constraints for table `make`
--
ALTER TABLE `make`
  ADD CONSTRAINT `make_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `service_order` (`order_id`),
  ADD CONSTRAINT `make_ibfk_2` FOREIGN KEY (`agreement_id`) REFERENCES `agreement` (`agreement_id`);

--
-- Constraints for table `receive`
--
ALTER TABLE `receive`
  ADD CONSTRAINT `receive_ibfk_1` FOREIGN KEY (`feedback_id`) REFERENCES `feedback` (`feedback_id`),
  ADD CONSTRAINT `receive_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `service_order` (`order_id`);

--
-- Constraints for table `service_order`
--
ALTER TABLE `service_order`
  ADD CONSTRAINT `service_order_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `user_customer` (`customer_id`),
  ADD CONSTRAINT `service_order_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `user_provider` (`provider_id`);

DROP TABLE IF EXISTS CompletedOrder;
CREATE TABLE CompletedOrder (
	order_id INT,
    description TEXT,
    order_status ENUM ('total','partial','not'),
    wage INT,
    PRIMARY KEY (order_id)
);

DROP TABLE IF EXISTS CompletedOrderPic;
CREATE TABLE CompletedOrderPic (
	pic_id INT,
    order_id INT,
    image TEXT,
    PRIMARY KEY (pic_id, order_id)
);

DROP TABLE IF EXISTS CompletedOrderPriceList;
CREATE TABLE CompletedOrderPriceList (
    component_id INT auto_increment,
    order_id INT,
    component_name VARCHAR(50),
    cost INT,
    description text,
    PRIMARY KEY (component_id, order_id)
);

INSERT INTO CompletedOrder (order_id, description, order_status,wage)
VALUES
(1,'Máy bị cháy cuộn dây', 'total',100000),
(2,'Lỗi nguồn điện, đã tiến hành đo áp và thay thế', 'total',100000),
(3,'Thiết bị lỗi phần điện tử, không phải phần cơ như mô tả. Không thể sửa chữa','not',100000),
(4,'Bị mất linh kiện, đã bổ sung nhưng máy chạy vẫn bị rung lắc','partial',100000);

INSERT INTO CompletedOrderPic (pic_id, order_id, image)
VALUES
(1,1, 'https://i.pinimg.com/736x/8d/85/02/8d850252f18eb6016ffae77c07e61438.jpg'),
(2,1, 'https://i.pinimg.com/736x/8d/85/02/8d850252f18eb6016ffae77c07e61438.jpg'),
(3,1,'https://i.pinimg.com/736x/8d/85/02/8d850252f18eb6016ffae77c07e61438.jpg'),
(4,1,'https://i.pinimg.com/736x/8d/85/02/8d850252f18eb6016ffae77c07e61438.jpg');

INSERT INTO CompletedOrderPriceList (component_id, order_id, component_name, cost, description )
VALUES
(1,1, 'Bộ ốc vít', 50000, 'thay mới'),
(2,1, 'Lõi đồng', 35000, 'bị cháy, thay tạm lõi cũ'),
(3,1, 'Phích cắm', 5000, 'thay mới');

--
-- Metadata
--
USE `phpmyadmin`;

--
-- Metadata for table agreement
--

--
-- Metadata for table feedback
--

--
-- Metadata for table make
--

--
-- Metadata for table receive
--

--
-- Metadata for table repair_type
--

--
-- Metadata for table service_order
--

--
-- Metadata for table user_customer
--

--
-- Metadata for table user_provider
--

--
-- Metadata for database homefix
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;