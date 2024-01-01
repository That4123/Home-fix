-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2024 at 01:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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

-- --------------------------------------------------------

--
-- Table structure for table `agreement`
--

CREATE TABLE `agreement` (
  `agreement_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `time_schedule` datetime NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `completedorder`
--

CREATE TABLE `completedorder` (
  `order_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `order_status` enum('total','partial','not') DEFAULT NULL,
  `wage` int(11) DEFAULT NULL,
  `paid` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `completedorder`
--

INSERT INTO `completedorder` (`order_id`, `description`, `order_status`, `wage`, `paid`) VALUES
(1, 'Máy bị cháy cuộn dây', 'total', 100000, 0),
(2, 'Lỗi nguồn điện, đã tiến hành đo áp và thay thế', 'total', 100000, 0),
(3, 'Thiết bị lỗi phần điện tử, không phải phần cơ như mô tả. Không thể sửa chữa', 'not', 100000, 0),
(4, 'Bị mất linh kiện, đã bổ sung nhưng máy chạy vẫn bị rung lắc', 'partial', 100000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `completedorderpic`
--

CREATE TABLE `completedorderpic` (
  `pic_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `completedorderpic`
--

INSERT INTO `completedorderpic` (`pic_id`, `order_id`, `image`) VALUES
(1, 1, 'https://i.pinimg.com/736x/8d/85/02/8d850252f18eb6016ffae77c07e61438.jpg'),
(2, 1, 'https://i.pinimg.com/736x/8d/85/02/8d850252f18eb6016ffae77c07e61438.jpg'),
(3, 1, 'https://i.pinimg.com/736x/8d/85/02/8d850252f18eb6016ffae77c07e61438.jpg'),
(4, 1, 'https://i.pinimg.com/736x/8d/85/02/8d850252f18eb6016ffae77c07e61438.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `completedorderpricelist`
--

CREATE TABLE `completedorderpricelist` (
  `component_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `component_name` varchar(50) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `completedorderpricelist`
--

INSERT INTO `completedorderpricelist` (`component_id`, `order_id`, `component_name`, `cost`, `description`) VALUES
(1, 1, 'Bộ ốc vít', 50000, 'thay mới'),
(2, 1, 'Lõi đồng', 35000, 'bị cháy, thay tạm lõi cũ'),
(3, 1, 'Phích cắm', 5000, 'thay mới'),
(0, 9, 'dây điện ', 40000, 'dây cũ bị đứt');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `rate` smallint(6) NOT NULL,
  `comment` text NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `rate`, `comment`, `order_id`) VALUES
(0, 3, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `repair_type`
--

CREATE TABLE `repair_type` (
  `provider_id` int(11) NOT NULL,
  `repair_type` enum('Nội thất','Đồ gia dụng','Dụng cụ nhà bếp','Vật dụng công nghệ') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `repair_type`
--

INSERT INTO `repair_type` (`provider_id`, `repair_type`) VALUES
(2, 'Nội thất'),
(3, 'Đồ gia dụng'),
(4, 'Vật dụng công nghệ'),
(5, 'Dụng cụ nhà bếp'),
(6, 'Đồ gia dụng'),
(7, 'Nội thất'),
(8, 'Vật dụng công nghệ');

-- --------------------------------------------------------

--
-- Table structure for table `service_order`
--

CREATE TABLE `service_order` (
  `order_id` int(11) NOT NULL,
  `item_type` enum('Nội thất','Đồ gia dụng','Dụng cụ nhà bếp','Vật dụng công nghệ') NOT NULL,
  `specific_item` varchar(40) NOT NULL,
  `text_description` text NOT NULL,
  `image_description` varchar(40) NOT NULL,
  `province` varchar(40) NOT NULL,
  `district` varchar(40) NOT NULL,
  `town` varchar(40) NOT NULL,
  `street` varchar(50) NOT NULL,
  `start_time` datetime NOT NULL DEFAULT current_timestamp(),
  `time_range` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('Đang xác nhận','Đã hủy','Đã hoàn thành','Đang chờ thực hiện','Xác thực hoàn tất') NOT NULL,
  `customer_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_order`
--

INSERT INTO `service_order` (`order_id`, `item_type`, `specific_item`, `text_description`, `image_description`, `province`, `district`, `town`, `street`, `start_time`, `time_range`, `status`, `customer_id`, `provider_id`) VALUES
(1, 'Vật dụng công nghệ', 'Máy tính HP', 'Tắt màn hình', 'https://cdn.tgdd.vn/Files/2021/09/05/138', 'Tỉnh Phú Thọ', 'Ba Đình', 'Phường Bình An', '267 Nguyễn Thái Bình', '2024-01-01 11:26:21', '2023-12-02 20:33:25', 'Xác thực hoàn tất', 1, 2),
(2, 'Vật dụng công nghệ', 'Máy in Xerox', 'Hết mực in', 'https://vitinhnguyenkim.vn/uploads/produ', 'Tỉnh Phú Thọ', 'Ba Đình', 'Phường An Bình', '234 Quang Trung', '2024-01-01 11:26:21', '2023-12-03 21:09:33', 'Đã hủy', 1, 2),
(3, 'Đồ gia dụng', 'Máy giặt Toshiba 15x', 'Không vào điện', 'https://tse1.mm.bing.net/th?id=OIP.h43m6', 'Tỉnh Vĩnh Phúc', 'Huyện Tam Đảo', 'Thị trấn Đại Đình', '220 Hùng Vương', '2024-01-01 11:26:21', '2023-12-04 21:08:00', 'Đã hoàn thành', 1, 2),
(4, 'Đồ gia dụng', 'Máy giặt Toshiba 15x', 'Không vào điện', 'https://tse1.mm.bing.net/th?id=OIP.h43m6', 'Tỉnh Vĩnh Phúc', 'Huyện Tam Đảo', 'Thị trấn Đại Đình', '35 Trần Phú', '2024-01-01 11:26:21', '2023-12-05 21:08:00', 'Đang xác nhận', 1, 2),
(5, 'Đồ gia dụng', 'Máy giặt Toshiba 15x', 'Không thể bơm nước', 'https://tse1.mm.bing.net/th?id=OIP.h43m6', 'TP Hồ Chí Minh', 'Quận 5', 'Phường 11', '220 Trần Hưng Đạo', '2024-01-01 11:26:21', '2023-12-06 21:10:00', 'Đang xác nhận', 1, 2),
(6, 'Đồ gia dụng', 'Máy giặt Toshiba 15x', 'Tiếng động mạnh khi hoạt động', 'https://tse1.mm.bing.net/th?id=OIP.h43m6', 'TP Hồ Chí Minh', 'Quận 12', 'Phường 12', '234 Tô Hiến Thành', '2024-01-01 11:26:21', '2023-12-07 21:28:00', 'Đã hoàn thành', 1, 2),
(7, 'Nội thất', 'Máy Lạnh Toshiba 19x', 'Kêu lớn khi hoạt động', 'C:\\fakepath\\README.md', 'Tỉnh Bắc Ninh', 'Huyện Yên Phong', 'Xã Trung Nghĩa', '219, Trần Hưng Đạo', '2024-01-01 11:26:21', '2024-01-24 10:48:00', 'Xác thực hoàn tất', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_customer`
--

CREATE TABLE `user_customer` (
  `customer_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(40) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `phone_number` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_customer`
--

INSERT INTO `user_customer` (`customer_id`, `user_name`, `password`, `name`, `balance`, `phone_number`) VALUES
(1, 'customer1', '$2b$10$LmHWQ8e/4zG1lhc6LJtVZOYEzRPw86fgOpuj7/GBJFwNAQ4AXOQkK', 'Trần Thị An', 0.00, '0945637465');

-- --------------------------------------------------------

--
-- Table structure for table `user_provider`
--

CREATE TABLE `user_provider` (
  `provider_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(40) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `province` varchar(20) NOT NULL,
  `district` varchar(20) NOT NULL,
  `town` varchar(20) NOT NULL,
  `street` varchar(40) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `rate` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_provider`
--

INSERT INTO `user_provider` (`provider_id`, `user_name`, `password`, `name`, `balance`, `province`, `district`, `town`, `street`, `phone_number`, `rate`) VALUES
(2, 'provider1', '$2b$10$iZkUu9bm2731fYMEd75aGOY6jwpYUPomTtmBOa6zTj2AW8cD9FVlW', 'Nguyễn Văn Anh', 0.00, 'Tỉnh Phú Thọ', 'Ba Đình', 'Phường An Bình', '35 Thành Thái', '0975667874', 4.70),
(3, 'provider2', '$2b$10$xk1fKCFjroW6.waXRqAwDuClWp6xLAXtWr1cOgNAND2lamE74fXA2', 'Nguyễn Hoàng Thành', 0.00, 'Tỉnh Vĩnh Phúc', 'Huyện Tam Đảo', 'Thị trấn Đại Đình', '234 Trần Hưng Đạo', '0926484832', 4.90),
(4, 'provider3', '$2b$10$HHpxAcehWOO0GyXSUhgDPeJs25YiwfKuUCP34icqQey9CZTwN2/ZC', 'Phạm Hoàng An', 0.00, 'Tỉnh Vĩnh Phúc', 'Huyện Tam Đảo', 'Thị trấn Đại Đình', '134 Trần Quang Khải', '0926484834', 4.50),
(5, 'provider4', '$2b$10$w/S73eXYIDD.cfhWUnJA4OgTB5gv9ocoGSzBdEDye1P6x/4jaz9x6', 'Vũ Trọng Phúc', 0.00, 'TP Hồ Chí Minh', 'Quận 5', 'Phường 11', '254 Tô Hiến Thành', '0974584832', 4.60),
(6, 'provider5', '$2b$10$OJMCJUgo7wzJ.1HcFB2RLuPseSzAown7MAp09TFrzhwRwzMEs70fW', 'Phạm Thành', 0.00, 'TP Hồ Chí Minh', 'Quận 12', 'Phường 12', '296 Tô Hiến Thành', '0974584856', 4.00),
(7, 'provider6', '$2b$10$/5VLno5RYfpQGveWGlZUFueIyE6dqb1ashP8N2i5uUY5GhxHSn/jq', 'Phan Lê Hoàng An', 0.00, 'Tỉnh Bắc Ninh', 'Huyện Yên Phong', 'Xã Trung Nghĩa', '16 Võ Văn Ngân', '0974584832', 4.60),
(8, 'provider7', '$2b$10$JEYWbDehukLRZNO8.2OFZu2LUKue4KHBKCXOMqgQ/wRPNOGx7BPJW', 'Phùng Thanh', 0.00, 'Tỉnh Phú Thọ', 'Huyện Tân Sơn', 'Xã Xuân Đài', '254 Tô Hiến Thành', '0974584556', 4.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agreement`
--
ALTER TABLE `agreement`
  ADD PRIMARY KEY (`agreement_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `repair_type`
--
ALTER TABLE `repair_type`
  ADD PRIMARY KEY (`provider_id`,`repair_type`);

--
-- Indexes for table `service_order`
--
ALTER TABLE `service_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indexes for table `user_customer`
--
ALTER TABLE `user_customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `user_provider`
--
ALTER TABLE `user_provider`
  ADD PRIMARY KEY (`provider_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agreement`
--
ALTER TABLE `agreement`
  MODIFY `agreement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `service_order`
--
ALTER TABLE `service_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_customer`
--
ALTER TABLE `user_customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_provider`
--
ALTER TABLE `user_provider`
  MODIFY `provider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agreement`
--
ALTER TABLE `agreement`
  ADD CONSTRAINT `agreement_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `service_order` (`order_id`);

--
-- Constraints for table `repair_type`
--
ALTER TABLE `repair_type`
  ADD CONSTRAINT `repair_type_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `user_provider` (`provider_id`);

--
-- Constraints for table `service_order`
--
ALTER TABLE `service_order`
  ADD CONSTRAINT `service_order_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `user_customer` (`customer_id`),
  ADD CONSTRAINT `service_order_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `user_provider` (`provider_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
