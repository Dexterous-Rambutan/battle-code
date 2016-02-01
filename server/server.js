var port = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('./helpers/psConfig.js');
var session = require('express-session');
var redis = require('redis');
var redisClient = redis.createClient();

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
require('./routes.js')(app, redisClient);
////////////////////////////////////////////////

// Start server
var server = app.listen(port, function () {
  console.log('Server listening at port ', port);
});

// Start socket listener
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
  socket.on('update', function(data){
    socket.broadcast.emit('keypress', data)
  })
console.log('connected socket')
})


// Start redisQueue listener for evaluated solutions
var solutionEvalResponse = require('./responseRedis/responseRedisRunner.js');
solutionEvalResponse(io);
