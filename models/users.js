'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
    user: String,
	  id: String,
  },
  
	venues: []
});

module.exports = mongoose.model('User', User);
