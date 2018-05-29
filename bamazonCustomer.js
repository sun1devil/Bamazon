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


function readBamazon() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
         // Log all results of the SELECT statement
            console.table(res)
       
        // console.log("************Items for sale************\n");
        //  console.log(JSON.stringify(res[0].productName)); 
        //  var items = JSON.stringify(res); 
        //  console.log("ITEMS TEST: "+ items) 
        // for (var i = 0; i < items.length; i++) {
        //     console.log("ID: " + items[i].item_id + "|" + "Product: " + items[i].productName + "|" + "Department: " + items[i].DepartmentName + "|" + "Price: " + "|" + items[i].price + "|");
        //     console.log("*****************************");
        // }
        promptCustomer(res);
       // connection.end();
    });
}
// createProduct();
readBamazon();
function promptCustomer(product) {
    console.log('PRODUCT is replaced by res: ' + product)
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
        console.log(res);
        var item = res.userItem
        var qty = parseInt(res.userQuantity)
        var price = product[0].price
        console.log("PRODUCT price: "+ product[0].price)
     
            if( qty < product[0].inventory){
            console.log ("Item purchased! Your total cost =: " + "$" + (qty * price));        
        
        }else{
            console.log("Not enough inventory!");
        }
    });
}

// // ******************************************************************************
// // // //If statement and respons
function chicken(choiceId, inventory){
    for ( var i=0; i<inventory.length; i++){
        if (inventory[i].item_id === choiceId) {
            return inventory[i]
        }
        return null
    }
}

// if (userQuantity = < parsInt(res.inventory)) {
//     Console.log "Item purchased! Your total cost =: " + "$" + (res.price * userQuantity);
//     res.inventory--;
// }
// {else {
//     console.log("Not enough inventory!")

// }


// function formatter(res) {
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


