-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 11, 2021 at 06:11 AM
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
(64, 'admin telah logout', '2021-01-05 04:32:05'),
(65, 'admin telah login', '2021-01-05 05:52:17'),
(66, 'admin telah logout', '2021-01-05 05:52:21'),
(67, 'admin telah login', '2021-01-06 02:46:08'),
(68, 'admin telah logout', '2021-01-06 03:22:36'),
(69, 'admin telah login', '2021-01-06 03:24:32'),
(70, 'admin telah logout', '2021-01-06 03:24:39'),
(71, 'admin telah login', '2021-01-06 03:26:49'),
(72, 'admin telah logout', '2021-01-06 03:27:14'),
(73, 'admin telah login', '2021-01-06 03:27:17'),
(74, 'admin telah logout', '2021-01-06 03:51:58'),
(75, 'admin telah login', '2021-01-06 03:52:04'),
(76, 'admin telah logout', '2021-01-06 03:52:07'),
(77, 'admin telah login', '2021-01-06 03:52:10'),
(78, 'admin telah logout', '2021-01-06 03:53:07'),
(79, 'admin telah login', '2021-01-06 03:54:44'),
(80, 'admin telah logout', '2021-01-06 03:54:50'),
(81, 'admin telah login', '2021-01-06 03:58:36'),
(82, 'admin telah logout', '2021-01-06 04:10:22'),
(83, 'admin telah login', '2021-01-06 04:10:26'),
(84, 'admin telah logout', '2021-01-06 04:10:28'),
(85, 'admin telah login', '2021-01-06 04:10:45'),
(86, 'admin telah logout', '2021-01-06 04:11:25'),
(87, 'admin telah login', '2021-01-06 04:16:52'),
(88, 'admin telah logout', '2021-01-06 04:16:54'),
(89, 'admin telah login', '2021-01-06 04:17:09'),
(90, 'admin telah logout', '2021-01-06 04:17:12'),
(91, 'admin telah login', '2021-01-06 04:18:52'),
(92, 'admin telah logout', '2021-01-06 04:28:45'),
(93, 'admin telah login', '2021-01-06 04:28:48'),
(94, 'admin telah logout', '2021-01-06 05:27:52'),
(95, 'admin telah login', '2021-01-06 05:27:55'),
(96, 'admin Melihat User', '2021-01-06 05:35:55'),
(97, 'admin melihat User', '2021-01-06 05:36:11'),
(98, 'admin melihat user', '2021-01-06 05:36:53'),
(99, 'admin melihat user', '2021-01-06 05:37:26'),
(100, 'admin melihat user', '2021-01-06 05:40:48'),
(101, 'admin melihat user', '2021-01-06 05:40:51'),
(102, 'admin melihat user', '2021-01-06 05:42:45'),
(103, 'admin melihat user', '2021-01-06 05:42:48'),
(104, 'admin melihat user', '2021-01-06 05:43:54'),
(105, 'admin melihat user', '2021-01-06 05:44:33'),
(106, 'admin melihat user', '2021-01-06 05:44:36'),
(107, 'admin melihat user', '2021-01-06 05:44:44'),
(108, 'admin melihat user', '2021-01-06 05:46:13'),
(109, 'admin melihat user', '2021-01-06 05:46:36'),
(110, 'admin melihat user', '2021-01-06 05:46:38'),
(111, 'admin melihat user', '2021-01-06 05:46:44'),
(112, 'admin melihat user', '2021-01-06 05:46:47'),
(113, 'admin melihat user', '2021-01-06 05:46:49'),
(114, 'admin melihat user', '2021-01-06 05:46:50'),
(115, 'admin melihat user', '2021-01-06 05:47:45'),
(116, 'admin melihat user', '2021-01-06 05:48:36'),
(117, 'admin melihat user', '2021-01-06 05:48:48'),
(118, 'admin melihat user', '2021-01-06 07:36:46'),
(119, 'admin melihat user', '2021-01-06 07:36:53'),
(120, 'admin melihat user', '2021-01-06 07:36:56'),
(121, 'admin melihat user', '2021-01-06 07:36:59'),
(122, 'admin melihat user', '2021-01-06 07:37:27'),
(123, 'admin melihat user', '2021-01-06 07:37:28'),
(124, 'admin melihat user', '2021-01-06 09:56:27'),
(125, 'admin telah logout', '2021-01-06 09:56:31'),
(126, 'admin telah login', '2021-01-07 12:51:56'),
(127, 'admin telah logout', '2021-01-07 12:54:10'),
(128, 'admin telah login', '2021-01-07 01:16:15'),
(129, 'admin telah logout', '2021-01-07 01:20:27'),
(130, 'admin telah login', '2021-01-07 01:45:51'),
(131, 'admin telah logout', '2021-01-07 01:46:23'),
(132, 'admin telah login', '2021-01-07 02:18:36'),
(133, 'admin telah logout', '2021-01-07 02:18:40'),
(134, 'admin telah login', '2021-01-11 02:41:03'),
(135, 'admin telah logout', '2021-01-11 02:41:27'),
(136, 'admin telah login', '2021-01-11 03:16:56'),
(137, 'admin telah login', '2021-01-11 03:17:22'),
(138, 'admin telah login', '2021-01-11 03:20:43'),
(139, 'admin melihat user', '2021-01-11 03:20:52'),
(140, 'admin telah logout', '2021-01-11 03:20:57'),
(141, 'admin telah login', '2021-01-11 03:24:37'),
(142, 'admin melihat user', '2021-01-11 03:24:41'),
(143, 'admin melihat user', '2021-01-11 03:27:40'),
(144, 'admin melihat user', '2021-01-11 03:28:02'),
(145, 'admin melihat user', '2021-01-11 03:33:32'),
(146, 'admin melihat user', '2021-01-11 03:35:17'),
(147, 'admin melihat user', '2021-01-11 03:35:22'),
(148, 'admin melihat user', '2021-01-11 03:35:24'),
(149, 'admin melihat user', '2021-01-11 03:35:37'),
(150, 'admin melihat user', '2021-01-11 03:36:03'),
(151, 'admin melihat user', '2021-01-11 03:39:33'),
(152, 'admin melihat user', '2021-01-11 03:39:37'),
(153, 'admin melihat user', '2021-01-11 03:39:50'),
(154, 'admin melihat user', '2021-01-11 03:39:53'),
(155, 'admin melihat user', '2021-01-11 03:39:55'),
(156, 'admin melihat user', '2021-01-11 03:40:06'),
(157, 'admin melihat user', '2021-01-11 03:40:08'),
(158, 'admin melihat user', '2021-01-11 03:40:11'),
(159, 'admin melihat user', '2021-01-11 03:41:29'),
(160, 'admin melihat user', '2021-01-11 03:41:40'),
(161, 'admin melihat user', '2021-01-11 03:41:42'),
(162, 'admin melihat user', '2021-01-11 03:41:52'),
(163, 'admin melihat user', '2021-01-11 03:41:54'),
(164, 'admin melihat user', '2021-01-11 03:42:25'),
(165, 'admin melihat user', '2021-01-11 03:42:35'),
(166, 'admin melihat user', '2021-01-11 03:47:54'),
(167, 'admin melihat user', '2021-01-11 03:48:31'),
(168, 'admin melihat user', '2021-01-11 03:48:42'),
(169, 'admin melihat user', '2021-01-11 03:52:18'),
(170, 'admin melihat user', '2021-01-11 03:52:25'),
(171, 'admin melihat user', '2021-01-11 03:54:01'),
(172, 'admin melihat user', '2021-01-11 03:54:13'),
(173, 'admin melihat user', '2021-01-11 03:54:33'),
(174, 'admin melihat user', '2021-01-11 03:54:35'),
(175, 'admin melihat user', '2021-01-11 03:54:39'),
(176, 'admin melihat user', '2021-01-11 03:54:46'),
(177, 'admin melihat user', '2021-01-11 03:57:05'),
(178, 'admin melihat user', '2021-01-11 03:57:11'),
(179, 'admin melihat user', '2021-01-11 04:01:05'),
(180, 'admin melihat user', '2021-01-11 04:01:12'),
(181, 'admin melihat user', '2021-01-11 04:01:29'),
(182, 'admin melihat user', '2021-01-11 04:01:47'),
(183, 'admin melihat user', '2021-01-11 04:01:56'),
(184, 'admin melihat user', '2021-01-11 04:02:42'),
(185, 'admin melihat user', '2021-01-11 04:03:08'),
(186, 'admin melihat user', '2021-01-11 04:04:35'),
(187, 'admin melihat user', '2021-01-11 04:04:41'),
(188, 'admin melihat user', '2021-01-11 04:09:47'),
(189, 'admin melihat user', '2021-01-11 04:11:03'),
(190, 'admin melihat user', '2021-01-11 04:12:20'),
(191, 'admin melihat user', '2021-01-11 04:12:28'),
(192, 'admin melihat user', '2021-01-11 04:13:21'),
(193, 'admin melihat user', '2021-01-11 04:14:16'),
(194, 'admin melihat user', '2021-01-11 04:14:37'),
(195, 'admin telah logout', '2021-01-11 04:14:39'),
(196, 'admin telah login', '2021-01-11 04:39:22'),
(197, 'admin telah logout', '2021-01-11 04:39:25'),
(198, 'admin 3 telah login', '2021-01-11 04:39:43'),
(199, 'admin 3 telah logout', '2021-01-11 04:39:47'),
(200, 'admin telah login', '2021-01-11 04:39:59'),
(201, 'admin melihat user', '2021-01-11 04:40:20'),
(202, 'admin melihat user', '2021-01-11 04:40:38'),
(203, 'admin melihat user', '2021-01-11 04:41:19'),
(204, 'admin melihat user', '2021-01-11 04:41:24'),
(205, 'admin melihat user', '2021-01-11 04:42:06'),
(206, 'admin melihat user', '2021-01-11 04:42:12'),
(207, 'admin melihat user', '2021-01-11 04:43:15'),
(208, 'admin melihat user', '2021-01-11 04:45:42'),
(209, 'admin melihat user', '2021-01-11 04:46:16'),
(210, 'admin melihat user', '2021-01-11 04:47:37'),
(211, 'admin melihat user', '2021-01-11 04:47:43'),
(212, 'admin melihat user', '2021-01-11 04:52:49'),
(213, 'admin melihat user', '2021-01-11 04:55:45'),
(214, 'admin melihat user', '2021-01-11 04:55:49'),
(215, 'admin melihat user', '2021-01-11 04:56:12'),
(216, 'admin melihat user', '2021-01-11 04:56:30'),
(217, 'admin melihat user', '2021-01-11 04:56:35'),
(218, 'admin melihat user', '2021-01-11 04:57:43'),
(219, 'admin melihat user', '2021-01-11 04:57:47'),
(220, 'admin melihat user', '2021-01-11 06:03:14'),
(221, 'admin melihat user', '2021-01-11 06:03:19'),
(222, 'admin melihat user', '2021-01-11 06:06:45'),
(223, 'admin melihat user', '2021-01-11 06:06:50'),
(224, 'admin melihat user', '2021-01-11 06:07:27'),
(225, 'admin melihat user', '2021-01-11 06:07:30'),
(226, 'admin melihat user', '2021-01-11 06:07:32'),
(227, 'admin melihat user', '2021-01-11 06:07:48'),
(228, 'admin melihat user', '2021-01-11 06:07:53'),
(229, 'admin melihat user', '2021-01-11 06:09:02'),
(230, 'admin melihat user', '2021-01-11 06:09:11'),
(231, 'admin melihat user', '2021-01-11 06:09:15'),
(232, 'admin melihat user', '2021-01-11 06:09:19'),
(233, 'admin melihat user', '2021-01-11 06:09:21'),
(234, 'admin melihat user', '2021-01-11 06:09:24'),
(235, 'admin melihat user', '2021-01-11 06:10:15'),
(236, 'admin melihat user', '2021-01-11 06:10:49'),
(237, 'admin telah logout', '2021-01-11 06:11:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  `secret` varchar(64) NOT NULL,
  `url_qrcode` varchar(256) NOT NULL,
  `user_fullname` varchar(64) DEFAULT NULL,
  `user_funfact` varchar(256) DEFAULT NULL,
  `created_by` varchar(32) NOT NULL,
  `created_date` date NOT NULL,
  `updated_by` varchar(32) NOT NULL,
  `updated_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `secret`, `url_qrcode`, `user_fullname`, `user_funfact`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'admin', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'A3XPHVLXIM7A6DAZ', 'https://api.qrserver.com/v1/create-qr-code/?data=otpauth%3A%2F%2Ftotp%2FVue+Apps%3Fsecret%3DA3XPHVLXIM7A6DAZ&amp;size=200x200&amp;ecc=M', 'Admin', 'First User :D', 'admin', '2020-12-01', 'admin', '2021-01-11'),
(3, 'admin 3', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'CQUOA6T5QGWSN2OC', 'https://api.qrserver.com/v1/create-qr-code/?data=otpauth%3A%2F%2Ftotp%2FVue+Apps+1%3Fsecret%3DCQUOA6T5QGWSN2OC&size=200x200&ecc=M', 'Admin 3', 'ini punya admin 3', 'admin', '2021-01-11', 'admin', '2021-01-11');

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
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
