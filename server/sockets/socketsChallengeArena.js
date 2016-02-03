// Socket matchmaking system here:
var challengeController = require('../challenges/challengeController.js')
var solutionController = require('../solutions/solutionController.js')
var matchController = require('../matches/matchController.js')

module.exports = function (io) {

  var openQ = [];
  var roomCounter = 0;
  io.on('connection', function (socket) {
    socket.on('won', function(data){
      var room;
      for(var key in socket.rooms){
        if(key[0] !== '/'){
          room = key[0];
        }
      }
      socket.to(room).broadcast.emit('won', data);
    });
    socket.on('update', function (data) {
      console.log('room is:', socket.rooms);
      var room;
      for(var key in socket.rooms){
        if(key[0] !== '/'){
          room = key[0];
        }
      }
      socket.to(room).broadcast.emit('keypress', data);
    });

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
          players: [github_handle],
          socket_id: [socket.id]
        });
      // Otherwise, there is an open room, join that one
      } else {
        var existingRoom = openQ.shift();
        // join the first existing room
        console.log('server.js line-93, Joining existing room:', existingRoom.name);
        socket.join(String(existingRoom.name));
        // remove this room from the openQ and add to inProgressRooms
        // find all players in the room and find a challenge neither player has seen
        var otherPlayer = existingRoom.players[0];
        challengeController.getChallengeMultiplayer({
          body: {
            player1_github_handle: otherPlayer,
            player2_github_handle: github_handle,
            type: 'battle'
          }
        }, function (challenge) {
          //initialize the solutions so that there is record of attempt
          solutionController.initializeChallengeSolutions(otherPlayer, github_handle, challenge.id);
          matchController.addForBoth(otherPlayer, github_handle, challenge.id);
          // emit start event to this entire room
          io.to(String(existingRoom.name)).emit('start', challenge);
        });
      }
    });
    socket.on('leaveArena', function (data) {
      var room;
      for (var key in socket.rooms) {
        if (key[0] !== '/') {
          room = key[0];
        }
      }
      socket.leave(room);
      socket.to(room).broadcast.emit('playerLeave', data)
      console.log('server.js line 117, Leaving room: ', room);
      if(openQ.length !== 0 && room == openQ[0].name) {
        openQ.shift();
      }
    });
    socket.on('disconnect', function () {
      if (openQ[0]) {
        if (openQ[0]['socket_id'][0] == socket.id) {
          console.log('Client disconnected prior to starting a challenge,', socket.id);
          openQ.shift();
        }
      } else {
        console.log('Client disconnected after having started a challenge', socket.id);
      }
    });
  });

}
