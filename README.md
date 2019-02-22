# Bamazon
Storefront Node Application 

## Individual Project 10 (Bamazon Custormer and Management CLI) 

The assignment was to implement Node JS and MySQL Database to create a customer store portal and a store management portal to an online shopping site. The inquirer npm package is used to implement a more sophisticated command line interface and the chalk npm package is used to add color to the appliction. The Bamazon app interfaces with a MySQL database to check and update inventory and prices when an order is placed as well as for management functions such as checking low inventory, adding more inventory of an item, and adding new items.

## Narrated Video Demonstration
[YouTube CLI](https://youtu.be/lVPUEm1RGIs)

[YouTube MySQL Database]()
 
## Getting Started
1. Clone [repo](https://github.com/dtries/Bamazon) to your machine. 
1. Enter 'npm install' in GitBash or your terminal.
   * This will install the proper js package files from a package JSON file.
## Customer Portal
1. Enter 'node bamazonCustomer.js'for the customer portal. 
1. Look over the items for sale in the table produced upon entering the app.
1. At item purchase prompt enter item to order using the corresponding item number from the table.
1. Another prompt will appear asking how many of that item you would like to purchase, enter the desired quantity.
   * Possible results:
     1. Desired amount of the item requested is less than the stock on hand.
          * Order processing appears.
          * Customer is given the total cost.
          * Thank you message is displayed.
          * Transaction complete message is displayed.
          * The inventory in the database is updated by subtracting out the number of an item that was purchased.
          
     1. Desired amount of the item requested is greater than the stock on hand. 
          * Message is displayed indicating that not enough of the desired item is in stock.
          * The item purchase prompt is displayed again.
          
## Manager Portal
1. Enter 'node bamazonManager.js' for the manager view portal. 
1. Welcome message appears as well as instructions to select desired action from list using arrow keys.
   * List contains five options:
    1. View products for sale
       * Displays table as in customer view along with quanity in stock.
    1. View low inventory
       * Displays only those items for which the stock quantity is less than five units.
    1. Add to inventory
       * Allows the manager to add to the stock quanitity for any item in the database.
    1. Add new product
       * Allows the manager to add a new product to the data base, stepping through the information required.
    1. Quit manager view    
                  
## Tech Employed
* Node.js - (see below)
* MySQL - https://www.mysql.com/
* Inquirer.js NPM Package -https://www.npmjs.com/package/inquirer
* Chalk NPM Package - https://www.npmjs.com/package/chalk

## Prerequisites
* Node.js - The latest version of Node is available at: https://nodejs.org/en/

## Built With
VS Code - Text Editor
## Authored and Maintained By:
Dennis Ries

Contact: dtries@gmail.com

© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
