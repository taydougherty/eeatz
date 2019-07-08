DROP DATABASE IF EXISTS eeatz;
CREATE DATABASE eeatz;

USE eeatz;

CREATE TABLE budgets (
  id INTEGER PRIMARY KEY auto_increment NOT NULL,
  departmentName VARCHAR (100) NOT NULL,
  budgetTotal DECIMAL (30, 2) NOT NULL,
  dateStart DATE NOT NULL,
  dateExpired DATE NOT NULL,
  username VARCHAR(100) NOT NULL
);
CREATE TABLE expenses (
  departmentName VARCHAR(100) NOT NULL
);
CREATE TABLE users (
  username VARCHAR (100) NOT NULL
);