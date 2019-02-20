//Access Security
require("dotenv").config();

// Required node_modules, user can install from package json, add to gitignore
var mysql = require("mysql");
var chalk = require("chalk");
var inquirer = require("inquirer");

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
    queryAllProducts();

});

function queryAllProducts() {
    //   console.log("Selecting songs from" + connection.database);
    connection.query("SELECT * FROM products \G;", function (err, rows) {
        if (err) throw err;
        // Log all results of the SELECT statement

        createTable(rows);
    });
}

var createTable = function (rows) {
    console.log(" ");
    console.log(chalk.yellowBright.bgYellowBright("__________________________________________________________________"));
    console.log(" ");
    console.log(chalk.green.bold(" Item ID" + "\t|\t " + "   Product" + "\t\t|\t" + "   Price"));
    console.log(chalk.yellowBright("__________________________________________________________________"));

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i]
        var priceStr = row.price.toString();
        console.log(" ");
        if (row.product_name.length < 7) {
            if (priceStr.length < 6) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t\t|\t " + "  $" + row.price));
            } else if (priceStr.length < 7) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t\t|\t " + " $" + row.price));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t\t|\t " + "$" + row.price));
            }
        } else if (row.product_name.length < 15) {
            if (priceStr.length < 6) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t|\t " + "  $" + row.price));
            } else if (priceStr.length < 7) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t|\t " + " $" + row.price));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t\t|\t " + "$" + row.price));
            }
        } else if (row.product_name.length < 23) {
            if (priceStr.length < 6) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t|\t " + "  $" + row.price));
            } else if (priceStr.length < 7) {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t|\t " + " $" + row.price));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t|\t " + "$" + row.price));
            }

        } else {
            console.log(chalk.yellowBright("   " + row.item_id + "\t\t|\t " + row.product_name + "\t|\t " + "$" + row.price));
        }
        if (i === rows.length - 1) {
            console.log(" ");
            console.log(chalk.yellowBright.bgYellowBright("__________________________________________________________________\n"));
        } else {
            console.log(chalk.green("__________________________________________________________________"));
        }
    }

    incPrompt(row);
}

// ----- Inquirer Prompt for User input
function incPrompt(row) {
    inquirer.prompt([{
            type: "input",
            prefix: " ",
            name: "userItem",
            message: chalk.magenta("Which item number would you like to purchase?")
        },
        {
            type: "input",
            prefix: " ",
            name: "userQuantity",
            message: chalk.magenta("\n  How many would you like?")
        }

    ]).then(answers => {
        connection.query("SELECT * FROM products WHERE ?", {
            item_id: answers.userItem
        }, function (err, res) {
            if (err) throw err;
            console.log(chalk.bgMagenta.yellow("\n\tOrder processing ..."));
            var stockCheck = (res[0].stock_quantity > answers.userQuantity) ? "enough" : "not enough";
            switch (stockCheck) {
                case "enough":
                    var theItem = answers.userItem;
                    var amtOrdered = answers.userQuantity;
                    var stockOnHand = res[0].stock_quantity;
                    updateStock(theItem, amtOrdered, stockOnHand);
                    var customerTotal = res[0].price * amtOrdered;
                    console.log(chalk.green.bold("\n\tYour total is $" + parseFloat(customerTotal).toFixed(2)));
                    console.log(chalk.yellowBright.bold("\n\tThank you for you(r order!"));
                    done = 1;
                    if (done = 1) {
                        connection.end();
                    }
                    break;
                case "not enough":
                    console.log("Unfortunately, we have only " + res[0].stock_quantity + " of " + res[0].product_name + " in stock currently. Please choose another like product or few of the desired item.");
                    incPrompt();
                    break;
                default:
                    console.log("Something went awry, please try your order again.")
                    incPrompt();
                    break;
            }
        });
    });
}

function updateStock (theItem,amtOrdered, stockOnHand) {
    var stockUpdated = stockOnHand - amtOrdered;
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stockUpdated
            },
            {
                item_id: theItem
            }
        ]
    );
}