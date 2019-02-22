# Bamazon
Storefront Node Application 

## Individual Project 10 (Bamazon Custormer and Management CLI) 

The assignment was to implement Node JS and MySQL Database to create a customer store portal and a store management portal to an online shopping site. The inquirer npm package is used to implement a more sophisticated command line interface and the chalk npm package is used to add color to the appliction. The Bamazon app interfaces with the MySQL data base to check and update inventory and prices when an order is placed as well as for management functions such as checking low inventory, adding more inventory of an item, and adding new items.

## Narrated Video Demonstration
[YouTube](https://youtu.be/ggLAm7WTmCw)
 
## Getting Started
1. Clone [repo](https://github.com/dtries/Bamazon) to your machine. 
1. Enter 'npm install' in GitBash or your terminal.
   * This will install the proper js package files from a package JSON file.
1. Enter 'node bamazonCustormer.js'for the customer portal. 
1. Enter a guess using the keyboard and press Enter key.
   * Possible results:
     1. Letter is in word to be guessed and had not been selected already.
          * Blanks in the word matching the letter guessed are updated with that letter.
          * Letter is added to the Letters Already Selected display on the screen.
          
     1. Letter is not in word and has not been selected already. 
          * Letter is added to the Letters Already Selected display on the screen.
          * Chances Left display for how many guesss remain is reduced by 1.
          
     1. Letter has already been selected.
          * Displays message stating that the letter had been selected previously.
          * Chances Left display remains unchanged.
          
     1. Letter entry is left blank.
          * Displays message stating that a letter entry is required.
          * Chances Left display remains unchanged.
          
     1. Letter entry contains more than one letter.
          * Displays message stating that only single letter entry is accepted.
          * Chances Left display remains unchanged.
          
     1. Keyboard entry is a character that is not a letter.
          * Displays message stating that only letter entry is accepted.
          * Chances Left display remains unchanged.
          
  1. If word is guessed correctly or the chances left run out:
     * Winner or Loser message is displayed along with the entire word that was to be guessed.
     * Player is asked if they would like to play again.
          *If yes, game resets and a new word is selected at random.
          *If no, game exits back to default command line.
                     
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
