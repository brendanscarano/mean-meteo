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

    var latitude = req.params.lat;

    var longitude = req.params.lng;

    request('https://api.forecast.io/forecast/a1bfca2cfb7db1f70eaaa31ebf6251d5/' + latitude + ',' + longitude, function(error, response, body) {

      res.send(response);

    });

  });
 
  module.exports = router;
 
}());