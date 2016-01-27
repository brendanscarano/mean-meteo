/**
YARGS 

var argv = require('yargs');
NODE --DEV look for dev flag to run local index.html otherwise run it in prod
*/

(function() {
 
  'use strict';
  var express = require('express');
  var router  = express.Router();
  var request = require('request');
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('../../index');
  });

  router.get('/address/:lat/:lng', function(req, res) {

    const latitude = req.params.lat;

    const longitude = req.params.lng;

    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude, function(error, response, body) {

      res.send(response);

    });

  })

  router.get('/weather/:lat/:lng', function(req, res) {

    var latitude = req.params.lat;

    var longitude = req.params.lng;

    request('https://api.forecast.io/forecast/a1bfca2cfb7db1f70eaaa31ebf6251d5/' + latitude + ',' + longitude, function(error, response, body) {

      res.send(response);

    });

  });
 
  module.exports = router;
 
}());