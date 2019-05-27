function bamazonCustomer() {
  var inquirer = require('inquirer');
  var mysql = require('mysql');
  var seperator = '---------------------------------------------------------------------------\n'

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'bamazon_db'
  });

  // connection.connect(function (err) {
  //   if (err) throw err;
  //   console.log('connection id: ' + connection.threadId);
  // })

  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    // console.table(res);
    console.log('\n')
    for (let i = 0; i < res.length; i++) {
      var idFixed = res[i].item_id;
      var productNameFixed = res[i].product_name;
      var departmentNameFixed = res[i].department_name;
      var priceFixed = res[i].price;
      var stockQuantitiyFixed = res[i].stock_quantity;
      console.log(`${seperator}| ${idFixed.toString().padEnd(5)} | ${productNameFixed.padEnd(25)} | ${departmentNameFixed.padEnd(15)} | ${priceFixed.toString().padEnd(7)} | ${stockQuantitiyFixed.toString().padEnd(7)} |`);
    }
    console.log(seperator);
    // purchaseInquiry();
    connection.end();
  })

  // function purchaseInquiry() {
  //   inquirer
  //     .prompt([
  //       {
  //         type: 'input',
  //         name: 'item',
  //         message: 'Enter the item id that you would like to buy.'
  //       },
  //       {
  //         type: 'input',
  //         name: 'amount',
  //         message: 'How many would you like to buy.'
  //       }
  //     ])
  //     .then(function (answers) {
  //       var idPicked = answers.item;
  //       var amountPicked = answers.amount;
  //       purchase(); F
  //     })
  // }

  // function purchase() {
  //   var query = connection.query(
  //     'UPDATE products SET ? WHERE ?',
  //     [
  //       {
  //         stock_quantity: stock_quantity - parseInt(amountPicked)
  //       },
  //       {
  //         id: parseInt(idPicked)
  //       }
  //     ]
  //   )
  //   console.log(query.sql);
  //   connection.end();
  // }
}

bamazonCustomer();