var io = require('socket.io-client');
var arenaAction = require('../actions/arenaActions');
var actions = require('../constants').action;
//var stagingActions = require('../actions/stagingActions');

var socket = io();
// should be stored on state herestore.dispatch(stagingActions.createSocket());

socket.on('start', function (data) {
  var player = {
    github_handle: store.getState().user.github_handle,
    github_display_name: store.getState().user.github_display_name,
    github_profile_url: store.getState().user.github_profile_url,
    github_avatar_url: store.getState().user.github_avatar_url
  };
  socket.emit('playerId', player);
  store.dispatch({
    type: actions.DELAY_START
  })
  setTimeout(function(){
      return store.dispatch({
        type: actions.GET_PROBLEM_SUCCESS,
        payload: data
      });
     }, 5000);

});

socket.on('keypress', function (data) {
  var array = data.split('');
  var obf = [];
  for(var i =0; i<array.length;i++) {
    if (array[i] === ' ' || array[i] === '\n' || array[i] === ')' || array[i] === '(' || array[i] === '{' || array[i] === '}') {
      obf.push(array[i]);
    } else {
      obf.push(String.fromCharCode(Math.floor(Math.random() * 52) + 65 ));
    }
  }
  store.getState().arena.editorOpponent.setValue(obf.join(''));
});


socket.on('playerLeave', function (data) {
  store.dispatch(arenaAction.playerLeave(store.getState().arena.editorSolo.getSession().getValue()));
});

socket.on('otherPlayer', function (data) {
  store.dispatch({
    type: actions.GOT_OPPONENT_HANDLE,
    payload: data
  });
});

socket.on('eval', function (submissionMessage) {
  if(submissionMessage.message === 'victory!') {
    socket.emit('won', null);
  }
  console.log(submissionMessage.challenge_id  )
  store.dispatch(arenaAction.handleSubmissionResponse(submissionMessage, submissionMessage.challenge_id));
  store.dispatch(arenaAction.getLeaderBoard(submissionMessage.challenge_id));
});

socket.on('won', function (data) {
  var cursor = store.getState().arena.editorSolo.selection.getCursor();
  store.dispatch(arenaAction.lostChallenge(store.getState().arena.editorSolo.getSession().getValue()));
  store.getState().arena.editorSolo.moveCursorTo(cursor.row, cursor.column);
});

module.exports = socket;
