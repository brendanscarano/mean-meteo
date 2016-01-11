(function() {
 
  'use strict';
  var express = require('express');
  var router  = express.Router();
  var request = require('request');
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/weather/:lat/:lng', function(req, res) {

    console.log('hitting weather route');
    console.log(req.params);

    res.send('sending back weather data');

  });
 
  module.exports = router;
 
}());