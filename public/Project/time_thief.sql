-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-04-26 17:12:49
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.2.29

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
-- 資料表結構 `cards_list`
--

DROP TABLE IF EXISTS `cards_list`;
CREATE TABLE IF NOT EXISTS `cards_list` (
  `diamond_card` varchar(36) NOT NULL,
  `password` varchar(24) NOT NULL,
  `state` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`diamond_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `cards_list`
--

INSERT INTO `cards_list` (`diamond_card`, `password`, `state`) VALUES
('015a96c6-3586-4fe0-9d18-37a8df2edc5b', '5ea3c15633a9809fa2e8de4d', 0),
('09d05517-fde4-4505-b5ed-7fa6b2dfed01', '5ea3c1562cb4fc244b76bf39', 1),
('1c7f5128-f406-4565-bb87-c69b5b92a893', '5ea3c156d4a4bea6ef4fcf61', 1),
('1e6833f4-7568-4ad4-a39f-ef7f16c2eeda', '5ea3c156909169f0a868de37', 1),
('239aea7e-fd82-47dd-b2bb-1f6e651af07a', '5ea3c156e838b58e22535ea4', 1),
('2b7cd161-bf3e-47d7-af49-5fdbbf8d4cc1', '5ea3c156637b61491bb4a0e6', 1),
('3cd1e274-ecbd-4175-a354-40b7cd7d33f1', '5ea3c1562d50030191a1e88c', 1),
('4b3dbb89-3c6a-436c-b720-cbc4720a4373', '5ea3c156a40827cc37b19442', 1),
('4c1a5bba-a602-43ab-bcdc-01e83323a21c', '5ea3c156f5e95150757a83c8', 1),
('5b5d98ae-dc97-44a6-ab24-298a131cc00d', '5ea3c1564362e0bbe8baeb19', 1),
('5f18e9b4-bb3d-4cfe-80c4-1e48ab8704a4', '5ea3c1566a90a1079812ea5b', 1),
('65eec8ea-4380-4a16-a631-2e0252b606ef', '5ea3c156fddb6b07ec4ca406', 1),
('6bf0f899-29d3-4708-8ab6-acc1b7154e71', '5ea3c156b6de50dadbe7f641', 1),
('7814e1bb-c0e2-4198-bb65-8e358885c669', '5ea3c1569e824ebd9ea792b5', 1),
('78dc3632-013d-4aec-b475-6d04f13e7a7c', '5ea3c156568fac4c3fcf3dd4', 1),
('7b257116-8d4f-4cac-a90c-b5ee18b34f9e', '5ea3c1565931596398bcc0c3', 1),
('7d9d5438-23c2-470a-bdb7-54577737f77a', '5ea3c1561ddd3b2d25ed2269', 1),
('7deb2cfb-a058-4ef0-8f1e-02210a92ecdb', '5ea3c1566d45254d066d1fbf', 1),
('82b18136-749f-4531-bbcd-88fd43b3ab09', '5ea3c1560848837759af02ac', 1),
('8c7e9e39-7d39-43b0-9fcc-f787118ff44e', '5ea3c1561842295092baf8a0', 1),
('9491b812-10bb-46be-a4bd-9061b1e58728', '5ea3c156f371564952ea4158', 1),
('a57774d2-a0cd-464b-9010-2a3c888374ae', '5ea3c156394ee16d75b03e46', 1),
('b680862e-26fe-4903-a95e-13f0c094ca4c', '5ea3c156cb3ffcb758fab1ba', 1),
('c314572f-5e76-4340-924d-d95604c19a8a', '5ea3c15658874266635700a3', 1),
('c6a48509-733f-4420-b6b8-37ff374cfd95', '5ea3c1564f553cf924f549ac', 1),
('dca019d5-7474-4e8c-aafc-7aac2eaad808', '5ea3c156e96f78d495c6a371', 1),
('ea5b2909-5feb-49fc-aff6-b6f8b80e48c5', '5ea3c15633fad7a653d5b5e2', 1),
('f6e1958e-bb31-4767-a0a5-c7ddd948b2c5', '5ea3c156235428e53bfdbbb9', 1),
('f795ae05-c321-47f2-9742-863f4b00cd00', '5ea3c1565009fd44ecc3009b', 1),
('fd375dc2-5369-49a3-a280-0dd0d6f267b6', '5ea3c156c22231429dd5ded7', 1);

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
-- 資料表結構 `diamond`
--

DROP TABLE IF EXISTS `diamond`;
CREATE TABLE IF NOT EXISTS `diamond` (
  `uid` int(10) NOT NULL,
  `modified_date` int(10) NOT NULL DEFAULT current_timestamp(),
  `amount` int(10) NOT NULL,
  `diamond_card` varchar(36) NOT NULL,
  `the_rest` int(10) NOT NULL,
  PRIMARY KEY (`diamond_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `diamond`
--

INSERT INTO `diamond` (`uid`, `modified_date`, `amount`, `diamond_card`, `the_rest`) VALUES
(21, 1587791843, 200, '015a96c6-3586-4fe0-9d18-37a8df2edc5b', 200);

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
(21, 2, 2, 207, 200, 0, 1, 0);

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
  `item_id` int(5) NOT NULL,
  `product_id` varchar(10) NOT NULL,
  `product_price` int(5) NOT NULL,
  `product_n` int(10) NOT NULL,
  `state` varchar(10) NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `name` varchar(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `paid` varchar(1) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`order_id`)
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
