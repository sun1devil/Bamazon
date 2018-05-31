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
   
  });
}

function promptSupervisor(res) {
  
  inquirer.prompt(
    [{
      type: "list",
      name: "supList",
      message: "You Are the BIG DOG! You can do whatever you like! Choose an action",
      choices: ["View Products", "See Low Inventory", "Add Inventory", "Add New Product", "Remove Product", "View Sales by Dept", "Create new Dept"]
    }]).then(function (answer){
      console.log(answer);
    //  If Choice is 0
    // readBamazon()
      if (answer.supList === "View Products"){
         readBamazon();
         promptSupervisor(res);
      }
   

    //  If Choice is 1
    //  readLowInv
  if (answer.supList === "See Low Inventory"){
    readLowInv();
    promptSupervisor(res);
 }

    //  If Choice is 2
    // updateProduct()
    if (answer.supList === "Update Product"){
      updateProduct();
      promptSupervisor(res);
   }
  
   //  If Choice is 3
   // createProduct();
   if (answer.supList === "Add New Product"){
    createProduct();
    promptSupervisor(res);
 }
 //  If Choice is 4
// deleteProduct();
if (answer.supList === "Remove Product"){
  deleteProduct();
  promptSupervisor(res);
}
})
}

// ********************************************************************************************
function readLowInv() {
  console.log("Selecting Low Inventory...\n");
  connection.query('SELECT * FROM products where inventory < 20', function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement n table form
    console.table(res);
    console.log("is this working");
    promptSupervisor(res);
    
    
  });
}





// // createProduct();
// Want to add prompt to capture 
function createProduct() {
  console.log("Inserting a product...\n");
  connection.query("INSERT INTO products SET ?",
      {
          item_id: 1,
          productName: 'lizard',
          departmentName: 'reptile',
          price: 6.23,
          inventory: 56
      },
      function (err, res) {
          console.log(res.affectedRows + " product added!\n");
          // Call updateProduct AFTER the INSERT completes
          readBamazon()
      });
}

// // ******************************************************************************


function deleteProduct() {
    console.log("Deleting product...\n");
    connection.query(
      "DELETE FROM products WHERE ?",
      {
        departmentName: "reptile"
      },
      function(err, res) {
        console.log(res.affectedRows + " products deleted!\n");
//         // Call readProducts AFTER the DELETE completes
        readBamazon();

      }
    );
  }

  // // **************************************************************************************************

  function updateProduct(item, qty) {
    console.log("Updating inventory...\n");
    // console.log(typeof (item.inventory - qty));
    // console.log(typeof item.item_id);
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
            inventory: 100
        },
        {
            id: item.id
        }
      ],
      function (err, res) {
        // console.log(res.affectedRows);
        readBamazon();
        // Call deleteProduct AFTER the UPDATE completes
        // deleteProduct();
      }
    );
  }
  
