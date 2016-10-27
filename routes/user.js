var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User2 = require('../models/users');
var csrf = require('csurf');
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcryptjs');

router.use(csrf());

router.get('/', function(req, res){
  res.render('/');

});

router.get('/home', isLoggedIn, function(req, res){
  res.render('user/home');

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
