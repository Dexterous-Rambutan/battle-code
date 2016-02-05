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
    github_profileUrl: store.getState().user.github_profileUrl,
    github_avatar_url: store.getState().user.github_avatar_url
  };
  socket.emit('playerId', player);
  store.dispatch({
    type: actions.GET_PROBLEM_SUCCESS,
    payload: data
  });
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
  store.dispatch(arenaAction.playerLeave());
});

socket.on('otherPlayer', function (data) {
  store.dispatch({
    type: actions.GOT_OPPONENT_HANDLE,
    payload: data
  });
});

socket.on('eval', function (submissionMessage, challenge_id) {
  if(submissionMessage.message === 'victory!') {
    socket.emit('won', null);
  }
  store.dispatch(arenaAction.handleSubmissionResponse(submissionMessage, challenge_id));
});

socket.on('won', function (data) {
  var cursor = store.getState().arena.editorSolo.selection.getCursor();
  store.dispatch(arenaAction.lostChallenge(store.getState().arena.editorSolo.getSession().getValue()));
  store.getState().arena.editorSolo.moveCursorTo(cursor.row, cursor.column);
});

socket.on('syntaxErrors', function (syntaxErrors) {
  store.dispatch(arenaAction.storeSyntaxError({
    solution_str: store.getState().arena.editorSolo.getSession().getValue(),
    errors: syntaxErrors
  }));
});

socket.on('pair_eval', function (submissionMessage, challenge_id) {
  socket.emit('pair_evaled', submissionMessage, challenge_id);
});

socket.on('pair_evaled', function (submissionMessage, challenge_id) {
  store.dispatch(arenaAction.pairSubmission(store.getState().arena.editorSolo.getSession().getValue()));
  store.dispatch(arenaAction.handleSubmissionResponse(submissionMessage, challenge_id));
});

socket.on('ready', function () {
  // Check to see if I'm ready. If so, we emit start pair
  if(store.getState().arena.iAmReady) {
    socket.emit('start_pair', {
      user_github_handle: store.getState().user.github_handle,
      opponent_github_handle: store.getState().arena.opponent_info.github_handle,
      challenge_id: store.getState().arena.pairProblem_id
    });
  }
});

socket.on('start_pair', function () {
  store.dispatch({
    type: actions.START_PAIR
  });
});

socket.on('pair_up', function (challenge) {
  var player = {
    github_handle: store.getState().user.github_handle,
    github_display_name: store.getState().user.github_display_name,
    github_profileUrl: store.getState().user.github_profileUrl,
    github_avatar_url: store.getState().user.github_avatar_url
  };
  socket.emit('playerId', player);
  store.dispatch({
    type: actions.GET_PAIR_SUCCESS,
    payload: challenge
  });
});

module.exports = socket;
