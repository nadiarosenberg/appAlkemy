var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const con = require('../database');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'App de finanzas' });
});


module.exports = router;
