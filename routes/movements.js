var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const con = require('../database');

/* GET page */
router.get('/', function(req, res, next) {
   res.render('movements', { title: 'Movimientos:' });  
});


/*-------------------------------- HOME PAGE -----------------------------*/
/*GET Balance */
router.get('/api/balance/', function(req,res, next){
   con.query('SELECT ((SELECT SUM(amount) AS incomes FROM inputs WHERE input_type = "Ingreso")-(SELECT SUM(amount) AS expenses FROM inputs WHERE input_type = "Gasto)) AS balance', function(err, rows, fields){
          if(err){
             console.log('Error');
          }else{
             res.json(rows);
          }
      });
});

/*GET last 10 movements */
router.get('/api/list/', function(req,res, next){
      con.query('SELECT * FROM inputs ORDER BY input_id DESC LIMIT 10', function(err, rows, fields){
          if(err){
             console.log('Error');
          }else{
             res.json(rows);
          }
      });
});

/*------------------------------ MOVEMENTS PAGE -------------------------*/
/*GET list */
router.get('/api/', function(req,res, next){
      con.query('SELECT * FROM inputs ORDER BY input_id DESC', function(err, rows, fields){
          if(err){
             console.log('Error');
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
             console.log('Error');
          }else{
             res.send(200);
          }
      });
});

/*Edit item */
router.put('/api/:input_id', (req, res) => {
    const {input_id} = req.params;
    con.query('UPDATE inputs SET ? WHERE input_id = ?', [request.body, input_id], (err, result) => {
          if(err){
             console.log('Error');
          }else{
             res.send(200);
          }
    });
});


/*GET type of operation */
router.get('/api/income/', function(req,res, next){
      con.query('SELECT * FROM inputs WHERE input_type = "Ingreso"', function(err, rows, fields){
          if(err){
             console.log('Error');
          }else{
             res.json(rows);
          }
      });
});

router.get('/api/expense/', function(req,res, next){
      con.query('SELECT * FROM inputs WHERE input_type = "Gasto"', function(err, rows, fields){
          if(err){
             console.log('Error');
          }else{
             res.json(rows);
          }
      });
});

/*----------------------------------- FORM PAGE ---------------------------*/
/* POST form */
router.post('/api/', (req,res,next)=>{
    console.log(req.body);
    var input = req.body;
    var sql = "INSERT INTO inputs(concept,amount,input_date, input_type) VALUES ('"+req.body.concept+"', '"+req.body.amount+"', '"+req.body.date+"', '"+req.body.type+"')";
    con.query(sql, function(err, result){
        if (err) throw err;
        console.log("1 entry added");
    });
    res.redirect('form');  // redirect to form page after inserting the data
});


module.exports=router;