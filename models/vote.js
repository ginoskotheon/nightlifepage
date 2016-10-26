'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User2'},
  title: {type: String, unique:true},
  url: String,
  url2: String,
  options: [],
  voted: [],
  total: Number

}, {collection: voteSchema});

module.exports = mongoose.model('Vote', voteSchema);
