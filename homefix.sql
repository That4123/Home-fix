-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 11:19 AM
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

CREATE TABLE `agreement` (
  `agreement_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `time_schedule` datetime NOT NULL,
  `order_id` int(11) NOT NULL
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

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `rate` smallint(6) NOT NULL,
  `comment` text NOT NULL,
  `order_id` int(11) NOT NULL
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

CREATE TABLE `make` (
  `order_id` int(11) NOT NULL,
  `agreement_id` int(11) NOT NULL
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

CREATE TABLE `receive` (
  `order_id` int(11) NOT NULL,
  `feedback_id` int(11) NOT NULL
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

CREATE TABLE `repair_type` (
  `provider_id` int(11) NOT NULL,
  `repair_type` enum('"Nội thất"','"Đồ gia dụng"','"Dụng cụ nhà bếp"','"Vật dụng công nghệ"') NOT NULL
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
-- Creation: Nov 27, 2023 at 09:05 AM
--

CREATE TABLE `service order` (
  `order_id` int(11) NOT NULL,
  `item_type` enum('"Nội thất"','"Đồ gia dụng"','"Dụng cụ nhà bếp"','"Vật dụng công nghệ"') NOT NULL,
  `specific_item` varchar(40) NOT NULL,
  `text_description` text NOT NULL,
  `image_description` varchar(40) NOT NULL,
  `province` varchar(40) NOT NULL,
  `district` varchar(40) NOT NULL,
  `town` varchar(40) NOT NULL,
  `street` varchar(50) NOT NULL,
  `time_range` datetime NOT NULL,
  `status` enum('"Đang xác nhận"','"Đã hủy"','"Đã hoàn thành"','"Đang chờ thực hiện"','"Xác thực hoàn tất"') NOT NULL,
  `customer_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL
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
-- Creation: Nov 27, 2023 at 10:14 AM
-- Last update: Nov 27, 2023 at 10:15 AM
--

CREATE TABLE `user_customer` (
  `customer_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(40) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user_customer`:
--

--
-- Dumping data for table `user_customer`
--

INSERT INTO `user_customer` (`customer_id`, `user_name`, `password`, `name`, `balance`) VALUES
(0, 'customer1', '$2b$10$LmHWQ8e/4zG1lhc6LJtVZOYEzRPw86fgOpuj7/GBJFwNAQ4AXOQkK', '', 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `user_provider`
--
-- Creation: Nov 27, 2023 at 10:14 AM
-- Last update: Nov 27, 2023 at 10:14 AM
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
  `street` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user_provider`:
--

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
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `make`
--
ALTER TABLE `make`
  ADD PRIMARY KEY (`order_id`,`agreement_id`);

--
-- Indexes for table `receive`
--
ALTER TABLE `receive`
  ADD PRIMARY KEY (`order_id`,`feedback_id`);

--
-- Indexes for table `repair_type`
--
ALTER TABLE `repair_type`
  ADD PRIMARY KEY (`provider_id`,`repair_type`);

--
-- Indexes for table `service order`
--
ALTER TABLE `service order`
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
-- Metadata for table service order
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
