const inquirer = require('inquirer');
const mysql = require('mysql');
const chalk = require('chalk');

var seperator = '---------------------------------------------------------------------------\n'
var tableHeader = `${seperator}| ID    | Product Name              | Department      | Price   |Quantitiy|\n---------------------------------------------------------------------------`

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'bamazon_db'
});

connection.connect(function (err) {
  if (err) throw err;
  // console.log('connection id: ' + connection.threadId);
  console.log('');
  displayProducts();
})

function displayProducts() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    console.log(`${chalk.blue(tableHeader)}`);
    for (let i = 0; i < res.length; i++) {
      var idFixed = res[i].item_id;
      var productNameFixed = res[i].product_name;
      var departmentNameFixed = res[i].department_name;
      var priceFixed = res[i].price;
      var stockQuantitiyFixed = res[i].stock_quantity;
      console.log(`${seperator}| ${idFixed.toString().padEnd(5).substr(0, 5)} | ${productNameFixed.padEnd(25).substr(0, 25)} | ${departmentNameFixed.padEnd(15).substr(0, 15)} | ${priceFixed.toString().padEnd(7).substr(0, 7)} | ${stockQuantitiyFixed.toString().padEnd(7).substr(0, 7)} |`);
    }
    console.log(seperator);
    purchaseInquiry();
  })
}

function purchaseInquiry() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'item',
        message: 'Enter the item id that you would like to buy.'
      },
      {
        type: 'input',
        name: 'amount',
        message: 'How many would you like to buy.'
      }
    ])
    .then(function (answers) {
      var item = answers.item;
      var item2 = parseInt(item);
      var amount = answers.amount;
      var amount2 = parseInt(amount);

      connection.query('SELECT * FROM products WHERE `item_id` = ' + item2, function (err, res) {
        if (err) throw err;

        // console.log(`Item id: ${item2} \nAmount purchased: ${amount2}`)
        // console.log(res);

        if (res[0].stock_quantity >= amount2) {
          var query = connection.query(
            'UPDATE products SET ? WHERE ?',
            [
              {
                stock_quantity: res[0].stock_quantity - amount2
              },
              {
                item_id: item2
              }
            ]
          )
          // console.log(query.sql);
          console.log(`\nYour total comes to $${(res[0].price * amount2).toFixed(2)}.`)
        } else console.log('Not enought in stock.');
        continueShopping();
      })
    })
}

function continueShopping() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'shop',
        message: 'Would you like to continue shopping?',
        choices: ['Yes', 'No']
      }
    ])
    .then (function(answers){
      if (answers.shop === 'Yes'){
        displayProducts();
      } else {
        connection.end();
        process.exit();
      }
    })
}