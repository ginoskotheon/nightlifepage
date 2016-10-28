var passport = require('passport');
var User = require('../models/users');
var configAuth = require('./auth');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});
passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
      name: profile.displayName
    };

   
    // update the user if s/he exists or add a new user
    User.findOne(searchQuery, function(err, user) {
      if(err) {
        return done(err);
      }

      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();

        newUser.twitter.name = profile.displayName;
        newUser.twitter.someID = profile.id;
        venues = [];


        newUser.save(function (err) {
          if (err) {
            throw err;
          }

          return done(null, newUser);
        });
      }
    });
  }

));
module.exports = passport;
