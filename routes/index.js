require('dotenv').config();
var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser');
var request = require('request');
var mongoose = require('mongoose');
var objectId = new mongoose.Schema.ObjectId;
var bodyParser = require('body-parser');
var yelp = require( '../config/oauth' );
var passportTwitter = require('../config/passport2');
var Bars = require('../models/my_places');
var User = require('../models/users');
var session = require('express-session');



router.get('/', function(req, res, next){

  res.render('index', {title: 'index', layout: 'pre'});

});

router.get( '/events', function( req, res ) {
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

router.get('/login', function(req, res, next){
  res.render('user/login', {layout: 'pre'});
});

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.redirect(req.session.returnTo || '/');
    req.session.returnTo = null;
    delete req.session.returnTo;
    // res.render('user/home');
  });




  router.get('/home', isLoggedIn, function(req, res){
    res.render('user/home');

  });

  

  router.get( '/eventslogged', isLoggedIn, function( req, res ) {

    var loc = req.query.location;
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
          user: req.user,
          location: json.businesses[0].location.city,
          venues: locs
          }
        };
        // console.log(locations);
        var searchedBars = new Bars(listoBars);

        searchedBars.save();
        console.log(JSON.stringify(searchedBars.user));
        var savedSearch = [];
        Bars.findOne({"location": json.businesses[0].location.city }).then(function(result){
          result.venues.forEach(function(place){
            // console.log(place.name);
            savedSearch.push({"name": place.name, "going": place.going});
          });
          // console.log(savedSearch);
          res.render( 'user/eventslogged', { data: json, going: savedSearch} );
        });
    });

  });

  
router.post('/process', isLoggedIn, function(req, res, next){
  var ans = req.body.userAttendingVenue;
  console.log(ans);
  var aUser = req.user;
  console.log("Dude: ", aUser);
  console.log("yelp: ", req.body.yelpId);
  var location = req.body.location;
  // console.log(location);
  Bars.findOne({"user": req.user, "location": location}).then(function(result){

    console.log("Result: ", JSON.stringify(result));
    if (ans === "Going"){
      Bars.update({"location": location, "venues.name": req.body.yelpId}, { "$set": {"venues.$.going": true}}).then(function(result){
        console.log("1st Ans: ", result);
      });
    } else {
      Bars.update({"location": location, "venues.name": req.body.yelpId}, { "$set": {"venues.$.going": false}}).then(function(result){
        console.log("2nd Ans: ", result);
        });
    }

  });
  res.redirect('back');
});

// router.get('/eventslogged', isLoggedIn, function(req, res, next){
//   res.render('user/eventslogged')
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
  request.session.returnTo = request.path; 
  res.redirect('/');
}


function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
  return next();
  }
  res.redirect('/login');
}
