var io = require('socket.io-client');
var arenaAction = require('../actions/arenaActions');


var socket = io();
socket.on('start', function(data){
  store.dispatch(arenaAction.getProblem(data));
});

socket.on('eval', function(submissionMessage){
  console.log('eval here', submissionMessage);
  store.dispatch(arenaAction.handleSubmissionResponse(submissionMessage));
});

module.exports = socket;
