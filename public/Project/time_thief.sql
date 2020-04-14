-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-04-14 10:20:12
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (IN `acc` VARCHAR(50), IN `pas` VARCHAR(20), IN `bir` INT(10), IN `coun` VARCHAR(8), IN `are` VARCHAR(5), IN `de` VARCHAR(30), IN `na` VARCHAR(10), IN `ge` VARCHAR(2), IN `ph` INT(10), IN `mo` INT(10))  BEGIN
    
    insert into member_ID (account)
    values ( acc );

    insert into member_list (account, pass, birth)
    values (acc, md5(pas), bir);

    insert into contact (account, name, gender, phone, mobile)
    values(acc, na, ge, ph, mo);

    insert into address (uid, country, area, detail)
    values( (select uid from member_id
	where account = acc), coun , are, de);
    
    INSERT INTO `myself` (`uid`) VALUES (
    (select uid from member_id
    where account = acc)
    );
        INSERT INTO `creatureskill` (`uid`) VALUES (
    (select uid from member_id
    where account = acc)
    );
    
    END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `uid` int(10) NOT NULL,
  `country` varchar(5) NOT NULL,
  `area` varchar(8) NOT NULL,
  `detail` varchar(30) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `address`
--

INSERT INTO `address` (`uid`, `country`, `area`, `detail`) VALUES
(21, '0', '0', '資策會');

-- --------------------------------------------------------

--
-- 資料表結構 `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `account` varchar(50) NOT NULL,
  `name` varchar(10) NOT NULL,
  `gender` varchar(2) NOT NULL DEFAULT '先生',
  `phone` int(10) NOT NULL,
  `mobile` int(10) NOT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `contact`
--

INSERT INTO `contact` (`account`, `name`, `gender`, `phone`, `mobile`) VALUES
('developer@test.com', '創建者', '女士', 212345678, 912345678);

-- --------------------------------------------------------

--
-- 資料表結構 `creatureskill`
--

DROP TABLE IF EXISTS `creatureskill`;
CREATE TABLE IF NOT EXISTS `creatureskill` (
  `uid` int(10) NOT NULL,
  `yellow` int(5) NOT NULL DEFAULT 0,
  `purple` int(5) NOT NULL DEFAULT 0,
  `blue` int(5) NOT NULL DEFAULT 0,
  `orange` int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `creatureskill`
--

INSERT INTO `creatureskill` (`uid`, `yellow`, `purple`, `blue`, `orange`) VALUES
(21, 0, 0, 0, 0);

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `member_id`
--

INSERT INTO `member_id` (`uid`, `account`) VALUES
(21, 'developer@test.com');

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

--
-- 傾印資料表的資料 `member_list`
--

INSERT INTO `member_list` (`account`, `pass`, `birth`, `add_date`) VALUES
('developer@test.com', '161ebd7d45089b3446ee4e0d86dbcf92', 716169600, 2147483647);

-- --------------------------------------------------------

--
-- 資料表結構 `myself`
--

DROP TABLE IF EXISTS `myself`;
CREATE TABLE IF NOT EXISTS `myself` (
  `uid` int(10) NOT NULL,
  `lv` int(5) NOT NULL DEFAULT 1,
  `stage` int(10) NOT NULL DEFAULT 1,
  `coin` int(10) NOT NULL DEFAULT 0,
  `diamond` int(10) DEFAULT 0,
  `sk_A` int(5) NOT NULL DEFAULT 0,
  `sk_B` int(5) NOT NULL DEFAULT 0,
  `achievement` int(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `myself`
--

INSERT INTO `myself` (`uid`, `lv`, `stage`, `coin`, `diamond`, `sk_A`, `sk_B`, `achievement`) VALUES
(21, 3, 8, 0, 0, 1, 1, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `order_list`
--

DROP TABLE IF EXISTS `order_list`;
CREATE TABLE IF NOT EXISTS `order_list` (
  `no` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `purchase_date` int(10) NOT NULL,
  `date_limit` int(10) NOT NULL,
  `item_id` int(5) NOT NULL,
  `product_id` varchar(10) NOT NULL,
  `product_price` int(5) NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `pay_date` int(10) NOT NULL,
  `method_pay` varchar(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `state_change`
--

DROP TABLE IF EXISTS `state_change`;
CREATE TABLE IF NOT EXISTS `state_change` (
  `user` varchar(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `change_date` int(10) NOT NULL,
  `after_state` varchar(10) NOT NULL,
  PRIMARY KEY (`change_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `transfer`
--

DROP TABLE IF EXISTS `transfer`;
CREATE TABLE IF NOT EXISTS `transfer` (
  `uid` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `method_transfer` varchar(10) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
