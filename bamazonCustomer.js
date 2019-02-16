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
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
    // queryMultTop5000();
    // querySpecificRange();
    // querySpecificSong();
});

function queryAllProducts () {
    //   console.log("Selecting songs from" + connection.database);
      connection.query("SELECT * FROM products \G;"
      , function(err, rows){
        if (err) throw err;
        // Log all results of the SELECT statement
        
        createTable(rows);


        // console.log(dbResponse);
        // res.JSON.stringify(res);
        connection.end();
      });
  }

  var createTable = function(rows) {
    console.log("\n");
    console.log(chalk.yellowBright.bgYellowBright("__________________________________________________________________\n"));
    console.log(chalk.green.bold(" Item ID" + "\t|\t " + "   Product" + "\t\t|\t" + "   Price\t"));
    console.log(chalk.yellowBright("__________________________________________________________________"));

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i]
        var priceStr = row.price.toString();
        console.log(" ");
        if (row.product_name.length < 7) {
            if (priceStr.length < 6) {
            console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t\t\t|\t " + "  $" + row.price));
            } else if (priceStr.length < 7) {
                console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t\t\t|\t " + " $" + row.price));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t\t\t|\t " + "$" + row.price));
            }
        } else if (row.product_name.length < 15)  {
            if (priceStr.length < 6) {
                    console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t\t|\t " + "  $" + row.price));
            } else if (priceStr.length< 7) {
                console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t\t|\t " + " $" + row.price));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t\t|\t " + "$" + row.price));
            }
        } else if (row.product_name.length < 23) {
            if (priceStr.length<6) {
                console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t|\t " + "  $" + row.price));
            }else if (priceStr.length<7) {
                console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t|\t " + " $" + row.price));
            } else {
                console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t|\t " + "$" + row.price));
            }
 
        } else {
            console.log(chalk.yellowBright("   " + row.item_id +"\t\t|\t "+ row.product_name +"\t|\t " + "$" + row.price));
        }
        if (i === rows.length-1) {
            console.log(" ");
            console.log(chalk.yellowBright.bgYellowBright("__________________________________________________________________"));
        } else {
            console.log(chalk.green("__________________________________________________________________"));
        }
    }
  }