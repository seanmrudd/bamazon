var inquirer = require('inquirer');
var mysql = require('mysql');
const chalk = require('chalk');

var seperator = '---------------------------------------------------------------------------\n'
var tableHeader = `${seperator}| ID    | Product Name              | Department      | Price   |Quantitiy|\n---------------------------------------------------------------------------`

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'bamazon_db'
});

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log('connection id: ' + connection.threadId);
//     console.log('');
//     connection.end();
// })

function viewMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'What would you like to do?',
                choices: ['View Products For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product', 'Exit']
            }
        ])
        .then(function (answers) {
            console.log(answers.menu)
            switch (answers.menu) {
                case 'View Products For Sale':
                    viewProducts();
                    break;

                case 'View Low Inventory':
                    viewLowInventory();
                    break;

                case 'Add To Inventory':
                    addInventory();
                    break;

                case 'Add New Product':
                    addProduct();
                    break;

                case 'Exit':
                    exitMenu();
                    break;
            }
        })
}


function viewProducts() {
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
        viewMenu();
    })
}

function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE `stock_quantity` < 50', function (err, res) {
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
        viewMenu();
    })
}
function addInventory() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log(`\n${chalk.blue(tableHeader)}`);
        for (let i = 0; i < res.length; i++) {
            var idFixed = res[i].item_id;
            var productNameFixed = res[i].product_name;
            var departmentNameFixed = res[i].department_name;
            var priceFixed = res[i].price;
            var stockQuantitiyFixed = res[i].stock_quantity;
            console.log(`${seperator}| ${idFixed.toString().padEnd(5).substr(0, 5)} | ${productNameFixed.padEnd(25).substr(0, 25)} | ${departmentNameFixed.padEnd(15).substr(0, 15)} | ${priceFixed.toString().padEnd(7).substr(0, 7)} | ${stockQuantitiyFixed.toString().padEnd(7).substr(0, 7)} |`);
        }
        console.log(seperator);
    })

    // function delay() {
    //     setTimeout(function () {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'item',
                message: 'Enter the item id that you want to add inventory to.'
            },
            {
                type: 'input',
                name: 'amount',
                message: 'How many of this product would you like to add to your inventory?.'
            }
        ])
        .then(function (answers) {
            var item = answers.item;
            var item2 = parseInt(item);
            var amount = answers.amount;
            var amount2 = parseInt(amount);

            connection.query('SELECT * FROM products WHERE `item_id` = ?', item2, function (err, res) {
                if (err) throw err;

                // console.log(`Item id: ${item2} \nAmount purchased: ${amount2}`)
                // console.log(res);

                if (amount2 > 0) {
                    var query = connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: res[0].stock_quantity + amount2
                            },
                            {
                                item_id: item2
                            }
                        ]
                    )
                    // console.log(query.sql);
                    console.log(`\n${seperator}\nYour new inventory for ${res[0].product_name} is ${res[0].stock_quantity + amount2}\n${seperator}`)
                }
                viewMenu();
            })
            //         }, 5000);
            // })
        })
    // delay();
}

function addProduct() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the product would you like to add?'
            },
            {
                type: 'input',
                name: 'category',
                message: 'What category does it belong to?'
            },
            {
                type: 'input',
                name: 'price',
                message: 'How much does this item cost?'
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many of this product would you like to add to your inventory?.'
            }
        ])
        .then(function (answers) {
            // console.log(`${answers.name}, ${answers.category}, ${answers.price}, ${answers.quantity}`)
            var price = answers.price;
            var price2 = parseInt(price);
            var price3 = price2.toFixed(2);

            var quantity = answers.quantity;
            var quantity2 = parseInt(quantity);
            var quantity3 = quantity2;

            // console.log(`${answers.name}, ${answers.category}, ${price3}, ${quantity3}`)

            var query = { product_name: answers.name, department_name: answers.category, price: price3, stock_quantity: quantity3 }

            connection.query('INSERT INTO products SET ?', query, function (error, res) {
                if (error) throw error;
                console.log(`\n${seperator}\n${answers.name} was succesfully added to Bamazon.\n${seperator}`);
                viewMenu();
            });
        })
}

function exitMenu() {
    connection.end();
    process.exit();
}

viewMenu();