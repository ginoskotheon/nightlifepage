var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Vote = require('../models/vote');
var User2 = require('../models/user2');
var csrf = require('csurf');
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcryptjs');

router.use(csrf());

router.get('/', function(req, res){
  res.render('/');

});



module.exports = router;
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
  res.redirect('/');
}


function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
  return next();
  }
  res.redirect('/');
}
