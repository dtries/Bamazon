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
      connection.query("SELECT * FROM products"
      , function(err,res){
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
      });
  }