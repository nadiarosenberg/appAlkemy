var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const con = require('../config/database');
const bodyParser = require('body-parser');

/* GET page */
router.get('/', function(req, res, next) {
   res.render('movements', { title: 'Movimientos:' });  
});


/*-------------------------------- HOME PAGE -----------------------------*/
/*GET Balance */
router.get('/api/balance/', function(req,res, next){
   con.query('SELECT ((SELECT SUM(amount) AS incomes FROM inputs WHERE input_type = "Income")-(SELECT SUM(amount) AS expenses FROM inputs WHERE input_type = "Expense")) AS balance', function(err, rows, fields){
          if(err){
             console.log('Error getting balance');
             res.json(JSON.stringify(err));
          }else{
             res.json(rows[0]);
          }
      });
});

/*GET last 10 movements */
router.get('/api/list/', function(req,res, next){
      con.query('SELECT * FROM inputs ORDER BY input_date DESC LIMIT 10', function(err, rows, fields){
          if(err){
             console.log('Error getting last 10 movements ');
          }else{
             res.json(rows);
          }
      });
});

/*------------------------------ MOVEMENTS PAGE -------------------------*/
/*GET complete list */
router.get('/api/', function(req,res, next){
      con.query('SELECT * FROM inputs ORDER BY input_date DESC', function(err, rows, fields){
          if(err){
             console.log('Error getting list');
          }else{
             res.json(rows);
          }
      });
});

/*GET item */
router.get('/api/:input_id', function(req,res, next){
      const {input_id} = req.params;
      con.query('SELECT * FROM inputs WHERE input_id = ?', [input_id], (err, rows, fields)=>{
          if(err){
             console.log('Error getting item');
          }else{
             res.json(rows);
          }
      });
});

/*Delete item*/
router.delete('/api/:input_id', (req,res)=>{
      const {input_id} = req.params;
      con.query('DELETE FROM inputs WHERE input_id = ?', [input_id], (err, rows, fields)=>{
          if(err){
             console.log('Error deleting item');
          }else{
             res.send(200);
          }
      });
});

/*Edit item */
router.put('/api/:input_id', (req, res) => {
    const {input_id} = req.params;
   const concept = req.body.concept;
    const amount = req.body.amount;
    const input_date = req.body.input_date;
    //const input_type = req.body.input_type;
    con.query('UPDATE inputs SET concept=?,amount=?,input_date=? WHERE input_id = ?', [concept, amount, input_date, input_id], (err, result) => {
          if(err){
             console.log('Error editing item');
          }else{
             res.send(200);
          }
    });
});

/*GET type */
router.get('/api/filter/:input_type', function(req,res, next){
      const {input_type} = req.params;
         if (input_type == "All"){
                  con.query('SELECT * FROM inputs ORDER BY input_id DESC', function(err, rows, fields){
            if(err){
               console.log('Error getting all movements');
            }else{
               res.json(rows);
            }
         });
      }else{
         con.query('SELECT * FROM inputs WHERE input_type=? ORDER BY input_id DESC', [input_type], function(err, rows, fields){
          if(err){
             console.log('Error getting type of movement');
          }else{
             res.json(rows);
          }
      });
      }
});

/*GET sub-type */
router.get('/api/filter/subfilter/:type_expense', function(req,res, next){
      const {type_expense} = req.params;
         if (type_expense == "All_expenses"){
                  con.query('SELECT * FROM inputs WHERE input_type="Expense" ORDER BY input_id DESC', function(err, rows, fields){
            if(err){
               console.log('Error getting expense movements');
            }else{
               res.json(rows);
            }
         });
      }else{
         con.query('SELECT * FROM inputs WHERE type_expense=? ORDER BY input_id DESC', [type_expense], function(err, rows, fields){
          if(err){
             console.log('Error getting type of expense');
          }else{
             res.json(rows);
          }
      });
      }
});


/*----------------------------------- FORM PAGE ---------------------------*/
/* POST form */
router.post('/api/import/', (req,res,next)=>{
    const concept = req.body.concept;
    const amount = req.body.amount;
    const input_date = req.body.input_date;
    const input_type = req.body.input_type;
    const type_expense = req.body.type_expense;
    var sql = "INSERT INTO inputs(concept,amount,input_date, input_type, type_expense) VALUES (?,?,?,?,?)";
    con.query(sql, [concept, amount, input_date, input_type, type_expense], (err, result)=>{
        if (err) throw err;
        console.log("1 entry added");
         res.send(200);
    });
});


module.exports=router;