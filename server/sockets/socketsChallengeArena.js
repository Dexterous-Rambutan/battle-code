// Socket matchmaking system here:
var challengeController = require('../challenges/challengeController.js');
var solutionController = require('../solutions/solutionController.js');
var matchController = require('../matches/matchController.js');
var findRoom = require('./findRoom.js');

module.exports = function (io) {

  var openQ = [];
  var roomCounter = 0;
  var pairOpenQ = [];
  var pairRoomCounter = 0;
  io.on('connection', function (socket) {
    socket.on('playerId', function(data){
      socket.to(findRoom(socket)).broadcast.emit('otherPlayer', data)
    })
    socket.on('won', function(data){
      socket.to(findRoom(socket)).broadcast.emit('won', data);
    });
    socket.on('update', function (data) {
      console.log('room is:', socket.rooms);
      socket.to(findRoom(socket)).broadcast.emit('keypress', data);
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
          if (challenge !== null) {
            //initialize the solutions so that there is record of attempt
            solutionController.initializeChallengeSolutions(otherPlayer, github_handle, challenge.id);
            matchController.addForBoth(otherPlayer, github_handle, challenge.id);
            // emit start event to this entire room
            io.to(String(existingRoom.name)).emit('start', challenge);
          } else {
            //initialize the solutions so that there is record of attempt
            challenge = {
              id: null,
              name: null,
              prompt: '/*Sorry we ran out of problems! \nPlease exit and re-enter the room to try again*/'
            }
            io.to(String(existingRoom.name)).emit('start', challenge);
          }
        });
      }
    });
    socket.on('leaveArena', function (data) {
      socket.leave(findRoom(socket));
      socket.to(findRoom(socket)).broadcast.emit('playerLeave', data)
      console.log('server.js line 117, Leaving room: ', findRoom(socket));
      if(openQ.length !== 0 && findRoom(socket) == openQ[0].name) {
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

    //----------Pair Socket Event Handlers ----------
    socket.on('pair', function (github_handle) {
      // if there aren't any open room, create a room and join it
      if (pairOpenQ.length === 0) {
        // create a room
        pairRoomCounter++;
        console.log('socketsChallenge line-98, Creating and joining new PAIR ROOM', roomCounter);
        socket.join(String(roomCounter));
        // add this room to the pairOpenQ
        pairOpenQ.push({
          name: roomCounter,
          players: [github_handle],
          socket_id: [socket.id]
        });
      // Otherwise, there is an open room, join that one
      } else {
        var existingRoom = pairOpenQ.shift();
        // join the first existing room
        console.log('server.js line-93, Joining existing room:', existingRoom.name);
        socket.join(String(existingRoom.name));
        // remove this room from the pairOpenQ and add to inProgressRooms
        // find all players in the room and find a challenge neither player has seen
        var otherPlayer = existingRoom.players[0];
        challengeController.getChallengeMultiplayer({
          body: {
            player1_github_handle: otherPlayer,
            player2_github_handle: github_handle,
            type: 'battle'
          }
        }, function (challenge) {
          if (challenge !== null) {
            //initialize the solutions so that there is record of attempt
            solutionController.initializeChallengeSolutions(otherPlayer, github_handle, challenge.id);
            matchController.addForBoth(otherPlayer, github_handle, challenge.id);
            // emit start event to this entire room
            io.to(String(existingRoom.name)).emit('start', challenge);
          } else {
            //initialize the solutions so that there is record of attempt
            challenge = {
              id: null,
              name: null,
              prompt: '/*Sorry we ran out of problems! \nPlease exit and re-enter the room to try again*/'
            }
            io.to(String(existingRoom.name)).emit('pair_up', challenge);
          }
        });
      }
    });

    socket.on('ready', function(data){
      socket.to(findRoom(socket)).broadcast.emit('ready', data);
    });

    socket.on('start_pair', function(startData) {
      solutionController.initializeChallengeSolutions(startData.opponent_github_handle, startData.user_github_handle, startData.challenge_id);
      socket.to(findRoom(socket)).broadcast.emit('start_pair', data);
    });

    socket.on('we_done', function(data){
      socket.to(findRoom(socket)).broadcast.emit('we_done', data);
    });

    socket.on('we_wrong', function(data){
      socket.to(findRoom(socket)).broadcast.emit('we_wrong', data);
    });

    //------------- WEBRTC -----------------------
    socket.on('webRTC', function(data) {
      socket.to(findRoom(socket)).broadcast.emit('webRTC', data);
    });

  });

}
