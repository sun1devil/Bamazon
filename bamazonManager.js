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

    promptManager(res);
    
  });
}

 
function promptManager(res) {
  
  inquirer.prompt(
    [{
      type: "list",
      name: "mgrList",
      message: "Your the boss! What would you like to do?",
      choices: ["View Products", "See Low Inventory < 20", "Update Product", "Add New Product", "Remove Product",]
    }]).then(function (res){
      console.log(res);
    //  If Choice is 0
    // readBamazon()
      if (res.mgrList === "View Products"){
         readBamazon(res);
         promptManager(res);
      }
   

    //  If Choice is 1
    //  readLowInv
  if (res.mgrList === "See Low Inventory < 20"){
    readLowInv(res);
 }

    //  If Choice is 2
    // updateProduct()
    if (res.mgrList === "Update Product"){
      updateProduct(res);
   }
  
   //  If Choice is 3
   // createProduct();
   if (res.mgrList === "Add New Product"){
    createProduct(res);
 }
 //  If Choice is 4
// deleteProduct();
if (res.mgrList === "Remove Product"){
  deleteProduct();
  promptManager(res);
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
    promptManager(res);
    
    
  });
}





// // createProduct();
// Want to add prompt to capture 
function createProduct() {
  console.log("Inserting a product...\n");
  connection.query("INSERT INTO products SET ?",
      {
          id: 10,
          productName: 'lizard',
          departmentName: 'reptile',
          price: 6.23,
          inventory: 56
      },
      function (err, res) {
          console.log(" product added!\n");
          // Call updateProduct AFTER the INSERT completes
          readBamazon(res)
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

  function updateProduct(item, id) {
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