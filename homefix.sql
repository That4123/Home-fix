-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 09:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Creation: Nov 27, 2023 at 08:32 AM
--

CREATE TABLE IF NOT EXISTS `agreement` (
  `agreement_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `time_schedule` datetime NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`agreement_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `agreement`:
--   `order_id`
--       `service order` -> `order_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--
-- Creation: Nov 27, 2023 at 08:32 AM
--

CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` int(11) NOT NULL,
  `rate` smallint(6) NOT NULL,
  `comment` text NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `feedback`:
--   `order_id`
--       `service order` -> `order_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `make`
--
-- Creation: Nov 27, 2023 at 08:30 AM
--

CREATE TABLE IF NOT EXISTS `make` (
  `order_id` int(11) NOT NULL,
  `agreement_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`agreement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `make`:
--   `agreement_id`
--       `agreement` -> `agreement_id`
--   `order_id`
--       `service order` -> `order_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `receive`
--
-- Creation: Nov 27, 2023 at 08:31 AM
--

CREATE TABLE IF NOT EXISTS `receive` (
  `order_id` int(11) NOT NULL,
  `feedback_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `receive`:
--   `feedback_id`
--       `feedback` -> `feedback_id`
--   `order_id`
--       `service order` -> `order_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `repair_type`
--
-- Creation: Nov 27, 2023 at 04:22 AM
--

CREATE TABLE IF NOT EXISTS `repair_type` (
  `provider_id` int(11) NOT NULL,
  `repair_type` enum('"Nội thất"','"Đồ gia dụng"','"Dụng cụ nhà bếp"','"Vật dụng công nghệ"') NOT NULL,
  PRIMARY KEY (`provider_id`,`repair_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `repair_type`:
--   `provider_id`
--       `user_provider` -> `provider_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `service order`
--
-- Creation: Nov 27, 2023 at 03:53 AM
--

CREATE TABLE IF NOT EXISTS `service order` (
  `order_id` int(11) NOT NULL,
  `item_type` enum('"Nội thất"','"Đồ gia dụng"','"Dụng cụ nhà bếp"','"Vật dụng công nghệ"') NOT NULL,
  `specific_item` varchar(40) NOT NULL,
  `text_description` text NOT NULL,
  `image_description` varchar(40) NOT NULL,
  `province` varchar(40) NOT NULL,
  `district` varchar(40) NOT NULL,
  `town` varchar(40) NOT NULL,
  `street` varchar(50) NOT NULL,
  `time_range` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('"Đang xác nhận"','"Đã hủy"','"Đã hoàn thành"','"Đang chờ thực hiện"','"Xác thực hoàn tất"') NOT NULL,
  `customer_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `provider_id` (`provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `service order`:
--   `customer_id`
--       `user_customer` -> `customer_id`
--   `provider_id`
--       `user_provider` -> `provider_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_customer`
--
-- Creation: Nov 27, 2023 at 08:19 AM
--

CREATE TABLE IF NOT EXISTS `user_customer` (
  `customer_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(40) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user_customer`:
--

-- --------------------------------------------------------

--
-- Table structure for table `user_provider`
--
-- Creation: Nov 27, 2023 at 04:14 AM
--

CREATE TABLE IF NOT EXISTS `user_provider` (
  `provider_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` int(40) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `province` int(20) NOT NULL,
  `town` int(20) NOT NULL,
  `street` int(40) NOT NULL,
  PRIMARY KEY (`provider_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user_provider`:
--

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agreement`
--
ALTER TABLE `agreement`
  ADD CONSTRAINT `agreement_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `service order` (`order_id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `service order` (`order_id`);

--
-- Constraints for table `make`
--
ALTER TABLE `make`
  ADD CONSTRAINT `make_ibfk_1` FOREIGN KEY (`agreement_id`) REFERENCES `agreement` (`agreement_id`),
  ADD CONSTRAINT `make_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `service order` (`order_id`);

--
-- Constraints for table `receive`
--
ALTER TABLE `receive`
  ADD CONSTRAINT `receive_ibfk_1` FOREIGN KEY (`feedback_id`) REFERENCES `feedback` (`feedback_id`),
  ADD CONSTRAINT `receive_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `service order` (`order_id`);

--
-- Constraints for table `repair_type`
--
ALTER TABLE `repair_type`
  ADD CONSTRAINT `repair_type_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `user_provider` (`provider_id`);

--
-- Constraints for table `service order`
--
ALTER TABLE `service order`
  ADD CONSTRAINT `service order_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `user_customer` (`customer_id`),
  ADD CONSTRAINT `service order_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `user_provider` (`provider_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
