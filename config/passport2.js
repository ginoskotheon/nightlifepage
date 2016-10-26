var passport = require('passport');
var User = require('../models/users');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User2.findById(id, function(err, user){
    done(err, user);
  });
});
passport.use(new TwitterStrategy({
    consumerKey: process.env.twitconsumerKey,
    consumerSecret: process.env.twitconsumerSecret,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));
