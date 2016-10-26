var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Vote = require('../models/vote');
var User2 = require('../models/user2');

var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcryptjs');

var csrf = require('csurf');


router.use(csrf());
// router.use(session({
//   secret: 'votingrouter',
//   resave: false,
//   saveUnintialized: true,
//   cookie: { secure: false,
//   maxAge: 3 * 60000 }
// }));


// router.use(function(req, res, next){
//   if(req.session && req.session.user){
//     User2.findOne({email: req.session.user.email }, function(err, user){
//       if(user) {
//         req.user = user;
//         delete req.user.password;
//         req.session.user = req.user;
//         res.locals.user = req.user;
//       }
//       next();
//     });
//   } else {
//     next();
//   }
// });
//
// function isLoggedIn (req, res, next) {
// 	if (!req.user) {
// 		res.redirect('/login')
// 	} else {
// 		next();
// 	}
// }

//
//
// router.get('/login', function(req, res){
//
//   res.render('login', {csrfToken: req.csrfToken(), title: 'login', layout: 'pre'});
//
// });
//
// router.post('/login', function(req, res, next){
//
//   User2.findOne({email: req.body.email}, function(err, user){
//     if(!user) {
//       res.render('login', {error: "invalid email or password"});
//     } else {
//       if(bcrypt.compareSync(req.body.password, user.password)){
//         req.session.user = user;
//         res.redirect('home');
//
//       } else {
//         res.render('login', {error: "invalid email or password"});
//       }
//     }
//
//   });
// });

router.get('/register', function(req, res){

  res.render('register', { title: 'register', layout: 'pre',  csrfToken: req.csrfToken() });
});

router.post('/register', passport.authenticate('local.signup', {
  successRedirect: '/home',
  failureRedirect: '/register',
  failureFlash: true
}));


//
// router.get('/home', isLoggedIn, function(req, res){
//   res.render('home');
//
// });
//
// router.get('/vote', isLoggedIn, function(req, res){
//   res.render('vote', {csrfToken: req.csrfToken()});
// });
//
// router.post('/polled', isLoggedIn, function(req,res){
//
//   var arr = [];
//   for (i in req.body.opts){
//     arr.push({"name": req.body.opts[i], votes: 0});
//   }
//   // console.log(arr);
//
//   var title = req.body.title.replace(/\s/g, "-");
//   var marks = title.replace("?", "%3F")
//   var marked =req.body.title.replace("?", "%3F");
//
//   var item = {
//     title: req.body.title,
//     url: "localhost:3000/polled/"+ marks,
//     url2: "/results/" + marked,
//     options: req.body.opts,
//     voted: arr
//   }
//   var poll = new Vote(item);
//   poll.save();
//   poll.user = req.user._id;
//   console.log('id', poll.id);
//   console.log("polling down: ", poll);
//
//   res.render('url', { poll: poll});
// });
//
// router.get('/polled/:title', function(req, res){
//   var title = req.params.title.replace(/-/g, " ");
//   console.log(title);
//   Vote.find({title: title}).then(function(doc){
//
//
//     res.render('polled', {data: doc});
//   });
// });
//
// router.use(function(req,res,next){
//   console.log('Looking for URL: ' + req.url);
//   next();
// });
//
// router.use(function(err, req, res, next){
//   console.log('Error: ' + err.message);
//   next();
// });
//
// router.get('/about', isLoggedIn, function(req, res){
//   res.render('about');
// });
//
//
//
// router.post('/voted', function(req, res){
//
//   var choose = req.body.chosen
//   var title = req.body.titles
//   console.log('title: ', choose);
//   Vote
//     .findOneAndUpdate({"title":  req.body.titles, "voted.name": req.body.chosen}, { "$inc": { "voted.$.votes": 1 } }, { upsert: true }).then(function(result){
//
//       console.log(result);
//     res.redirect(303, 'results/'+ title.replace('?', '%3F'));
//
//   });
//
// });
//
// router.get('/pollList', isLoggedIn, function(req, res){
//   Vote.find().then(function(doc){
//     // console.log(doc);
//   res.render('pollList', {poll: doc});
//   });
//
// });
//
//
// router.get('/results', function(req, res){
//
//   Vote.find().then(function(doc){
//     // console.log(JSON.stringify(doc));
//     res.render('results', {poll: doc});
//   });
//
// });
//
// router.get('/results/:title', function(req, res){
//   var title = req.params.title;
//   Vote.find({"title":title}).then(function(doc){
//     // console.log(JSON.stringify(doc));
//     res.render('results', {poll: doc});
//   });
//
// });
//
// router.get('/thankyou', function(req,res){
//   res.render('thankyou');
// });
//
//
// router.delete('/polled/:item', function(req,res){
//   Vote.find({title: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
//     if (err) throw err;
//     console.log(JSON.stringify(data));
//     res.json(data);
//   });
// });
//
// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });
