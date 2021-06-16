var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const con = require('../config/database');
const bodyParser = require('body-parser');

router.post('/', (req,res,next)=>{
   const data ={
      concept: req.body.concept,
      amount: req.body.amount,
      input_date: req.body.input_date,
      input_type: req.body.input_type,
      type_expense: req.body.type_expense
   }
   var sql = "INSERT INTO inputs(concept,amount,input_date, input_type, type_expense) VALUES (?,?,?,?,?)";
   con.query(sql, [data.concept, data.amount, data.input_date, data.input_type, data.type_expense], (err, result)=>{
      if (err){
         console.log(err);
         res.status(500).json({message: 'Something wrong happened'})
      }else{
         res.status(200).json({message: 'Movement successfully created'})
      }
   });
});

router.get('/balance', function(req,res, next){
   con.query('SELECT ((SELECT SUM(amount) AS incomes FROM inputs WHERE input_type = "Income")-(SELECT SUM(amount) AS expenses FROM inputs WHERE input_type = "Expense")) AS balance', function(err, rows, fields){
      if (err){
         console.log(err)
         res.status(500).json({message: 'Error getting balance'})
      }else{
         res.status(200).json(rows[0])
      }
   });
});

router.get('/list', function(req,res, next){
   con.query('SELECT * FROM inputs ORDER BY input_date DESC LIMIT 10', function(err, rows, fields){
      if (err){
         console.log(err);
         res.status(500).json({message: 'Error getting last 10 movements'})
      }else{
        res.status(200).json(rows) 
      }
   });
});

router.get('/', function(req,res, next){
   con.query('SELECT * FROM inputs ORDER BY input_date DESC', function(err, rows, fields){
      if (err){
         console.log(err);
         res.status(500).json({message: 'Error getting last movements'})
      }else{
         res.status(200).json(rows)
      }
   });
});

router.get('/:id', function(req,res, next){
   const {id} = req.params;
   con.query('SELECT * FROM inputs WHERE id = ?', [id], (err, rows, fields)=>{
      if (err){
         console.log(err);
         res.status(500).json({message: 'Error getting movement'})
      }else{
         if(rows.length == 0){
            res.status(404).json({message: 'Movement does not exist'})
         }else{
            res.status(200).json(rows)
         }
      }
   });
});

router.delete('/:id', (req,res)=>{
   const {id} = req.params;
   con.query('DELETE FROM inputs WHERE id = ?', [id], (err, rows, fields)=>{
      if (err){
         res.status(500).json({message: 'Error deleting movement'})
      }else{
         if(rows.affectedRows == 1){
            res.status(200).json({message: 'Post successfully deleted'})
         }else{
            res.status(404).json({message: 'Post does not exist'})
         }
      }
   });
});

router.put('/:id', (req, res) => {
   const {id} = req.params;
   const data = {
      concept: req.body.concept,
      amount: req.body.amount,
      input_date: req.body.input_date
   }
   con.query('UPDATE inputs SET concept=?,amount=?,input_date=? WHERE id = ?', [data.concept, data.amount, data.input_date, id], (err, rows, result) => {
      if (err){
         res.status(500).json({message: 'Error updating movement'})
      }else{
         if(rows.affectedRows == 1){
            res.status(200).json({message: 'Post successfully updated'})
         }else{
            res.status(404).json({message: 'Post does not exist'})
         }
      }
   });
});

router.get('/filter/:input_type', function(req,res, next){
   const {input_type} = req.params;
      if (input_type == "All"){
         con.query('SELECT * FROM inputs ORDER BY id DESC', function(err, rows, fields){
            if (err){
               res.satus(500).json({message: 'Error getting all movements'})
            }else{
               res.json(rows);
            }
         });
      }else{
         con.query('SELECT * FROM inputs WHERE input_type=? ORDER BY id DESC', [input_type], function(err, rows, fields){
            if (err){
               res.status(500).json({message: 'Error getting type of movement'})
            }else{
               res.json(rows);
            }
         });
      }
});

router.get('/filter/Expense/:type_expense', function(req,res, next){
      const {type_expense} = req.params;
         if (type_expense == "All"){
            con.query('SELECT * FROM inputs WHERE input_type="Expense" ORDER BY id DESC', function(err, rows, fields){
               if (err){
                  console.log(err);
                  res.status(500).json({message: 'Error getting expense movements'});
               }else{
                  res.json(rows);
               }
            });
         }else{
            con.query('SELECT * FROM inputs WHERE type_expense=? ORDER BY id DESC', [type_expense], function(err, rows, fields){
               if (err){
                  console.log(err);
                  res.status(500).json({message: 'Error getting type of expense'});
               }else{
                  res.json(rows);
               }
         });
      }
});

module.exports=router;