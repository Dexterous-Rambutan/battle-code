'use strict';

var _ = require('lodash');

var actions = require('../constants').action;


var initial = {
  problem_id: 0,
  content: "",
  status: '',
  opponent_content: "",
  submissionMessage: "Nothing passing so far...(From initial arena reducer)",
  socket: {},
  editorSolo: {},
  opponentStatus: "waiting for other player... when propmt appears, you may begin hacking. be ready.",
  editorOpponent: {},
  syntaxMessage: '',
  errors: [],
  stdout: ''
}

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
    case actions.SUBMIT_PROBLEM_WRONG:
      return _.extend({}, state, {
        submissionMessage: action.payload.message,
        stdout: action.payload.stdout
      });
    case actions.SUBMIT_PROBLEM_SUCCESS:
      return _.extend({}, state, {
        submissionMessage: "solution submitted successfully with passing results..."
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
        errors: action.payload.errors
      });
    case actions.NO_SYNTAX_ERROR:
      return _.extend({}, state, {
        content: action.payload,
        syntaxMessage: '',
        errors: []
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
        opponentStatus: "waiting for other player... when propmt appears, you may begin hacking. be ready.",
        submissionMessage: 'Nothing passing so far...(From initial arena reducer)',
        stdout: ''
      });
    case actions.COMPLETE_CHALLENGE:
      if(state.status === ''){
        return _.extend({}, state, {
          status: 'YOU WON!'
        });
      }
    case actions.LOST_CHALLENGE:
        return _.extend({}, state, {
          status: 'YOU LOST :('
        });
    case actions.PLAYER_LEAVE:
        return _.extend({}, state, {
          opponentStatus: 'The other player has left the room.'
        });
    default:
      return state;
  }

};

module.exports = arenaReducer;
