const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const con = require('../database');

/* GET form */
router.get('/', (req,res,next)=>{
    res.render('form');
});


module.exports = router;
