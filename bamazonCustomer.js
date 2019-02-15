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

    console.log("Item ID" + "\t|\t" + "Product" + "\t|\t" + "Price\t");
    console.log("-----------------------------------------");

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i]
        console.log(row.item_id +"\t|\t "+ row.product_name +"\t|\t " + "$" + row.price);
        console.log("______________________________________");
    }
  }