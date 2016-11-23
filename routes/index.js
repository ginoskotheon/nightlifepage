require('dotenv').config();
var express = require('express');
var path = require('path');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var yelp = require( '../config/oauth' );
var passportTwitter = require('../config/passport2');
var User = require('../models/users');
var Bars = require('../models/my_places');
var helpers = require('handlebars-helpers');

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


  router.get('/events', function( req, res ) {
    var loc = req.query.location;
    var path = req.url;
    console.log(path);
    req.session.url = req.url;

    var params = {terms: 'bar', location: loc, sort: 2 };
    yelp(params, function( error, response, body ) {
      if ( error ) {
        console.log( error );
      } else {
        var json = JSON.parse( body );
        req.session.body = body;
        var searchResults = req.session.body;
        // console.log(JSON.stringify(json));
        if (json.businesses === undefined) {
          console.log('Location not recognised, redirecting to /');
          res.redirect('/')
          return;
        };
        var locs = [];
        var locations = [];
        json.businesses.forEach(function(element){


        locs.push({"name": element.id, "going": false});
        locations.push(element.id);

          });
        var listoBars = {
          user: "William",
          location: json.businesses[0].location.city,
          venues: locs
          }
        };
        // console.log(locations);
        var searchedBars = new Bars(listoBars);

        searchedBars.save();
        // console.log(JSON.stringify(searchedBars));
        var savedSearch = [];
        Bars.findOne({"location": json.businesses[0].location.city }).then(function(result){
          result.venues.forEach(function(place){
            // console.log(place.name);
            savedSearch.push({"name": place.name, "going": place.going});
          });
          // console.log(savedSearch);
          res.render( 'user/events', { data: json, going: savedSearch, ref_path: path, user: req.user} );
        });

    });

  });
  router.get( '/eventslogged', function( req, res ) {
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
// var savedBars = [];
// function makeBars(barName) {
//   if (barName in savedBars){
//     console.log("already there!");
//   } else {
//     savedBars.push(barName);
//     console.log(savedBars);
//
//   }
//
// }

router.post('/process', function(req, res, next){
  var ans = req.body.userAttendingVenue;

  console.log(ans);
  // console.log(req.body.yelpId);
  var location = req.body.location;
  // console.log(location);
  Bars.findOne({"user": "William", location: location, "venues.name": req.body.yelpId}).then(function(result){

    // console.log("Result: ", JSON.stringify(result));
    if (ans === "Going"){
      Bars.update({"user": "William", "venues.name": req.body.yelpId}, { "$set": {"venues.$.going": true, upsert: true}}).then(function(result){
        console.log("1st Ans: ", result);
      });
    } else {
      Bars.update({"user": "William", "venues.name": req.body.yelpId}, { "$set": {"venues.$.going": false}}).then(function(result){
        console.log("2nd Ans: ", result);
        });
    }

  });

  res.redirect('back');
});

// router.get('/events', function(req,res,next){
//   res.render('user/events');
// });

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

// function getURL(req, res, next){
//
//   console.log("dude", req.session.url);
//   res.redirect('/login');
//   // return arr;
//   // return next();
// }
