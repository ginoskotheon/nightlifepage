'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
    consumerKey: String,
    consumerSecret: String,
    callbackURL: 'https://glacial-coast-36974.herokuapp.com/auth/twitter/callback'
  },
  user: String,
	id: String,
	venues: []
});

module.exports = mongoose.model('User', User);
