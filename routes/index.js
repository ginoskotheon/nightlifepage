var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var request = require('request');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var yelp = require( '../config/oauth' );


router.get('/', function(req, res, next){

  res.render('index', {title: 'index', layout: 'pre'});

});

router.get( '/search', function( req, res ) {
  var loc = req.query.location;
  var params = { location: loc, sort: 2 };
  yelp(params, function( error, response, body ) {
    if ( error ) {
      console.log( error );
    } else {
      var json = JSON.parse( body );
      if (json.businesses === undefined) {
        console.log('Location not recognised, redirecting to /');
        res.redirect('/')
        return;
      };
      // console.log(json);
      // res.send(json.businesses[0].location);

      res.render( 'user/events', { data: json, layout: 'pre' } );
    }
  });

});

router.get('/login', function(req, res, next){
  res.render('user/login');
});

module.exports = router;
