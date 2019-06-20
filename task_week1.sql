-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 20, 2019 at 11:19 AM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_week1`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `date`, `date_update`) VALUES
(12, 'yearly', '2019-06-18 09:52:42', '0000-00-00 00:00:00'),
(13, 'monthly', '2019-06-18 13:33:22', '0000-00-00 00:00:00'),
(14, 'daily', '2019-06-19 21:28:05', '2019-06-19 21:29:52');

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `id_note` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id_note`, `title`, `content`, `date`, `date_update`, `id_category`) VALUES
(6, 'tugas11', 'tugas harus selesai', '2019-06-18 20:23:49', '0000-00-00 00:00:00', 13),
(7, 'tugas1', 'harus selesai debelum dateline oke', '2019-06-18 20:53:25', '0000-00-00 00:00:00', 1),
(8, 'tugas13', 'harus selesai debelum dateline oke', '2019-06-19 10:52:12', '0000-00-00 00:00:00', 13),
(9, 'tugas5', 'harus selesai sebelum deadline oke', '2019-06-19 21:35:27', '2019-06-19 21:36:03', 14),
(11, 'tugas3', 'harus selesai sebelum deadline oke', '2019-06-19 21:15:24', '0000-00-00 00:00:00', 14),
(12, 'kuis1', '3 pertanyaan harus benar', '2019-06-20 10:10:04', '0000-00-00 00:00:00', 13),
(13, 'kuis2', '3 pertanyaan harus benar', '2019-06-20 10:11:01', '2019-06-20 10:11:01', 13),
(14, 'kuis7', '3 pertanyaan harus benar', '2019-06-20 10:11:28', '2019-06-20 10:11:28', 13),
(15, 'kuis4', '3 pertanyaan harus benar', '2019-06-20 10:11:40', '2019-06-20 10:11:40', 13),
(16, 'project1', 'deadline sudah mepet', '2019-06-20 10:12:29', '2019-06-20 10:12:29', 13),
(17, 'project3', 'deadline sudah mepet', '2019-06-20 10:12:37', '2019-06-20 10:12:37', 13),
(18, 'project2', 'deadline sudah mepet', '2019-06-20 10:13:21', '2019-06-20 10:13:21', 13),
(19, 'project8', 'deadline sudah mepet', '2019-06-20 10:13:28', '2019-06-20 10:13:28', 13),
(20, 'homework1', 'belum selesai', '2019-06-20 10:13:56', '2019-06-20 10:13:56', 13),
(21, 'homework3', 'sudah selesai', '2019-06-20 10:14:09', '2019-06-20 10:14:09', 13),
(22, 'homework5', 'sudah selesai', '2019-06-20 10:14:16', '2019-06-20 10:14:16', 13),
(23, 'ujian1', 'belajar mulai sekarang', '2019-06-20 12:48:18', '2019-06-20 12:48:18', 12),
(24, 'ujian2', 'belajar mulai besok sekarang', '2019-06-20 12:48:57', '2019-06-20 12:48:57', 12),
(25, 'ujian3', 'belajar mulai besok/sekarang', '2019-06-20 12:49:36', '2019-06-20 12:49:36', 14),
(26, 'exam3', 'i have to study hard', '2019-06-20 12:52:14', '2019-06-20 12:52:14', 14),
(27, 'exam4', 'i have studied hard ', '2019-06-20 12:54:23', '2019-06-20 12:54:23', 14),
(28, 'exam5', 'i have studied hard', '2019-06-20 12:54:23', '2019-06-20 12:54:23', 14),
(29, 'freelance1', 'i have done ', '2019-06-20 12:58:16', '2019-06-20 12:58:16', 12),
(30, 'freelance2', 'not yettttt', '2019-06-20 12:58:16', '2019-06-20 12:58:16', 12),
(31, 'freelance3', 'for next week', '2019-06-20 12:58:16', '2019-06-20 12:58:16', 12),
(32, 'freelance4', 'today must be finish', '2019-06-20 12:58:16', '2019-06-20 12:58:16', 12),
(33, 'freelance5', 'big project, i will do my best', '2019-06-20 12:58:16', '2019-06-20 12:58:16', 12),
(34, 'work1', 'i have done ', '2019-06-20 12:59:42', '2019-06-20 12:59:42', 12),
(35, 'work2', 'not yettttt', '2019-06-20 12:59:42', '2019-06-20 12:59:42', 12),
(36, 'work3', 'for tomorrow', '2019-06-20 12:59:42', '2019-06-20 12:59:42', 12),
(37, 'work4', 'today must be finish', '2019-06-20 12:59:42', '2019-06-20 12:59:42', 12),
(38, 'work5', 'i will do my best', '2019-06-20 12:59:42', '2019-06-20 12:59:42', 12),
(39, 'freelance1', 'i have done ', '2019-06-20 12:58:16', '2019-06-20 12:58:16', 12),
(40, 'freelance1', 'i have done ', '2019-06-20 12:58:16', '2019-06-20 12:58:16', 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id_note`),
  ADD KEY `id_ctg` (`id_category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id_note` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
