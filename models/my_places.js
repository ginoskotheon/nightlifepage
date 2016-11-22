'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bars = new Schema({
  user: String,
  location: {type: String, unique: true},
  venues: [{name:String, going: Number}]


});

module.exports = mongoose.model('Bars', Bars);

// module.exports = function Cart(){
//   this.items = [];
//
//   this.add = function(item,id){
//
//
//   }
// }
