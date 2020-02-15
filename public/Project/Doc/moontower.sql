-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.8-MariaDB
-- PHP 版本： 7.3.11

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `moontower`
--
CREATE DATABASE IF NOT EXISTS `moontower` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `moontower`;

-- --------------------------------------------------------

--
-- 資料表結構 `acps`
--
-- 建立時間： 
--

DROP TABLE IF EXISTS `acps`;
CREATE TABLE `acps` (
  `account` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的關聯 `acps`:
--

--
-- 傾印資料表的資料 `acps`
--

INSERT INTO `acps` (`account`, `password`) VALUES
('Test0215', '20200215');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--
-- 建立時間： 
--

DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `member` int(11) NOT NULL,
  `account` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的關聯 `member`:
--

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`member`, `account`) VALUES
(1, 'Test0215');

-- --------------------------------------------------------

--
-- 資料表結構 `myself`
--
-- 建立時間： 
--

DROP TABLE IF EXISTS `myself`;
CREATE TABLE `myself` (
  `id` int(10) NOT NULL,
  `heroLv` int(5) NOT NULL,
  `heroSkLv_A` int(11) NOT NULL,
  `heroSkLv_B` int(11) NOT NULL,
  `heroSkLv_C` int(11) NOT NULL,
  `coin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的關聯 `myself`:
--

--
-- 傾印資料表的資料 `myself`
--

INSERT INTO `myself` (`id`, `heroLv`, `heroSkLv_A`, `heroSkLv_B`, `heroSkLv_C`, `coin`) VALUES
(1, 20, 2, 6, 7, 20);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `acps`
--
ALTER TABLE `acps`
  ADD PRIMARY KEY (`account`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member`);

--
-- 資料表索引 `myself`
--
ALTER TABLE `myself`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


--
-- 元資料
--
USE `phpmyadmin`;

--
-- 資料表 acps 的元資料
--

--
-- 資料表 member 的元資料
--

--
-- 資料表 myself 的元資料
--

--
-- 資料庫 moontower 的元資料
--
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
