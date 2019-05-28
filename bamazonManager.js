var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connection id: ' + connection.threadId);
    console.log('');
    connection.end();
})