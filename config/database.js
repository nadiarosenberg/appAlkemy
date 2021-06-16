const express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");

require('dotenv').config();

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var sql = "CREATE TABLE IF NOT EXISTS inputs (id int NOT NULL AUTO_INCREMENT, concept VARCHAR(25), amount decimal(12) NOT NULL, input_date DATE NOT NULL, input_type VARCHAR(20) NOT NULL, type_expense VARCHAR(10), PRIMARY KEY (id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    if(result.warningCount == 0){
      console.log("Table created");
    }
});

//Test data
var sql = "SELECT * from inputs";
con.query(sql, function (err, result) {
    if (err) throw err;
    if(result.length == 0){
      var sql = "INSERT INTO inputs (concept, amount, input_date, input_type, type_expense) VALUES ?";
      var values = [
        ['Alquiler', 20000, '2021-04-21', 'Expense', 'Living'],
        ['Comida', 500, '2021-04-21', 'Expense', 'Food'],
        ['Venta', 5000, '2021-04-21', 'Income', null]
      ];
      con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("3 rows added");
      });
    }
});


module.exports= con;