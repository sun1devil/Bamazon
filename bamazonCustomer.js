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

// // ************************************************************************************************************
// var formatter = function(res) {
//     console.log(
//         res.item_id +
//         " | " +
//         res.productName +
//         " | " +
//         res.departmentName +
//         " | " +
//         res.price +
//         " | " +
//         res.inventory +
//         " | " +
//         JSON.stringify(res.item_id) +
//         "|" +
//         JSON.stringify(res.productName) +
//         "|" +
//         JSON.stringify(res.departmentName) +
//         "|" +
//         JSON.stringify(res.price) +
//         "|" +
//         JSON.stringify(res.inventory)
//     );
// }

// ******************************************************************************
// ***************************************************************************
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
        promptCustomer(res);
    });
}

readBamazon();
function promptCustomer(product) {
    // console.log('PRODUCT is replaced by res: ' + product)
    inquirer.prompt(
        [{
            type: "input",
            name: "userItem",
            message: "Please enter the ID of the item you would like to buy?",

            // Capture response from name
        }, {
            type: "input",
            name: "userQuantity",
            message: "How many would you like to purchase?",

            // Capture response from name.l
        }]
    ).then(function (res) {
        // console.log(res);
        var item = parseInt(res.userItem)
        var qty = parseInt(res.userQuantity);
        var itemObject;       
        for (var i= 0; i<product.length; i++){
            if (product[i].id === item){
                itemObject = product[i]
            }  
        }
        if (!itemObject){
            console.log("Invalid ID!")
            promptCustomer(product);
        } else {
            var price = itemObject.price
            console.log("PRODUCT price: "+ itemObject.price)
            // console.log(itemObject)
            if ( qty <= itemObject.inventory){
                console.log ("Item purchased! Your total cost =: " + "$" + (qty * price));
                // update inventory
                // console.log(item);
                // console.log(qty);
                // console.log(itemObject.inventory);
                updateProduct(itemObject, qty);
            //    conection.query( "UPDATE products SET ? WHERE ?",)
            //     [
            //     {inventory: product[0].inventory - qty
            //     },
            //     {
            //        item_id: item 
            //     }
            //     ]
            }else{
                console.log("Not enough inventory!");
                promptCustomer(product);
            }
        }
    });
}

// // ******************************************************************************



function updateProduct(item, qty) {
    console.log("Updating inventory...\n");
    // console.log(typeof (item.inventory - qty));
    // console.log(typeof item.item_id);
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
            inventory: item.inventory -qty
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