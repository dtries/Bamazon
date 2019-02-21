USE bamazon;

CREATE TABLE IF NOT EXISTS departments (
	id INT AUTO_INCREMENT,
    department_id INT NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs DECIMAL(19 , 4 ) NOT NULL,
    product_sales DECIMAL(19 , 4 ),
    total_profit DECIMAL(19 , 4 ),
    PRIMARY KEY(id,department_id)
    );