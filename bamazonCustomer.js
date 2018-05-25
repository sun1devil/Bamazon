var mysql = require("mysql");
var inquirer = require("inquirer")
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
//   console.log("connected as id " + connection.threadId);
  
});

function readBamazon() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }

  inquirer.prompt(
    {
        type: "input",
        name: "userItem",
        message: "Please enter the ID of the item you would like to buy?",

        // Capture response from name
    }).then(function (response) {
        console.log (response)});


        inquirer.prompt(
            {
                type: "input",
                name: "userQuantity",
                message: "How many would you like to purchase?",
        
                // Capture response from name
            }).then(function (response) {
                console.log (response)});

       



// ******************************************************************************

//   function createProduct() {
//     console.log("Inserting a product...\n");
//     var query = connection.query(
// "INSERT INTO products SET ?",
//     {
//       item_id: 1,
//       productName: 'lizard',
//       departmentName: 'reptile',
//       price: 6.23,
//       inventory: 56

//     },
//     function(err, res) {
//         console.log(res.affectedRows + " product added!\n");
//         // Call updateProduct AFTER the INSERT completes
//         updateProduct();
//     }
// );


// ******************************************************************************

// function updateProduct() {
//     console.log("Updating all lizard inventory...\n");
//     var query = connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [
//         {
//           quantity: 100
//         },
//         {
//           productName: 'lizard'
//         }
//       ],
//       function(err, res) {
//         console.log(res.affectedRows + " products updated!\n");
//         // Call deleteProduct AFTER the UPDATE completes
//         deleteProduct();
//       }
//     );

// ******************************************************************************

// function deleteProduct() {
//     console.log("Deleting all canines...\n");
//     connection.query(
//       "DELETE FROM products WHERE ?",
//       {
//         departmentName: "canine"
//       },
//       function(err, res) {
//         console.log(res.affectedRows + " products deleted!\n");
//         // Call readProducts AFTER the DELETE completes
//         readProducts();
//       }
//     );
//   }