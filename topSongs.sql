DROP DATABASE IF EXISTS topsongs_db;
CREATE DATABASE topsongs_db;
USE topsongs_db;


CREATE TABLE topsongs(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  artist VARCHAR(100),
  song VARCHAR(100),
  year INTEGER(11),
  ratingWorld DECIMAL(10,3),
  ratingUSA DECIMAL(10,3),
  ratingUK DECIMAL(10,3),
  ratingEorope DECIMAL(10,3),
  ratingRestofWorld DECIMAL(10,3),
  
   PRIMARY KEY (id)
   
);

SELECT * FROM topsongs





