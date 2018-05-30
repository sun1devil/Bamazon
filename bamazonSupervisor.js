var mysql = require("mysql");
var inquirer = require("inquirer")
require("console.table")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "#Devils1",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  
});

readBamazon()
function readBamazon() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement n table form
    console.table(res)

    // console.log("************Items for sale************\n");
    //  var items = JSON.stringify(res); 
    //  console.log("ITEMS TEST: "+ items) 
    // for (var i = 0; i < items.length; i++) {
    //     console.log("ID: " + items[i].item_id + "|" + "Product: " + items[i].productName + "|" + "Department: " + items[i].DepartmentName + "|" + "Price: " + "|" + items[i].price + "|");
    //     console.log("*****************************");
    // }
    promptSupervisor(res);
    connection.end();
  });
}

function promptSupervisor(product) {
  console.log('PRODUCT is replaced by res: ' + product)
  inquirer.prompt(
    [{
      type: "list",
      name: "mgrList",
      message: "Your the Big Dog! You can do whatever you like?",
      choices: ["View Products", "See Low Inventory", "Add Inventory", "Add New Product", "Remove Product", "View Sales by Dept", "Create new Dept"]
    }]);
  }
