'use strict';

var express = require('express');
var router = express.Router();
var env = require('../local.env.js');

router.get('/v2/search', function(req, res, next) {
})

var term = 'search?term'+frontEndTerm.join("+");
var location = 'location='+ frontEndLocation.join("+");

var httpMethod = 'GET',
url = 'http://api.yelp.com/'+term + '&'+location,
parameters = {
  oauth_consumer_key : process.env.yelpAuth.CONSUMER_KEY,
  oauth_token : process.env.yelpAuth.TOKEN,
  oauth_nonce : 'kllo9940pd9333jh',
  oauth_timestamp : new Day(now),
  oauth_signature_method : 'HMAC-SHA1',
  oauth_version : '1.0'
}

consumerSecret = process.env.yelpAuth.CONSUMER_SECRET;
tokenSecret = process.env.yelpAuth.TOKEN_SECRET;

oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret)

module.exports = router;

