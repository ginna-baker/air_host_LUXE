'use strict';
// var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
// var app     = express();
// var controller = require('./../listing.controller');
var _ = require('lodash');
var Scrapeit = require('./scrapeit.model');

// Get list of scrapeits
exports.index = function(req, res) {
  Scrapeit.find(function (err, scrapeits) {
    if(err) { return handleError(res, err); }
    return res.json(200, scrapeits);
  });
};

// Get a single scrapeit
exports.show = function(req, res) {
  Scrapeit.findById(req.params.id, function (err, scrapeit) {
    if(err) { return handleError(res, err); }
    if(!scrapeit) { return res.send(404); }
    return res.json(scrapeit);
  });
};

// Creates a new scrapeit in the DB.
exports.create = function(req, res) {
    var url = req.body.url;
  // console.log(req);
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var cover, neighborhood, rating;
      var airbnbscrape = { cover : {data:Buffer, contentType: ""}, city : "", rating : ""};

      // $('.cover-img').filter(function(){
      //   airbnbscrape.cover = $(this);
      // });

      $('#neighborhood').filter(function(){
            var data = $(this);
            var city = data.children().first().text();
            airbnbscrape.city = city;
          });

      $('.star-rating').filter(function(){
          var data = $(this);
          var airbnbstar = data.children().first().children().length;
          airbnbscrape.airbnb_rating = airbnbstar;
          });
      // console.log(response);
      // airbnbscrape.toJSON();
      console.log(airbnbscrape);
     return res.json(airbnbscrape);
    }
  });
};

// Updates an existing scrapeit in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Scrapeit.findById(req.params.id, function (err, scrapeit) {
    if (err) { return handleError(res, err); }
    if(!scrapeit) { return res.send(404); }
    var updated = _.merge(scrapeit, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, scrapeit);
    });
  });
};

// Deletes a scrapeit from the DB.
exports.destroy = function(req, res) {
  Scrapeit.findById(req.params.id, function (err, scrapeit) {
    if(err) { return handleError(res, err); }
    if(!scrapeit) { return res.send(404); }
    scrapeit.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}