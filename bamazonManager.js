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

connection.connect(function (err) {
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
    promptManager(res);
    connection.end();
  });
}


function promptManager(product) {
  console.log('PRODUCT is replaced by res: ' + product)
  inquirer.prompt(
    [{
      type: "list",
      name: "mgrList",
      message: "Your the boss! What would you like to do?",
      choices: ["View Products", "See Low Inventory", "Update Product", "Add New Product", "Remove Product",]
    }]);
  }
  //  If Choice is 0
   // readBamazon()
   //  If Choice is 1
  //  readLowInv
   //  If Choice is 2
  // updateProduct()
   //  If Choice is 3
   // createProduct();
 //  If Choice is 4
// deleteProduct();

// // createProduct();
// function createProduct() {
//   console.log("Inserting a product...\n");
//   connection.query("INSERT INTO products SET ?",
//       {
//           item_id: 1,
//           productName: 'lizard',
//           departmentName: 'reptile',
//           price: 6.23,
//           inventory: 56
//       },
//       function (err, res) {
//           console.log(res.affectedRows + " product added!\n");
//           // Call updateProduct AFTER the INSERT completes
//           // updateProduct();
//       });
// }

// // ******************************************************************************

// function updateProduct() {
//   console.log("Updating inventory...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         item_id: 15
//       },
//       {
//         id: 4
//       }
//     ],
//     function (err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       // deleteProduct();
//     }
//   );
// }
// ******************************************************************************

// function deleteProduct() {
//     console.log("Deleting all canines...\n");
//     connection.query(
//       "DELETE FROM products WHERE ?",
//       {
//         departmentName: "reptile"
//       },
//       function(err, res) {
//         console.log(res.affectedRows + " products deleted!\n");
//         // Call readProducts AFTER the DELETE completes
//         // readProducts();
//       }
//     );
//   }