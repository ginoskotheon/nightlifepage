'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
    consumerKey: String,
    consumerSecret: String,
    callbackURL: String
  },
  user: String,
	id: String,
	venues: []
});

module.exports = mongoose.model('User', User);
