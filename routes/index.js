var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
  res.status(200).json({title: 'App de Finanzas'});
});

module.exports = router;
