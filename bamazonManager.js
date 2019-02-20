//Access Security
require("dotenv").config();

// Required node_modules, user can install from package json, add to gitignore
var mysql = require("mysql");
var chalk = require("chalk");
var inquirer = require("inquirer");

var newQuantity;

// values needed to connect to mysql database 
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// establishes connection to mysql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(chalk.bgMagenta.yellowBright("\n\tWelcome to Bamazon Manager View!\n"));
    incPrompt();

});

// ----- MySQL functions --------------------------------
function queryAllProducts() {
    connection.query("SELECT * FROM products \G;", function (err, rows) {
        if (err) throw err;
        // Log all results of the SELECT statement

        createTable(rows);
        incPrompt();
    });
}

function queryLowProducts() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function (err, rows) {
        if (err) throw err;
        // Log low inventory results of the SELECT statement
        createTable(rows);
        incPrompt();
    });
}

function addInventory() {
    inquirer.prompt([{
            type: "input",
            prefix: " ",
            name: "Item",
            message: chalk.magenta("Update inventory amount for which item number?")
        },
        {
            type: "input",
            prefix: " ",
            name: "addedQuantity",
            message: chalk.magenta("\n  How many would you like to add to the current inventory?")
        }

    ]).then(answers => {
        connection.query("SELECT * FROM products WHERE ?", {
            item_id: answers.Item
        }, function (err, res) {
            if (err) throw err;
            newQuantity = parseInt(res[0].stock_quantity) + parseInt(answers.addedQuantity);
            updateNums(answers, newQuantity);
        });

        function updateNums(answers, newQuantity) {

            connection.query("UPDATE products SET ? WHERE ?",
                [{
                        stock_quantity: newQuantity
                    },
                    {
                        item_id: answers.Item
                    }
                ],
            )

        }
        incPrompt();
    });
}

function addNewProduct() {
    inquirer.prompt([{
            type: "input",
            prefix: " ",
            name: "Item",
            message: chalk.magenta("What is the new item number?")
        },
        {
            type: "input",
            prefix: " ",
            name: "productName",
            message: chalk.magenta("\n  What is the name of the product?")
        },
        {
            type: "input",
            prefix: " ",
            name: "price",
            message: chalk.magenta("\n  What is the retail price? $")
        },
        {
            type: "checkbox",
            prefix: " ",
            name: "department",
            message: 'Which department is responsible for the new product?',
            choices: [
                {
                name: "Player Gear"
                },
                {
                name: "Goalie Gear"
                },
                {
                name: " Hockey Sticks" 
                },
                {
                name: "Apparel"
                }
            ]

        },
        {
            type: "input",
            prefix: " ",
            name: "addedQuantity",
            message: chalk.magenta("\n  How many would you like to add to inventory?")
        }

    ]).then(answers => {
        // console.log(answers);
            connection.query("INSERT INTO products SET ?", {
            item_id: answers.Item,
            product_name: answers.productName,
            department_name: answers.department[0],
            price: answers.price,
            stock_quantity: answers.addedQuantity
        }, function (err, res) {
            if (err) throw err;
        });

        incPrompt();
    });
}

// ------ Table Creation Function ----------
var createTable = function (rows) {
    console.log(" ");
    console.log(chalk.yellowBright.bgYellowBright("__________________________________________________________________________________________"));
    console.log(" ");
    console.log(chalk.green.bold(" Item ID" + "\t|\t " + "   Product" + "\t\t|\t" + "   Price" + "\t|\tInventory"));
    console.log(chalk.yellowBright("__________________________________________________________________________________________"));

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i]
        var priceStr = row.price.toString();
        console.log(" ");
        if (row.product_name.length < 7) {
            if (priceStr.length < 6) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t\t|\t " + "  $" + row.price + "\t|\t" + row.stock_quantity));
            } else if (priceStr.length < 7) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t\t|\t " + " $" + row.price + "\t|\t" + row.stock_quantity));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t\t|\t " + "$" + row.price + "\t|\t" + row.stock_quantity));
            }
        } else if (row.product_name.length < 15) {
            if (priceStr.length < 6) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t|\t " + "  $" + row.price + "\t|\t" + row.stock_quantity));
            } else if (priceStr.length < 7) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t|\t " + " $" + row.price + "\t|\t" + row.stock_quantity));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t|\t " + "$" + row.price + "\t|\t" + row.stock_quantity));
            }
        } else if (row.product_name.length < 23) {
            if (priceStr.length < 6) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t|\t " + "  $" + row.price + "\t|\t" + row.stock_quantity));
            } else if (priceStr.length < 7) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t|\t " + " $" + row.price + "\t|\t" + row.stock_quantity));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t|\t " + "$" + row.price + "\t|\t" + row.stock_quantity));
            }

        } else {
            console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t|\t " + "$" + row.price + "\t|\t" + row.stock_quantity));
        }
        if (i === rows.length - 1) {
            console.log(" ");
            console.log(chalk.yellowBright.bgYellowBright("__________________________________________________________________________________________\n"));
        } else {
            console.log(chalk.green("__________________________________________________________________________________________"));
        }
    }
}

// ----- Inquirer Prompt for Main Manager View
function incPrompt() {
    inquirer.prompt([{
            type: "list",
            prefix: " ",
            name: "select_task",
            message: chalk.magenta("\tSelect the desired process from the options below.\n"),
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit Manager View"],
            filter: function (val) {
                return val.toLowerCase();
            }
        },

    ]).then(answer => {
        switch (answer.select_task) {
            case "view products for sale":
                queryAllProducts();
                break;

            case "view low inventory":
                queryLowProducts();
                break;

            case "add to inventory":
                addInventory();
                break;

            case "add new product":
                addNewProduct();
                break;

            case "quit manager view":
                console.log(chalk.bgMagenta.yellowBright("Thank you for using Manager View!"));
                connection.end();
                break;
        }
    });
}