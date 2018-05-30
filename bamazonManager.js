var mysql = require("mysql");

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
// createProduct();
// readBamazon
// updateProduct()
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