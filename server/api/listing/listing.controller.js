/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /listings              ->  index
 * POST    /listings              ->  create
 * GET     /listings/:id          ->  show
 * PUT     /listings/:id          ->  update
 * DELETE  /listings/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Listing = require('./listing.model');

// Get list of things
exports.index = function(req, res) {
  Listing.find(function (err, listings) {
    if(err) { return handleError(res, err); }
    return res.json(200, listings);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Listing.findById(req.params.id, function (err, listing) {
    if(err) { return handleError(res, err); }
    if(!listing) { return res.send(404); }
    return res.json(listing);
  });
};

// Creates a new listing in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Listing.create(req.body, function(err, listing) {
    if(err) { return handleError(res, err); }
    return res.json(201, listing);
  });
};

// Updates an existing listing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Listing.findById(req.params.id, function (err, listing) {
    if (err) { return handleError(res, err); }
    if(!listing) { return res.send(404); }
    var updated = _.merge(listing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, listing);
    });
  });
};

exports.foruser = function(req, res){
  Listing.find({"user._id": req.params.id}, function(err, result) {
      res.json(result);
  })
}

// Deletes a listing from the DB.
exports.destroy = function(req, res) {
  Listing.findById(req.params.id, function (err, listing) {
    if(err) { return handleError(res, err); }
    if(!listing) { return res.send(404); }
    listing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}