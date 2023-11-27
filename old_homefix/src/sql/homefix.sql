-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 18, 2023 at 04:18 AM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`` PROCEDURE `getmoney` (IN `input_wid` INT)   BEGIN
    select money from user where id=input_wid;
END$$

CREATE DEFINER=`` PROCEDURE `myappliedrequest` (IN `input_uid` INT)   BEGIN
    select * from request r1 where r1.id in (select a1.rid from apply_on a1  where a1.wid=input_uid);
END$$

CREATE DEFINER=`` PROCEDURE `newrequest` (IN `input_uid` INT(11))   BEGIN
    SELECT * FROM request r1 
    WHERE r1.id NOT IN (SELECT rid FROM working) 
    AND r1.id NOT IN (SELECT rid FROM apply_on WHERE apply_on.wid = input_uid);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `apply_on`
--

CREATE TABLE `apply_on` (
  `rid` int(11) NOT NULL,
  `wid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `apply_on`
--

INSERT INTO `apply_on` (`rid`, `wid`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `rcost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `rcost`) VALUES
(1, 10000),
(2, 15000),
(3, 20000),
(4, 17000),
(14, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Password` varchar(20) DEFAULT NULL,
  `money` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Password`, `money`) VALUES
(1, 'a', 20000),
(2, 'a', 30000);

-- --------------------------------------------------------

--
-- Table structure for table `working`
--

CREATE TABLE `working` (
  `rid` int(11) NOT NULL,
  `wid` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apply_on`
--
ALTER TABLE `apply_on`
  ADD PRIMARY KEY (`rid`,`wid`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `working`
--
ALTER TABLE `working`
  ADD PRIMARY KEY (`rid`,`wid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
