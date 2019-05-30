var inquirer = require('inquirer');
var mysql = require('mysql');

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

inquirer
    .prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View Products For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product']
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
        }
    })

function viewProducts(){
    console.log('hi');
}
function viewLowInventory(){
    console.log('there');
}
function addInventory(){
    console.log('mr.');
}
function addProduct(){
    console.log('anderson');
}