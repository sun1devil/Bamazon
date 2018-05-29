DROP DATABASE IF EXISTS greatbay_db;
CREATE    database greatbay_db;

USE greatbay_db;

CREATE TABLE item(
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
   PRIMARY KEY (ID),
   
   Name VARCHAR(30) NOT NULL,
   
   Description VARCHAR(50),
   
    Bid DECIMAL(10,2) DEFAULT 0
   
   );
   
   
   INSERT INTO item(id,Name, Description) VALUES(1,"Ipad","Apple tablet computer");
    INSERT INTO item(Name, Description) VALUES("Iphone","Apple's Best phone");
    INSERT INTO item(Name, Description) VALUES("MacBook","Apple Laptop");
   INSERT INTO item(Name, Description) VALUES("Vacation","Cruise to Bahamas");

   
   SELECT * FROM item