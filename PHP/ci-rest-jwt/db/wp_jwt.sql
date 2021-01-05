-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 05, 2021 at 05:39 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wp_jwt`
--

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `log_id` int(11) NOT NULL,
  `log_msg` varchar(255) NOT NULL,
  `log_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`log_id`, `log_msg`, `log_date`) VALUES
(6, 'admin telah login', '2020-12-16 02:30:26'),
(7, 'admin telah logout', '2020-12-16 02:39:52'),
(8, 'admin telah login', '2020-12-16 02:40:53'),
(9, 'admin telah logout', '2020-12-16 02:40:57'),
(10, 'admin telah login', '2020-12-16 02:42:36'),
(11, 'admin telah logout', '2020-12-16 02:42:40'),
(12, 'admin telah login', '2020-12-16 02:44:55'),
(13, 'admin telah logout', '2020-12-16 02:45:26'),
(14, 'admin1 telah login', '2020-12-16 02:45:31'),
(15, 'admin telah login', '2020-12-16 09:29:14'),
(16, 'admin telah login', '2021-01-05 01:31:31'),
(17, 'admin telah logout', '2021-01-05 02:11:53'),
(18, 'admin telah login', '2021-01-05 02:14:18'),
(19, 'admin telah logout', '2021-01-05 02:19:35'),
(20, 'admin telah login', '2021-01-05 02:20:27'),
(21, 'admin telah logout', '2021-01-05 02:20:36'),
(22, 'admin telah login', '2021-01-05 02:22:50'),
(23, 'admin telah logout', '2021-01-05 02:22:53'),
(24, 'admin telah login', '2021-01-05 02:25:55'),
(25, 'admin telah logout', '2021-01-05 02:25:58'),
(26, 'admin telah login', '2021-01-05 02:26:31'),
(27, 'admin telah logout', '2021-01-05 02:26:35'),
(28, 'admin telah login', '2021-01-05 02:28:15'),
(29, 'admin telah logout', '2021-01-05 02:28:18'),
(30, 'admin telah login', '2021-01-05 02:28:42'),
(31, 'admin telah logout', '2021-01-05 02:28:45'),
(32, 'admin telah login', '2021-01-05 02:32:08'),
(33, 'admin telah logout', '2021-01-05 02:32:11'),
(34, 'admin telah logout', '2021-01-05 02:32:46'),
(35, 'admin telah login', '2021-01-05 02:35:40'),
(36, 'admin telah logout', '2021-01-05 02:35:43'),
(37, 'admin telah login', '2021-01-05 02:36:15'),
(38, 'admin telah logout', '2021-01-05 02:36:21'),
(39, 'admin telah login', '2021-01-05 02:36:50'),
(40, 'admin telah logout', '2021-01-05 02:36:53'),
(41, 'admin telah login', '2021-01-05 02:37:35'),
(42, 'admin telah logout', '2021-01-05 02:37:38'),
(43, 'admin telah login', '2021-01-05 02:37:47'),
(44, 'admin telah logout', '2021-01-05 02:37:50'),
(45, 'admin telah login', '2021-01-05 02:38:50'),
(46, 'admin telah logout', '2021-01-05 03:48:15'),
(47, 'admin telah login', '2021-01-05 03:48:18'),
(48, 'admin telah logout', '2021-01-05 03:57:14'),
(49, 'admin telah login', '2021-01-05 03:57:17'),
(50, 'admin telah logout', '2021-01-05 04:10:24'),
(51, 'admin telah login', '2021-01-05 04:17:14'),
(52, 'admin telah logout', '2021-01-05 04:22:43'),
(53, 'admin telah login', '2021-01-05 04:22:46'),
(54, 'admin telah logout', '2021-01-05 04:23:44'),
(55, 'admin telah login', '2021-01-05 04:23:47'),
(56, 'admin telah logout', '2021-01-05 04:23:54'),
(57, 'admin telah login', '2021-01-05 04:24:35'),
(58, 'admin telah logout', '2021-01-05 04:24:47'),
(59, 'admin telah login', '2021-01-05 04:24:50'),
(60, 'admin telah logout', '2021-01-05 04:25:19'),
(61, 'admin telah login', '2021-01-05 04:25:23'),
(62, 'admin telah logout', '2021-01-05 04:31:58'),
(63, 'admin telah login', '2021-01-05 04:32:01'),
(64, 'admin telah logout', '2021-01-05 04:32:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(2, 'admin1', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
