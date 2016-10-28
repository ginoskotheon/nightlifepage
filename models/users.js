'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({

    name: String,
	someID: String,
	venues: []
});

module.exports = mongoose.model('User', User);
