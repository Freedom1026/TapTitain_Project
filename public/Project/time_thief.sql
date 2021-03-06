-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-05-07 10:48:36
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
DROP PROCEDURE IF EXISTS `atmF`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `atmF` (IN `iuid` INT(10), IN `ioid` INT(10), IN `iidx` INT(10), IN `psum` INT(10), IN `brands` VARCHAR(60), IN `isendto` VARCHAR(60), IN `rece` VARCHAR(10), IN `pho` INT(10), IN `mob` INT(10))  NO SQL
BEGIN

INSERT INTO payment (name, order_id, iid, amount)
VALUES ((SELECT name
        FROM member_id, contact
        WHERE member_id.uid = iuid AND
        member_id.account = contact.account)
        , ioid, iidx, psum);
INSERT INTO transfer (uid, order_id, iid, method_transfer, sendto, receiver, phone, mobile)
VALUES (iuid, ioid, iidx, brands, isendto, rece, pho, mob);

END$$

DROP PROCEDURE IF EXISTS `cstoreF`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cstoreF` (IN `iuid` INT(10), IN `ioid` INT(10), IN `iidx` INT(10), IN `brands` VARCHAR(10), IN `isendto` VARCHAR(60), IN `rece` VARCHAR(10), IN `pho` INT(10), IN `mob` INT(10))  BEGIN

INSERT INTO transfer (uid, order_id, iid, method_transfer, sendto, receiver, phone, mobile)
VALUES (iuid, ioid, iidx, brands, isendto,rece, pho, mob);

END$$

DROP PROCEDURE IF EXISTS `dataM`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dataM` (IN `iuid` INT(10))  BEGIN
	SELECT name, phone, mobile, country, area, detail, contact.account
    FROM contact, address, (
    SELECT account
        FROM member_id
        WHERE uid = iuid
    ) as tf
    WHERE contact.account = tf.account AND address.uid = iuid;
END$$

DROP PROCEDURE IF EXISTS `deposit`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deposit` (IN `iacc` VARCHAR(50), IN `cardid` VARCHAR(36))  BEGIN
	UPDATE cards_list SET state = 0
    WHERE diamond_card = cardid;
    
	UPDATE myself SET diamond = (
        SELECT form.rest
        FROM(
             SELECT(diamond + 200) as rest
             FROM myself, member_id
             WHERE member_id.uid = myself.uid
                                     AND
             member_id.account = iacc
             ) as form
    							)
                                
	WHERE uid = ( SELECT form.ud
          FROM(
               SELECT myself.uid as ud
               FROM myself, member_id
               WHERE member_id.uid = myself.uid
                                     AND
                        member_id.account = iacc
               ) as form
    			);

INSERT INTO diamond (uid, diamond_card, modified_date, the_rest)
VALUES (
( SELECT form.ud
          FROM(
               SELECT myself.uid as ud
               FROM myself, member_id
               WHERE member_id.uid = myself.uid
                                     AND
                        member_id.account = iacc
               ) as form
    			),
    cardid, unix_timestamp(CURRENT_TIMESTAMP),(
        SELECT form.diamond
        FROM(
             SELECT diamond
             FROM myself, member_id
             WHERE member_id.uid = myself.uid
                                     AND
             member_id.account = iacc
             ) as form
    							)
);

END$$

DROP PROCEDURE IF EXISTS `orderF`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderF` (IN `iuid` INT(10), IN `pname` VARCHAR(10), IN `pprice` INT(10), IN `pamount` INT(10), IN `iindex` INT(10), IN `ifee` INT(10), IN `istate` VARCHAR(10))  BEGIN
	INSERT INTO order_list (purchase_date, order_id, uid, item_id, product_name, product_price, product_n, fee, state)
    VALUES (unix_timestamp(CURRENT_TIMESTAMP), NULL, iuid, iindex, pname, pprice, pamount, ifee, istate);
    SELECT LAST_INSERT_ID();
END$$

DROP PROCEDURE IF EXISTS `register`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (IN `acc` VARCHAR(50), IN `pas` VARCHAR(20), IN `bir` INT(10), IN `coun` VARCHAR(8), IN `are` VARCHAR(5), IN `de` VARCHAR(30), IN `na` VARCHAR(10), IN `ge` VARCHAR(2), IN `ph` INT(10), IN `mo` INT(10))  BEGIN
    
    insert into member_ID (account)
    values ( acc );

    insert into member_list (account, pass, birth)
    values (acc, md5(pas), bir, unix_timestamp(CURRENT_TIMESTAMP));

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

DROP PROCEDURE IF EXISTS `validTB`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `validTB` (IN `dmdc` VARCHAR(36), IN `pas` VARCHAR(24))  BEGIN
	SELECT COUNT(*) as n, ifnull(diamond_card,'nothing') as diamond_card
    FROM cards_list
    WHERE cards_list.diamond_card = dmdc
    	AND
    	cards_list.password = pas
        AND
        state = 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `address`
--
-- 建立時間： 2020-05-04 02:27:43
-- 最後更新： 2020-05-07 08:28:45
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
-- 資料表的關聯 `address`:
--

--
-- 傾印資料表的資料 `address`
--

INSERT INTO `address` (`uid`, `country`, `area`, `detail`) VALUES
(21, '桃園市', '觀音區', '資策會'),
(27, '臺中市', '西屯區', '資策會'),
(28, '臺中市', '南屯區', '公益路二段51號');

-- --------------------------------------------------------

--
-- 資料表結構 `cards_list`
--
-- 建立時間： 2020-05-04 02:27:43
-- 最後更新： 2020-05-07 08:48:14
--

DROP TABLE IF EXISTS `cards_list`;
CREATE TABLE IF NOT EXISTS `cards_list` (
  `diamond_card` varchar(36) NOT NULL,
  `password` varchar(24) NOT NULL,
  `state` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`diamond_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的關聯 `cards_list`:
--

--
-- 傾印資料表的資料 `cards_list`
--

INSERT INTO `cards_list` (`diamond_card`, `password`, `state`) VALUES
('015a96c6-3586-4fe0-9d18-37a8df2edc5b', '5ea3c15633a9809fa2e8de4d', 1),
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
-- 建立時間： 2020-05-04 02:27:44
-- 最後更新： 2020-05-07 08:26:23
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
-- 資料表的關聯 `contact`:
--

--
-- 傾印資料表的資料 `contact`
--

INSERT INTO `contact` (`account`, `name`, `gender`, `phone`, `mobile`) VALUES
('developer@test.com', '創建者', '女士', 2147483647, 912345678),
('Helloworld@test.com', '測試員', '先生', 12345689, 912345678),
('newMember@test.com', '新成員', '先生', 123456789, 912345678);

-- --------------------------------------------------------

--
-- 資料表結構 `creatureskill`
--
-- 建立時間： 2020-05-04 02:27:44
-- 最後更新： 2020-05-07 08:26:23
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
-- 資料表的關聯 `creatureskill`:
--

--
-- 傾印資料表的資料 `creatureskill`
--

INSERT INTO `creatureskill` (`uid`, `yellow`, `purple`, `blue`, `orange`) VALUES
(21, 2, 0, 1, 0),
(27, 0, 0, 0, 0),
(28, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `diamond`
--
-- 建立時間： 2020-05-04 02:27:44
-- 最後更新： 2020-05-07 08:48:00
--

DROP TABLE IF EXISTS `diamond`;
CREATE TABLE IF NOT EXISTS `diamond` (
  `uid` int(10) NOT NULL,
  `modified_date` int(10) NOT NULL,
  `amount` int(10) NOT NULL DEFAULT 200,
  `diamond_card` varchar(36) NOT NULL,
  `the_rest` int(10) NOT NULL,
  PRIMARY KEY (`diamond_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的關聯 `diamond`:
--

-- --------------------------------------------------------

--
-- 資料表結構 `member_id`
--
-- 建立時間： 2020-05-04 02:27:44
-- 最後更新： 2020-05-07 08:26:23
--

DROP TABLE IF EXISTS `member_id`;
CREATE TABLE IF NOT EXISTS `member_id` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

--
-- 資料表的關聯 `member_id`:
--

--
-- 傾印資料表的資料 `member_id`
--

INSERT INTO `member_id` (`uid`, `account`) VALUES
(21, 'developer@test.com'),
(27, 'Helloworld@test.com'),
(28, 'newMember@test.com');

-- --------------------------------------------------------

--
-- 資料表結構 `member_list`
--
-- 建立時間： 2020-05-04 02:27:45
-- 最後更新： 2020-05-07 08:26:23
--

DROP TABLE IF EXISTS `member_list`;
CREATE TABLE IF NOT EXISTS `member_list` (
  `account` varchar(50) NOT NULL,
  `pass` varchar(32) NOT NULL,
  `birth` int(10) DEFAULT NULL,
  `add_date` int(10) DEFAULT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的關聯 `member_list`:
--

--
-- 傾印資料表的資料 `member_list`
--

INSERT INTO `member_list` (`account`, `pass`, `birth`, `add_date`) VALUES
('developer@test.com', '161ebd7d45089b3446ee4e0d86dbcf92', 716169600, 2147483647),
('Helloworld@test.com', '0b91a08ebe8c9081002a045d27d6c9b9', 716169600, 2147483647),
('newMember@test.com', 'e0ea52df79cff14dd980e44c062bacd7', 716169600, 2147483647);

-- --------------------------------------------------------

--
-- 資料表結構 `myself`
--
-- 建立時間： 2020-05-04 02:27:45
-- 最後更新： 2020-05-07 08:39:21
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
-- 資料表的關聯 `myself`:
--

--
-- 傾印資料表的資料 `myself`
--

INSERT INTO `myself` (`uid`, `lv`, `stage`, `coin`, `diamond`, `sk_A`, `sk_B`, `achievement`) VALUES
(21, 11, 8, 2184, 410, 0, 2, 0),
(27, 1, 1, 0, 0, 0, 0, 0),
(28, 1, 1, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `order_list`
--
-- 建立時間： 2020-05-07 07:49:14
-- 最後更新： 2020-05-07 08:29:50
--

DROP TABLE IF EXISTS `order_list`;
CREATE TABLE IF NOT EXISTS `order_list` (
  `uid` int(10) NOT NULL,
  `order_id` int(10) NOT NULL AUTO_INCREMENT,
  `purchase_date` int(10) NOT NULL,
  `item_id` int(5) NOT NULL,
  `product_name` varchar(10) NOT NULL,
  `product_price` int(5) NOT NULL,
  `product_n` int(10) NOT NULL,
  `fee` int(10) DEFAULT NULL,
  `state` varchar(10) NOT NULL,
  PRIMARY KEY (`order_id`,`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- 資料表的關聯 `order_list`:
--

--
-- 傾印資料表的資料 `order_list`
--

INSERT INTO `order_list` (`uid`, `order_id`, `purchase_date`, `item_id`, `product_name`, `product_price`, `product_n`, `fee`, `state`) VALUES
(21, 1, 1588840190, 0, '布布徽章', 81, 2, 200, '待付款');

-- --------------------------------------------------------

--
-- 資料表結構 `payment`
--
-- 建立時間： 2020-05-07 07:49:31
-- 最後更新： 2020-05-07 08:29:50
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `name` varchar(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `iid` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `paid` varchar(1) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`order_id`,`iid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的關聯 `payment`:
--

--
-- 傾印資料表的資料 `payment`
--

INSERT INTO `payment` (`name`, `order_id`, `iid`, `amount`, `paid`) VALUES
('創建者', 1, 0, 162, 'n');

-- --------------------------------------------------------

--
-- 資料表結構 `transfer`
--
-- 建立時間： 2020-05-07 07:49:45
-- 最後更新： 2020-05-07 08:29:50
--

DROP TABLE IF EXISTS `transfer`;
CREATE TABLE IF NOT EXISTS `transfer` (
  `uid` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `iid` int(10) NOT NULL,
  `method_transfer` varchar(10) NOT NULL,
  `sendto` varchar(60) NOT NULL,
  `receiver` varchar(10) NOT NULL,
  `phone` int(10) NOT NULL,
  `mobile` int(10) NOT NULL,
  PRIMARY KEY (`order_id`,`iid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的關聯 `transfer`:
--

--
-- 傾印資料表的資料 `transfer`
--

INSERT INTO `transfer` (`uid`, `order_id`, `iid`, `method_transfer`, `sendto`, `receiver`, `phone`, `mobile`) VALUES
(21, 1, 0, '宅配', '桃園市觀音區資策會', '創建者', 2147483647, 912345678);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
