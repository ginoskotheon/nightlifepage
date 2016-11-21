'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bars = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  location: {type: String, unique: true},
  venues: [{name:String, going: Number}]


});

module.exports = mongoose.model('Bars', Bars);