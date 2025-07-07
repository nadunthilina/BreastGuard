-- Database Schema for Breast Cancer Detection System

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS breast_cancer_db;
USE breast_cancer_db;

-- User table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Detection result table
CREATE TABLE IF NOT EXISTS detection_result (
    id VARCHAR(36) PRIMARY KEY,
    user_id INT,
    prediction VARCHAR(20) NOT NULL,
    confidence FLOAT NOT NULL,
    radius FLOAT,
    texture FLOAT,
    perimeter FLOAT,
    area FLOAT,
    smoothness FLOAT,
    compactness FLOAT,
    concavity FLOAT,
    concave_points FLOAT,
    symmetry FLOAT,
    fractal_dimension FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Insert some sample users
INSERT INTO user (username, email, password, name) VALUES
('admin', 'admin@example.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'Admin User'), -- Password: admin
('user1', 'user1@example.com', '0a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90', 'Test User 1'), -- Password: password
('doctor1', 'doctor@example.com', '25f43b1486ad95a1398e3eeb3d83bc4010015fcc9bedb35b432e00298d5021f7', 'Dr. Sarah Johnson'); -- Password: doctor123
