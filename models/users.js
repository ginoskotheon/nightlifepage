'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
    consumerKey: String,
    consumerSecret: String,
    callbackURL: String
  }
});

module.exports = mongoose.model('User', User);
