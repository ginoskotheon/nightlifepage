require('dotenv').config();
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var request = require('request');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var yelp = require( '../config/oauth' );
var passportTwitter = require('../config/passport2');


router.get('/', function(req, res, next){

  res.render('index', {title: 'index', layout: 'pre'});

});


router.get('/login', function(req, res, next){
  res.render('user/login', {layout: 'pre'});
});

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication

    res.render('home');
  });

  router.get('/home', isLoggedIn, function(req, res){
    res.render('user/home');

  });

  router.get( '/search', function( req, res ) {
    var loc = req.query.location;
    var params = {terms: 'bar', location: loc, sort: 2 };
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


        res.render( 'user/events', { data: json, layout: 'pre' } );

      }
    });

  });
  router.get( '/searchlogged', isLoggedIn, function( req, res ) {
    var loc = req.query.location;
    var params = {terms: 'bar', location: loc, sort: 2 };
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

        res.render('user/eventslogged', { data: json})

      }
    });

  });

// router.get('/eventslogged', function(req,res,next){
//   res.render('user/eventslogged');
// });


router.post('/process', function(req, res, next){


    res.redirect('user/eventslogged');
});

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

module.exports = router;
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
  res.redirect('/');
}


function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
  return next();
  }
  res.redirect('/');
}
