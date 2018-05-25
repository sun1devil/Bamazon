DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;


CREATE TABLE products(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  item_id INTEGER(11),
  productName VARCHAR(100),
  departmentName VARCHAR(100),
  price DECIMAL (11, 2),
  inventory INTEGER(11),
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, productName, departmentName,  price, inventory) values (1, 'kitten', 'feline',  25.22, 100);
INSERT INTO products (item_id, productName, departmentName,  price, inventory) values (1, 'cat', 'feline',  12.02, 50);
INSERT INTO products (item_id, productName, departmentName,  price, inventory) values (1, 'puppy', 'canine',  20, 75);
INSERT INTO products (item_id, productName, departmentName,  price, inventory) values (1, 'dog', 'canine',  5.50, 10);
INSERT INTO products (item_id, productName, departmentName,  price, inventory) values (1, 'chick', 'avion',  100, 15);
INSERT INTO products (item_id, productName, departmentName,  price, inventory) values (1, 'chicken', 'avion',  5000, 1);

SELECT * FROM products