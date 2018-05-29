DROP DATABASE IF EXISTS greatbay_db;
CREATE    database greatbay_db;

USE greatbay_db;

CREATE TABLE item(
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
   PRIMARY KEY (ID),
   
   Name VARCHAR(30) NOT NULL,
   
   Description VARCHAR(50),
   
    Bid DECIMAL(10,2) DEFAULT 0
   
   );
   
   
   INSERT INTO item(id,Name, Description) VALUES(1,"Ipad","Apple tablet computer");
    INSERT INTO item(Name, Description) VALUES("Iphone","Apple's Best phone");
    INSERT INTO item(Name, Description) VALUES("MacBook","Apple Laptop");
   INSERT INTO item(Name, Description) VALUES("Vacation","Cruise to Bahamas");

   
   SELECT * FROM item


Gustavo Gibo [1:27 PM]
added this Perl snippet: function to what happens after user selects an item 
function bidItem(item) {
​
  select * from item where item.name = item
​
  prompt(bid value)

Mridula Udaya Shankar [1:42 PM]
added this JavaScript/JSON snippet: Untitled 
var userInput = process.argv;
​
function bidItem(item) {
​
  connection.query("SELECT * FROM item WHERE item.name = 'item'", function(err, res) {

Gustavo Gibo [3:04 PM]
added this JavaScript/JSON snippet: musicCRUD.js 
var mysql = require("mysql");
var inquirer = require('inquirer');
​
var connection = mysql.createConnection({
  host: "localhost",
 
  // Your port; if not 3306
  port: 3306,
 
  // Your username
  user: "root",
 
  // Your password
  password: "root",
  database: "greatbay_db"
 });
 
 connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");
 //  createProduct();
});
​
function startBidding() {
​
  var menu = [
    {
      type: 'list',
      name: "option",
      message: "Choose your action",
      choices: [
        "POST",
        "BID"
      ]
    }
  ];
​
  inquirer.prompt(menu).then((answers => {
​
    switch(answers.option) {
​
      case "POST":
​
        createItem();
​
      break;
​
      case "BID":
​
        displayItems();
​
      break;
    }
  }));
​
}
​
function createItem() {
​
  var questions = [
    {
     type: 'input',
     name: 'name',
     message: "What is the product name?"
    },
    {
     type: 'input',
     name: 'description',
     message: "What's the product description?"
    }
  ];
​
  inquirer.prompt(questions).then(ans => {
​
    insertProduct(ans);
  
   });
​
}
​
function insertProduct(item) {
  console.log("Inserting a new product...\n");
  var query = connection.query(
   "INSERT INTO item SET ?",
    {
   name: item.name,
   description: item.description
   },
   function(err, res) {
    console.log(res.affectedRows + " item inserted!\n");
​
    connection.query("SELECT * FROM item", function(err, res) {
      if (err) throw err;
      console.log("----------------------");
      for (let index = 0; index < res.length; index++) {
        
        formatResult(res[index]);
        
      }
      connection.end();
     });
    }
  );
 }
​
function displayItems(){
  var response;
​
  var something = connection.query("SELECT * FROM item", function(err, res){
    if (err) throw err;
    
    selectItemByName(res);
    // console.log(JSON.stringify(res));
    // return "hello";
    // console.log(res);
    
  });
​
  // console.log("2323", something);
}
​
function selectItemByName(list) {
​
  var productList = [];
​
  for (let index = 0; index < list.length; index++) {
​
    productList.push(list[index].Name);
    
  }
​
  // console.log(list);
​
  var menu = [
    {
      type: 'list',
      name: "itemToBid",
      message: "Choose your item to bid",
      choices: productList
    }
  ];
​
  inquirer.prompt(menu).then(ans => {
​
    bidItem(ans.itemToBid);
  
  });
​
}
​
function bidItem(item) {
​
  connection.query("SELECT * FROM item WHERE item.name = '"+item+"'", function(err, res) {
​
    if(err) throw err;
    // console.log("11",res);
    // res = res[];
    bidOperation(res);
    
  
  });
}
​
function bidOperation(result) {
​
  inquirer.prompt([
    {
      type:"input",
      name:"bid",
      message:"How much do you want to bid today?"
    }
  
  ]).then(value => {
​
    value.bid = parseFloat(value.bid);
​
​
    if(value.bid > result[0].Bid) {
​
      var query = connection.query(
        "UPDATE item SET ? WHERE ?",
        [
         {
          Bid: value.bid
         },
         {
          Name: result[0].Name
         }
        ],
        function(err, res) {
         console.log(res.affectedRows + " product updated!\n");
​
          connection.query("SELECT * FROM item", function(err, res) {
            if (err) throw err;
            console.log("----------------------");
            for (let index = 0; index < res.length; index++) {
              
              formatResult(res[index]);
              
            }
            // connection.end();
          });
​
​
        }
​
        
      );
​
    } else {
      console.log("=========================");
      console.log('Your bid is too low! Bid again!!'); 
      console.log("=========================");
    }
​
    startBidding();
​
  });
​
}
​
function formatResult(obj) {
    
  console.log(obj.id+" | "+obj.Name+" | "+obj.Description+" | "+obj.Bid);
​
}
​
startBidding();