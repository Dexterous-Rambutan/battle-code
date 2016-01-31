var port = process.env.PORT || 3000;
// console.log(process.env);

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('./helpers/psConfig.js');
var session = require('express-session');
var redis = require('redis');
var client;

if (process.env.DEPLOYED) {
  client = redis.createClient(6379, 'redis');
} else {
  client = redis.createClient();
}

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//////////// SESSION SECRETS ////////////////////
app.use(session({
  key: 'app.testS',
  secret: 'SEKR37',
  saveUninitialized:false,
  resave:false
}));

app.use(passport.initialize());
app.use(passport.session());

// middleware to check to see if user is logged in
var authUser = function(req, res, next){
  if (req.session.loggedIn) {
    next();
  } else if(req.url!=='/login' && req.url!=='/signup') {
    res.redirect('/login');
  } else {
    next();
  }
};

////////////////////////////////////////////////
require('./routes.js')(app, client);
////////////////////////////////////////////////

// Start server
var server = app.listen(port, function () {
  console.log('Server listening at port ', port);
});

// Start socket listener
var io = require('socket.io').listen(server);

// Start redisQueue listener for evaluated solutions
var solutionEvalResponse = require('./responseRedis/responseRedisRunner.js');
solutionEvalResponse(io);
