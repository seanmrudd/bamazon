DROP DATABASE IF EXISTS greatbay_db;

CREATE DATABASE greatbay_db;

USE greatbay_db;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100),
    `category` VARCHAR(100),
	`initial_bid` INTEGER (10),
    `highest_bid` INTEGER (10)    
)