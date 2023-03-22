CREATE DATABASE  IF NOT EXISTS `HRMS` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `HRMS`;
-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: HRMS
-- ------------------------------------------------------
-- Server version	8.0.32

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
  `employee_id` varchar(20) NOT NULL,
  `check_in` time NOT NULL,
  `check_out` time NOT NULL,
  `hours_worked` varchar(10) NOT NULL,
  `date` date NOT NULL,
  `is_late` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendence_manager`
--

LOCK TABLES `attendence_manager` WRITE;
/*!40000 ALTER TABLE `attendence_manager` DISABLE KEYS */;
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
  `employee_id` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `birthdate` date NOT NULL,
  `marital_status` varchar(10) NOT NULL,
  `allowed_wfh` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_information`
--

LOCK TABLES `basic_information` WRITE;
/*!40000 ALTER TABLE `basic_information` DISABLE KEYS */;
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
  `employee_id` varchar(20) NOT NULL,
  `break_in` time NOT NULL,
  `break_out` time NOT NULL,
  `duration` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `break_manager`
--

LOCK TABLES `break_manager` WRITE;
/*!40000 ALTER TABLE `break_manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `break_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_relation`
--

DROP TABLE IF EXISTS `company_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_relation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(20) NOT NULL,
  `designation` varchar(30) NOT NULL,
  `department` varchar(20) NOT NULL,
  `join_date` date NOT NULL,
  `probation_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_relation`
--

LOCK TABLES `company_relation` WRITE;
/*!40000 ALTER TABLE `company_relation` DISABLE KEYS */;
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
  `employee_id` varchar(20) NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  `emergency_contact` varchar(10) NOT NULL,
  `emergency_person_name` varchar(45) NOT NULL,
  `permenant_address` text NOT NULL,
  `current_address` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_information`
--

LOCK TABLES `contact_information` WRITE;
/*!40000 ALTER TABLE `contact_information` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_information` ENABLE KEYS */;
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
  `employee_id` varchar(20) NOT NULL,
  `aadhar_path` varchar(30) NOT NULL,
  `pancard_path` varchar(30) NOT NULL,
  `resume_path` varchar(30) NOT NULL,
  `cheque_path` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_balance`
--

DROP TABLE IF EXISTS `leave_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_balance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(20) NOT NULL,
  `leave_type` varchar(10) NOT NULL,
  `is_leave_used` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_balance`
--

LOCK TABLES `leave_balance` WRITE;
/*!40000 ALTER TABLE `leave_balance` DISABLE KEYS */;
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
  `employee_id` varchar(45) NOT NULL,
  `leave_date` date NOT NULL,
  `leave_type` varchar(15) NOT NULL,
  `leave_reason` text NOT NULL,
  `half_day` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_request`
--

LOCK TABLES `leave_request` WRITE;
/*!40000 ALTER TABLE `leave_request` DISABLE KEYS */;
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
  `employee_id` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_information`
--

DROP TABLE IF EXISTS `social_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_information` (
  `id` int NOT NULL,
  `employee_id` varchar(20) NOT NULL,
  `twitter` varchar(20) NOT NULL,
  `linkedin` varchar(20) NOT NULL,
  `github` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_information`
--

LOCK TABLES `social_information` WRITE;
/*!40000 ALTER TABLE `social_information` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_information` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-15 19:29:11
