var io = require('socket.io-client');
var arenaAction = require('../actions/arenaActions');
//var stagingActions = require('../actions/stagingActions');

var socket = io('http://127.0.0.1:3000');
// should be stored on state herestore.dispatch(stagingActions.createSocket());

socket.on('start', function(data){
  store.dispatch(arenaAction.getProblem(data))
});

socket.on('eval', function(submissionMessage){
  console.log('eval here', submissionMessage);
  store.dispatch(arenaAction.handleSubmissionResponse(submissionMessage));
})

module.exports = socket;
