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

var sql = "CREATE TABLE IF NOT EXISTS inputs (input_id int NOT NULL AUTO_INCREMENT, concept VARCHAR(25), amount decimal(12) NOT NULL, input_date DATE NOT NULL, input_type VARCHAR(20) NOT NULL, type_expense VARCHAR(10), PRIMARY KEY (input_id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    if(result.warningCount == 0){
      console.log("Table created");
    }
});


module.exports= con;