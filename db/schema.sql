DROP DATABASE IF EXISTS eeatz;
CREATE DATABASE eeatz;

USE eeatz;

CREATE TABLE Budget (
  id INT NOT NULL AUTO_INCREMENT,
  Restaurant_id INT NOT NULL,
  Department_name VARCHAR (100) NOT NULL,
 Department_Budget Decimal(10,2) NOT NULL,
 Date_added DATETIME,
 Expiration_date DATETIME,
 User_id VARCHAR (20) NOT NULL,
  CONSTRAINT Entry PRIMARY KEY (id,Restaurant_id)
);
CREATE TABLE Expenses (
  id INT NOT NULL AUTO_INCREMENT,
  Restaurant_id INT NOT NULL,
  Department_name VARCHAR (100) NOT NULL,
  Expense_name VARCHAR(100) NOT NULL,
Expense_cost Decimal(10,2) NOT NULL,
 Date_added DATETIME,
 Expiration_date DATETIME,
 User_id VARCHAR (20) NOT NULL,
  CONSTRAINT Entry PRIMARY KEY (id,Restaurant_id)
);
CREATE TABLE USER (
    id INT NOT NULL AUTO_INCREMENT,
    User_id VARCHAR (20) NOT NULL,
    User_name VARCHAR(100) NOT NULL,
    Restaurant_id INT NOT NULL,
    Restaurant_name VARCHAR(100) NOT NULL,
    CONSTRAINT User PRIMARY KEY (id, Restaurant_id)
);