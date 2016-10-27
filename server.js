
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var validator = require('express-validator');
var request = require('request');
var Yelp = require('yelp');
var OAuth = require('oauth');

var routes = require('./routes/index');
var userRoutes = require('./routes/user');
var oauthRoute = require('./config/oauth');

var app = express();





require('dotenv').load();
// require('./config/passport')(passport);
require('./config/passport2');

mongoose.connect('localhost:27017/nightlife');

//view engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middle ware
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'twitterRouter',
  resave: false,
  saveUnintialized: false,
  cookie: {secure: false,
  maxAge: 180 * 60 * 1000}
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//static files
app.use(express.static(__dirname + '/public'));

//fire controller

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  next();
});
// app.use('/config', oauthRoute);

app.use('/user', userRoutes);
app.use('/', routes);


//listen to port

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + 'press Ctrl-C to terminate');
});

module.exports = app;
