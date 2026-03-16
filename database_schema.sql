-- E-SCHOOL GROUPE V 2.7 Database Schema
-- Database: eschool_db

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role` ENUM('admin', 'teacher', 'maintenance') NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS `schools` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `address` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `session_codes` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `access_code` VARCHAR(10) NOT NULL UNIQUE,
  `teacher_id` INT NOT NULL,
  `school_id` INT NOT NULL,
  `is_used` BOOLEAN DEFAULT FALSE,
  `expires_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`) ON DELETE CASCADE
);

-- Dummy Data for Testing the Smart Check-in
INSERT IGNORE INTO `users` (`id`, `role`, `email`, `password_hash`, `full_name`) VALUES
(1, 'teacher', 'r.boumediene@eschool.dz', 'hashed_pwd_here', 'Prof. Rachid Boumediene');

INSERT IGNORE INTO `schools` (`id`, `name`, `address`) VALUES
(1, 'Lycée Emir Abdelkader', 'Alger Centre');

-- Create a valid code for Prof. Rachid at Lycée Emir Abdelkader that expires in the future
INSERT IGNORE INTO `session_codes` (`access_code`, `teacher_id`, `school_id`, `is_used`, `expires_at`) VALUES
('123456', 1, 1, 0, DATE_ADD(NOW(), INTERVAL 1 DAY));
