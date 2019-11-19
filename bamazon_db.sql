DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(6,2),
    stock_quantity INT
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Combat Boots', 'Apparel', 59.99, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('SNES - Original', 'Video Games', 99.99, 27);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Graphics Card GTX 1060', 'Computers', 189.00, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Toothbrush', 'Everyday', 3.49, 160);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('18K Gold Necklace', 'Jewelry', 245.99, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('XBOX Controller', 'Video Games', 49.99, 85);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('RGB Mechanical Keyboard', 'Computers', 139.00, 55);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Yeti 30oz Tumbler', 'Everyday', 34.99, 60);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Luvs Diapers', 'Infant/Toddler', 29.99, 75);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Holy Grail', 'Divine Item', 999.99, 99);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Super Duper Awesome Amazing Thing-a-ma-Bob', 'Miscellaneous', 1318.54, 55);
