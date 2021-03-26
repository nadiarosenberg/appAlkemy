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

//Para poder hacer las pruebas
var sql = "DROP TABLE IF EXISTS inputs";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table dropped");
});

//Creacion tabla
var sql = "CREATE TABLE inputs (input_id int NOT NULL AUTO_INCREMENT, concept VARCHAR(25), amount decimal(12) NOT NULL, input_date DATE NOT NULL, input_type VARCHAR(20) NOT NULL, type_expense VARCHAR(10), PRIMARY KEY (input_id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

//Valores de prueba
const items = [
    {concept: 'Deuda', amount: 1000, input_date: '2021-03-17', input_type: 'Expense', type_expense: 'Food'},
    {concept: 'Cobro', amount: 1000, input_date: '2021-03-17', input_type: 'Expense', type_expense: 'Living'},
    {concept: '1Gas', amount: 1000, input_date: '2021-03-18', input_type: 'Expense', type_expense: 'Food'},
    {concept: '2Luz', amount: 2000, input_date: '2021-03-18', input_type: 'Expense', type_expense: 'Living'},
    {concept: '3internet', amount: 1000, input_date: '2021-03-18', input_type: 'Expense', type_expense: 'Transport'},
    {concept: '4Cobro', amount: 2000, input_date: '2021-03-19', input_type: 'Income'},
    {concept: '5Cobro', amount: 1000, input_date: '2021-03-19', input_type: 'Income'},
    {concept: '6Supermercado', amount: 2000, input_date: '2021-03-19', input_type: 'Expense', type_expense: 'Transport'},
    {concept: '7Verduleria', amount: 1000, input_date: '2021-03-20', input_type: 'Expense', type_expense: 'Recreation'},
    {concept: '8Impuestos', amount: 2000, input_date: '2021-03-20', input_type: 'Expense', type_expense: 'Recreation'},
    {concept: '9Alquiler', amount: 1000, input_date: '2021-03-20', input_type: 'Expense', type_expense: 'Other'},
    {concept: '10Regalo', amount: 2000, input_date: '2021-03-20', input_type: 'Income'},
];
con.query(
    'INSERT INTO inputs (concept, amount, input_date, input_type, type_expense) VALUES ?',
    [items.map(item => [item.concept, item.amount, item.input_date, item.input_type, item.type_expense])],
);


module.exports= con;