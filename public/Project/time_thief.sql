-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-04-13 14:47:11
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `time_thief`
--
CREATE DATABASE IF NOT EXISTS `time_thief` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `time_thief`;

DELIMITER $$
--
-- 程序
--
DROP PROCEDURE IF EXISTS `register`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (`acc` VARCHAR(50), `pas` VARCHAR(20), `bir` INT(10), `coun` VARCHAR(8), `are` VARCHAR(5), `de` VARCHAR(30), `na` VARCHAR(10), `ge` VARCHAR(2), `ph` INT(10), `mo` INT(10))  BEGIN
    
    insert into member_ID (account)
    values ( acc );

    insert into member_list (account, pass, birth)
    values (acc, md5(pas), bir);

    insert into address (country, area, detail)
    values( coun , are, de);

    insert into contact (account, name, gender, phone, mobile)
    values(acc, na, ge, ph, mo);

    UPDATE address set uid =
    (select uid from member_id
    where account = acc)
    ORDER BY uid DESC LIMIT 1;
    
    END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `country` varchar(5) NOT NULL,
  `area` varchar(8) NOT NULL,
  `detail` varchar(30) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `account` varchar(50) NOT NULL,
  `name` varchar(10) NOT NULL,
  `gender` varchar(2) NOT NULL,
  `phone` int(10) NOT NULL,
  `mobile` int(10) NOT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `member_id`
--

DROP TABLE IF EXISTS `member_id`;
CREATE TABLE IF NOT EXISTS `member_id` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `member_list`
--

DROP TABLE IF EXISTS `member_list`;
CREATE TABLE IF NOT EXISTS `member_list` (
  `account` varchar(50) NOT NULL,
  `pass` varchar(32) NOT NULL,
  `birth` int(10) DEFAULT NULL,
  `add_date` int(10) NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
