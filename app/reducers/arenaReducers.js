'use strict';

var _ = require('lodash');

var actions = require('../constants').action;


var initial = {
  problem_id: 0,
  content: "",
  status: '',
  delay: 5,
  opponent_info: {},
  submissionMessage: "Nothing passing so far...(From initial arena reducer)",
  socket: {},
  editorSolo: {},
  opponentStatus: "waiting for other player... when prompt appears, you may begin hacking. be ready.",
  editorOpponent: {},
  syntaxMessage: '',
  leaderBoard: [],
  errors: [],
  stdout: ''
};

function arenaReducer (state, action){
  state = state || initial;
  switch(action.type){
    case actions.CREATE_SOCKET:
      return _.extend({},state,{
        socket: action.payload
      });
    case actions.GET_PROBLEM_SUCCESS:
      return _.extend({}, state, {
        content: action.payload.prompt,
        opponentStatus: '',
        problem_id: action.payload.id
      });
    case actions.DELAY_START:
      return _.extend({}, state, {
        opponentStatus: 'Player has joined. Challenge starting soon...',
        delay: 5
      });
    case actions.COUNTDOWN:
      var newDelay = state.delay-1;
      return _.extend({}, state, {
        delay: newDelay
      });
    case actions.SUBMIT_PROBLEM_WRONG:
      return _.extend({}, state, {
        submissionMessage: action.payload.message,
        stdout: action.payload.stdout
      });
    case actions.GET_LEADERBOARD_SUCCESS:
    console.log(action.payload)
      return _.extend({}, state, {
        leaderBoard: action.payload
      });
    case actions.SUBMIT_PROBLEM_SUCCESS:
      return _.extend({}, state, {
        submissionMessage: "Solution passed all tests!",
        stdout: action.payload.stdout
      });
    case actions.STORE_EDITOR:
      return _.extend({}, state, {
        editorSolo: action.payload,
      });
    case actions.STORE_EDITOR_OPPONENT:
      return _.extend({}, state, {
        editorOpponent: action.payload,
      });
    case actions.SYNTAX_ERROR:
      return _.extend({}, state, {
        syntaxMessage: 'There are syntax errors in your code. Please fix them and re-submit.',
        content: action.payload.solution_str,
        errors: action.payload.errors,
        submissionMessage: "Nothing passing so far...(From initial arena reducer)"
      });
    case actions.NO_SYNTAX_ERROR:
      return _.extend({}, state, {
        content: action.payload,
        syntaxMessage: '',
        errors: [],
        submissionMessage: "Nothing passing so far...(From initial arena reducer)"
      });
    case actions.STORE_SOLO_PROBLEM:
      return _.extend({}, state, {
        content: action.payload.prompt,
        problem_id: action.payload.id
      });
    case actions.CLEAR_INFO:
      return _.extend({}, state, {
        content: '',
        status: '',
        delay: 5,
        opponentStatus: "waiting for other player... when prompt appears, you may begin hacking. be ready.",
        submissionMessage: 'Nothing passing so far...(From initial arena reducer)',
        stdout: '',
        opponent_info: {}
      });
    case actions.COMPLETE_CHALLENGE:
      if(state.status !== 'YOU LOST :('){
        return _.extend({}, state, {
          status: 'YOU WON!'
        });
      } else {
        return state;
      }
    case actions.LOST_CHALLENGE:
      if(state.status !== 'YOU WON!') {
        return _.extend({}, state, {
          status: 'YOU LOST :(',
          content: action.payload
        });
      } else {
        return state;
      }
    case actions.PLAYER_LEAVE:
      return _.extend({}, state, {
        opponentStatus: 'The other player has left the room.',
        opponent_info: {},
        content: action.payload
      });
    case actions.GOT_OPPONENT_HANDLE:
      return _.extend({}, state, {
        opponent_info: action.payload
      });
    default:
      return state;
  }

};

module.exports = arenaReducer;
