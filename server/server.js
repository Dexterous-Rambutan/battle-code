var port = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('./helpers/psConfig.js');
var session = require('express-session');
var redis = require('redis');
var client;
if(process.env.DEPLOYED) {
  client = redis.createClient(6379, 'redis');
} else {
  client = redis.createClient();
}
var redisClient = redis.createClient();
var challengeController = require('./challenges/challengeController');

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

// Socket matchmaking system here:
var openQ = [];
var roomCounter = 0;
io.on('connection', function (socket) {
   socket.on('update', function(data){
    console.log('room is:', socket.rooms)
    var room
    for(var key in socket.rooms){
      if(key[0] !== '/'){
        room = key[0];
      }
    }

    socket.to(room).broadcast.emit('keypress', data)
  })
  console.log('server.js line-76, Socket connected:', socket.id, socket.rooms);
  socket.on('arena', function (github_handle) {
    // if there aren't any open room, create a room and join it
    if (openQ.length === 0) {
      // create a room
      roomCounter++;
      console.log('server.js line-82, Creating and joining new room', roomCounter);
      socket.join(String(roomCounter));
      // add this room to the openQ
      openQ.push({
        name: roomCounter,
        players: [github_handle]
      });
    // Otherwise, there is an open room, join that one
    } else {
      var existingRoom = openQ.shift();
      // join the first existing room
      console.log('server.js line-93, Joining existing room:', existingRoom);
      socket.join(String(existingRoom.name));
      // remove this room from the openQ and add to inProgressRooms
      // find all players in the room and find a challenge neither player has seen
      var otherPlayer = existingRoom.players[0];
      challengeController.getChallengeMultiplayer({
        body: {
          player1_github_handle: otherPlayer,
          player2_github_handle: github_handle
        }
      }, function (challenge) {
        // emit start event to this entire room
        io.to(String(existingRoom.name)).emit('start', challenge);
      });
    }
  });
  socket.on('leaveArena', function(data){
    var room;
    for(var key in socket.rooms){
      if(key[0] !== '/'){
        room = key[0];
      }
    }
    socket.leave(room);
    console.log('server.js line 117, leaving room: ', room);
    if(openQ.length !== 0 && room === openQ[0]){
      openQ.shift();
    }
  });
  socket.on('disconnect', function () {
    console.log('server.js line-123, Client disconnected', socket.id);
    if(openQ.length !== 0){
      openQ.shift();
    }
  });
});
