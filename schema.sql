DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE IF NOT EXISTS bamazon
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
	id INT AUTO_INCREMENT,
    item_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255),
    price DECIMAL(19 , 4 ),
    stock_quantity INT,
    PRIMARY KEY(id,item_id)
    );
    


