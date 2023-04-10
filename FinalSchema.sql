-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: hrms
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendence_manager`
--

DROP TABLE IF EXISTS `attendence_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendence_manager` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `check_in` varchar(15) NOT NULL,
  `check_out` varchar(15) NOT NULL DEFAULT '0',
  `hours_worked` varchar(10) NOT NULL DEFAULT '0',
  `break_taken` varchar(10) NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `is_late` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_emp_idx` (`employee_id`),
  CONSTRAINT `fk_attendance` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendence_manager`
--

LOCK TABLES `attendence_manager` WRITE;
/*!40000 ALTER TABLE `attendence_manager` DISABLE KEYS */;
INSERT INTO `attendence_manager` VALUES (2,17,'13:17:18','18:50:46','03:22','2:11','2023-03-30',1,'2023-03-30 07:47:18'),(3,21,'18:01:16','19:10:00','1:20','1:00','2023-03-30',1,'2023-03-30 12:31:16'),(4,17,'08:33:37','16:13:59','06:40','1:00','2023-03-31',0,'2023-03-31 03:03:37'),(5,17,'09:08:23','18:17:00','7:00:00','1:00:00','2023-04-03',0,'2023-04-03 03:38:23'),(6,17,'05:45:42','08:12:13','2:30:00','1:00','2023-04-04',1,'2023-04-04 05:33:08'),(7,21,'17:56:28','0','0','00:10','2023-04-04',1,'2023-04-04 12:26:28'),(12,26,'10:21:17','0','0','0','2023-04-05',1,'2023-04-05 04:51:17'),(14,17,'03:38:00','10:00','7:00','1:00','2023-04-05',1,'2023-04-05 10:03:51'),(15,17,'03:37:39','13:30','9:00','1:00','2023-04-06',0,'2023-04-06 03:37:39'),(16,17,'08:42:14','18:30:00','9:00','1:00','2023-04-07',0,'2023-04-07 03:12:14'),(17,17,'08:51:48','13:02:06','03:03','1:7','2023-04-08',0,'2023-04-08 03:21:48'),(18,17,'08:21:44','14:26:21','05:04','1:00','2023-04-09',0,'2023-04-09 02:51:44');
/*!40000 ALTER TABLE `attendence_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basic_information`
--

DROP TABLE IF EXISTS `basic_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basic_information` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `birthdate` date NOT NULL,
  `marital_status` varchar(10) NOT NULL,
  `allowed_wfh` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `profile_pic` text,
  PRIMARY KEY (`id`),
  KEY `fk_basic_idx` (`employee_id`),
  CONSTRAINT `fk_basic` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_information`
--

LOCK TABLES `basic_information` WRITE;
/*!40000 ALTER TABLE `basic_information` DISABLE KEYS */;
INSERT INTO `basic_information` VALUES (3,17,'Tushar Rupani','male','2023-03-15','Married',1,'2023-03-21 11:36:59','16810110165974cd8a2f7-7057-429b-8fde-40f988dff7d3.png'),(5,21,'Tushar Rupani','female','2023-03-05','Married',0,'2023-03-22 08:37:26','1679474246940f6800845-3841-42a6-9905-063aced68744.jpg'),(6,26,'Tushar Rupani','male','2023-03-17','Married',0,'2023-04-05 04:50:58','1680670258542d199dd9f-bf14-42ab-b77d-83c05fb6a6bd.jpg');
/*!40000 ALTER TABLE `basic_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `break_manager`
--

DROP TABLE IF EXISTS `break_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `break_manager` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `break_in` time NOT NULL,
  `break_out` time DEFAULT '00:00:00',
  `duration` varchar(20) NOT NULL DEFAULT '0',
  `created_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_break_idx` (`employee_id`),
  CONSTRAINT `fk_break` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `break_manager`
--

LOCK TABLES `break_manager` WRITE;
/*!40000 ALTER TABLE `break_manager` DISABLE KEYS */;
INSERT INTO `break_manager` VALUES (8,17,'13:17:28','13:37:46','1218','2023-03-30'),(9,17,'15:28:32','16:28:15','3583','2023-03-30'),(10,17,'17:49:37','17:49:43','6','2023-03-30'),(11,17,'17:53:50','17:55:42','112','2023-03-30'),(12,17,'17:57:07','17:57:53','46','2023-03-30'),(13,17,'18:02:24','18:50:40','2896','2023-03-30'),(14,17,'08:34:05','08:34:08','3','2023-03-31'),(15,17,'16:12:05','16:13:48','103','2023-03-31'),(16,17,'05:46:00','05:47:00','2708','2023-04-04'),(18,17,'06:56:00','06:59:00','120','2023-04-04'),(19,21,'17:56:31','18:03:50','439','2023-04-04'),(20,21,'18:04:11','18:05:15','64','2023-04-04'),(21,21,'18:07:14','18:09:02','108','2023-04-04'),(26,17,'11:46:32','11:47:56','100','2023-04-05'),(27,17,'03:38:24','03:52:15','831','2023-04-06'),(28,17,'03:52:59','03:53:21','22','2023-04-06'),(29,17,'04:06:15','04:06:17','2','2023-04-06'),(30,17,'12:04:32','12:09:55','323','2023-04-07'),(31,17,'09:40:17','10:47:44','4047','2023-04-08'),(32,17,'09:07:44','09:09:21','97','2023-04-09'),(33,17,'09:14:02','09:14:06','4','2023-04-09'),(34,17,'10:13:16','10:13:19','3','2023-04-09'),(35,17,'14:16:51','14:20:08','197','2023-04-09'),(36,17,'14:25:25','14:25:29','4','2023-04-09'),(37,17,'14:26:09','14:26:16','7','2023-04-09');
/*!40000 ALTER TABLE `break_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `comment` text NOT NULL,
  `date` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,17,'this is test','2023-03-27','2023-03-27 03:24:54'),(2,17,'Ths is tes 2','2023-03-27','2023-03-27 04:41:05'),(3,17,'This is the test of new day.','2023-03-28','2023-03-28 03:47:58'),(4,17,'test2','2023-03-29','2023-03-29 07:53:04'),(9,17,'Test added','2023-04-05','2023-04-05 08:00:14'),(11,17,'<button>Hey</button>','2023-04-05','2023-04-05 08:01:39'),(12,17,'<button>Hey</button>','2023-04-05','2023-04-05 08:04:30'),(13,17,'I have done some mistake','2023-04-06','2023-04-06 04:06:50'),(14,17,'This comment is being tested.','2023-04-07','2023-04-07 04:20:54'),(15,17,'Test By Tushar Rupani','2023-04-08','2023-04-08 07:32:55');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_relation`
--

DROP TABLE IF EXISTS `company_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_relation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `designation` varchar(30) NOT NULL,
  `department` varchar(20) NOT NULL,
  `join_date` date NOT NULL,
  `probation_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_company_idx` (`employee_id`),
  CONSTRAINT `fk_company` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_relation`
--

LOCK TABLES `company_relation` WRITE;
/*!40000 ALTER TABLE `company_relation` DISABLE KEYS */;
INSERT INTO `company_relation` VALUES (1,17,'Developer','Development','2023-03-15','2022-03-20','2023-03-21 13:09:20'),(2,26,'Developer','Development','2021-02-03','2022-02-03','2023-04-05 04:50:58');
/*!40000 ALTER TABLE `company_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_information`
--

DROP TABLE IF EXISTS `contact_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_information` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  `emergency_contact` varchar(10) NOT NULL,
  `emergency_person_name` varchar(45) NOT NULL,
  `permenant_address` text NOT NULL,
  `current_address` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_contact_idx` (`employee_id`),
  CONSTRAINT `fk_contact` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_information`
--

LOCK TABLES `contact_information` WRITE;
/*!40000 ALTER TABLE `contact_information` DISABLE KEYS */;
INSERT INTO `contact_information` VALUES (1,17,'3345345464','4545465465','Tushar','Test Address','Test address','2023-03-21 11:36:59'),(3,21,'1234556','1234567','tUSHAR','17, Sindhunagar, Anand','17, Sindhunagar Society, Anand','2023-03-22 08:37:26'),(4,26,'3458749874','4574985794','Tushar','Test address','Test address','2023-04-05 04:50:58');
/*!40000 ALTER TABLE `contact_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_logs`
--

DROP TABLE IF EXISTS `daily_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `activity` varchar(45) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_daily_idx` (`employee_id`),
  CONSTRAINT `fk_daily` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_logs`
--

LOCK TABLES `daily_logs` WRITE;
/*!40000 ALTER TABLE `daily_logs` DISABLE KEYS */;
INSERT INTO `daily_logs` VALUES (1,17,'Checked In','2023-04-05','3:38:00'),(2,17,'Breaked In','2023-04-05','11:45:00'),(3,17,'Checked In','2023-04-06','03:37:39'),(4,17,'Breaked In','2023-04-06','03:38:24'),(5,17,'Breaked Out','2023-04-06','03:52:15'),(6,17,'Breaked In','2023-04-06','03:52:59'),(7,17,'Breaked Out','2023-04-06','03:53:21'),(8,17,'Breaked In','2023-04-06','04:06:15'),(9,17,'Breaked Out','2023-04-06','04:06:17'),(10,17,'Checked In','2023-04-07','08:42:14'),(11,17,'Breaked In','2023-04-07','12:04:32'),(12,17,'Breaked Out','2023-04-07','12:09:55'),(13,17,'Checked In','2023-04-08','08:51:48'),(14,17,'Breaked In','2023-04-08','09:40:17'),(15,17,'Breaked Out','2023-04-08','10:47:44'),(16,17,'Checked Out','2023-04-08','13:02:06'),(17,17,'Checked In','2023-04-09','08:21:44'),(18,17,'Breaked In','2023-04-09','09:07:44'),(19,17,'Breaked Out','2023-04-09','09:09:21'),(20,17,'Breaked In','2023-04-09','09:14:02'),(21,17,'Breaked Out','2023-04-09','09:14:06'),(22,17,'Breaked In','2023-04-09','10:13:16'),(23,17,'Breaked Out','2023-04-09','10:13:19'),(24,17,'Breaked In','2023-04-09','14:16:51'),(25,17,'Breaked Out','2023-04-09','14:20:08'),(26,17,'Breaked In','2023-04-09','14:25:25'),(27,17,'Breaked Out','2023-04-09','14:25:29'),(28,17,'Breaked In','2023-04-09','14:26:09'),(29,17,'Breaked Out','2023-04-09','14:26:16'),(30,17,'Checked Out','2023-04-09','14:26:21');
/*!40000 ALTER TABLE `daily_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Developer','2023-03-15 11:38:52'),(2,'HR','2023-03-15 11:39:56'),(3,'Designer','2023-03-15 11:39:56'),(4,'Wordpress','2023-03-15 11:39:56'),(5,'Marketing','2023-03-15 11:39:56'),(6,'Business Analyst','2023-03-15 11:39:56'),(7,'SDL - 1','2023-03-15 11:39:56'),(9,'QA','2023-03-15 11:44:20');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designations`
--

DROP TABLE IF EXISTS `designations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designations`
--

LOCK TABLES `designations` WRITE;
/*!40000 ALTER TABLE `designations` DISABLE KEYS */;
INSERT INTO `designations` VALUES (1,'Sr. Software Developer','2023-03-15 11:52:00'),(2,'Jr. Software Developer','2023-03-15 11:52:00'),(3,'Trainee','2023-03-15 11:52:00'),(4,'Sr. HR','2023-03-15 11:52:00'),(5,'Jr. HR','2023-03-15 11:52:00'),(6,'Sr. Business Analyst','2023-03-15 11:52:00'),(7,'Jr. Business Analyst','2023-03-15 11:52:00'),(8,'Sr. Quality Analyst','2023-03-15 11:52:00'),(9,'Jr. Quality Analyst','2023-03-15 11:52:00');
/*!40000 ALTER TABLE `designations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `aadhar_path` text NOT NULL,
  `pancard_path` text NOT NULL,
  `resume_path` text NOT NULL,
  `cheque_path` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `aadhar_no` varchar(12) NOT NULL,
  `pancard_no` varchar(10) NOT NULL,
  `cheque_no` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_docs_idx` (`employee_id`),
  CONSTRAINT `fk_docs` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,17,'167939861959603f7e3d9-00d1-4117-b681-de602c186cc2.pdf','1679398619599804da320-7ff2-4fab-a653-69180bcc9c7b.pdf','1679398619604e151a5af-68b6-426a-a2fd-25e53ccbb3f7.odt','1679398619601c04b526d-a3d2-421f-aba9-eb6b95f56838.pdf','2023-03-21 11:36:59','34234','34423','34234'),(2,21,'1679474246941f9055f37-1d9a-4d2f-9b90-abe6302a7b91.pdf','1679474246944c6680af1-18e9-4667-9ba1-4af449c91b65.pdf','167947424694669e1066f-d3c9-40e5-bf39-3a7a7e6434cc.pdf','16794742469459af5b861-4263-43e4-bb65-35ad1e707173.pdf','2023-03-22 08:37:26','1234567890','1234','12345'),(3,26,'1680670258543a1a15d90-6c95-4bd7-8df6-7871d8af6ea4.png','16806702585447ebb46c4-4084-4842-8e3b-fb284f6af8ef.png','1680670258545b91d0091-7079-4e27-9b43-72fc3fc57a36.png','1680670258544c1cf4179-6317-447f-a085-a156825a9617.png','2023-04-05 04:50:58','347849495674','ABCDE3434E','456465');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ip_handler`
--

DROP TABLE IF EXISTS `ip_handler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ip_handler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ip_handler`
--

LOCK TABLES `ip_handler` WRITE;
/*!40000 ALTER TABLE `ip_handler` DISABLE KEYS */;
INSERT INTO `ip_handler` VALUES (4,'103.215.158.91'),(5,'103.215.158.90'),(6,'203.192.207.44');
/*!40000 ALTER TABLE `ip_handler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_balance`
--

DROP TABLE IF EXISTS `leave_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_balance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leave_type` varchar(10) NOT NULL,
  `allowed_leave` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_balance`
--

LOCK TABLES `leave_balance` WRITE;
/*!40000 ALTER TABLE `leave_balance` DISABLE KEYS */;
INSERT INTO `leave_balance` VALUES (1,'PL','6','2023-03-27 06:55:19'),(2,'SL','6','2023-03-27 06:55:19'),(3,'UL','3','2023-03-27 06:55:19'),(4,'CL','3','2023-03-27 06:55:19'),(5,'Half_Day','4','2023-03-27 06:55:19');
/*!40000 ALTER TABLE `leave_balance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_request`
--

DROP TABLE IF EXISTS `leave_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `leave_date` varchar(20) NOT NULL,
  `leave_type` varchar(15) NOT NULL,
  `leave_reason` text NOT NULL,
  `leave_status` varchar(10) NOT NULL DEFAULT 'pending',
  `half_day` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_leave_request_idx` (`employee_id`),
  CONSTRAINT `fk_leave_request` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_request`
--

LOCK TABLES `leave_request` WRITE;
/*!40000 ALTER TABLE `leave_request` DISABLE KEYS */;
INSERT INTO `leave_request` VALUES (6,17,'2023-03-22','CL','I have fallen sick, i need a break.','accepted',0,'2023-03-27 09:32:18'),(7,17,'2023-03-22','CL','Due to health issues, i would not like to come at office and spend time with friends.','pending',0,'2023-03-27 09:40:19'),(8,17,'2023-03-31','SL','I am adding this for just testing purpose.','pending',0,'2023-03-27 09:45:02'),(9,17,'2023-04-01','SL','I am sick.','accepted',0,'2023-03-31 10:46:26'),(10,17,'2023-04-20','SL','I want one half day leave.','pending',1,'2023-04-09 09:28:04');
/*!40000 ALTER TABLE `leave_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActivated` tinyint(1) DEFAULT '0',
  `attempts_remaining` tinyint(1) DEFAULT '3',
  `final_attempt_time` datetime DEFAULT NULL,
  `status` varchar(10) DEFAULT 'unblock',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (1,'tushar24081@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-16 10:14:04',0,3,NULL,'U'),(2,'test@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-16 10:15:02',0,3,NULL,'U'),(3,'jayesh@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-16 10:59:43',0,3,NULL,'U'),(4,'chintangor@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-17 05:52:24',0,3,NULL,'U'),(5,'chirag@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-17 05:55:07',0,3,NULL,'U'),(6,'jigar@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-17 06:15:17',0,3,NULL,'U'),(7,'jayesh1@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-17 06:16:52',0,3,NULL,'U'),(8,'jatin@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-17 06:20:22',0,3,NULL,'U'),(9,'jigar2@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-17 06:25:58',0,3,NULL,'U'),(17,'chandanirupani1510@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-17 09:53:00',1,3,'2023-04-08 11:53:43','U'),(21,'tushar.rupani@esparkbizmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-17 10:48:28',1,3,NULL,'U'),(22,'chintan@esparkinfo.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-18 10:25:37',0,3,NULL,'U'),(23,'tushar@mailnator.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-28 10:41:20',0,3,NULL,'unblock'),(24,'tushar@mailinator.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-03-28 10:41:58',1,1,'2023-04-07 15:48:27','U'),(25,'tusharrupani@gmail.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-04-05 04:37:12',0,3,NULL,'unblock'),(26,'tushar2@mailinator.com','$2a$10$C6TyBNe5g80ZruRCwJGqH.4WFGIgTwOJwJ7jX2RZgBnS65ALy7LgS','2023-04-05 04:48:23',1,3,NULL,'unblock');
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensation`
--

DROP TABLE IF EXISTS `sensation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int NOT NULL,
  `message` text NOT NULL,
  `time` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensation`
--

LOCK TABLES `sensation` WRITE;
/*!40000 ALTER TABLE `sensation` DISABLE KEYS */;
INSERT INTO `sensation` VALUES (1,17,'wedewdfe','2023-04-09 14:21:41'),(2,17,'fewfe','2023-04-09 14:22:22'),(3,17,'efwef','2023-04-09 14:23:37'),(4,17,'efewfwe','2023-04-09 14:23:42'),(5,17,'efwefwe','2023-04-09 14:24:09'),(6,17,'efwefvwe','2023-04-09 14:24:15'),(7,17,'wedfe','2023-04-09 14:24:47'),(8,17,'efwqefwe','2023-04-09 14:24:58'),(9,17,'wfqew','2023-04-09 14:25:37'),(10,17,'fewvwev','2023-04-09 14:25:40'),(11,17,'efwev','2023-04-09 14:25:46'),(12,17,'wdqew','2023-04-09 14:32:42'),(13,17,'wefqwefwe','2023-04-09 14:32:50'),(14,17,'wdqwedewd','2023-04-09 14:38:30'),(15,17,'Tushar','2023-04-09 14:38:41'),(16,17,'ewede','2023-04-09 14:39:41');
/*!40000 ALTER TABLE `sensation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_information`
--

DROP TABLE IF EXISTS `social_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_information` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `twitter` varchar(20) DEFAULT NULL,
  `linkedin` varchar(20) DEFAULT NULL,
  `github` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `facebook` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_social_idx` (`employee_id`),
  CONSTRAINT `fk_social_information` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_information`
--

LOCK TABLES `social_information` WRITE;
/*!40000 ALTER TABLE `social_information` DISABLE KEYS */;
INSERT INTO `social_information` VALUES (1,17,'tushahar','TusharRupani','tushar_rupani','2023-03-21 11:36:59','Tushar'),(2,21,'tushahar','tushar','tushar','2023-03-22 08:37:26','tushar'),(3,26,'test','test','test','2023-04-05 04:50:58','test');
/*!40000 ALTER TABLE `social_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `status` varchar(10) DEFAULT 'offline',
  PRIMARY KEY (`id`),
  KEY `fk_emp_idx` (`employee_id`),
  CONSTRAINT `fk_emp` FOREIGN KEY (`employee_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,17,'offline'),(2,21,'online'),(3,26,'online');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-09 15:55:50
