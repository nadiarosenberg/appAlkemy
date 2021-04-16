const express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "javatpoint"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Drop table 
var sql = "DROP TABLE inputs";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table dropped");
});

//Create table
var sql = "CREATE TABLE IF NOT EXISTS inputs (input_id int NOT NULL AUTO_INCREMENT, concept VARCHAR(25), amount decimal(12) NOT NULL, input_date DATE NOT NULL, input_type VARCHAR(20) NOT NULL, type_expense VARCHAR(10), PRIMARY KEY (input_id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});


module.exports= con;