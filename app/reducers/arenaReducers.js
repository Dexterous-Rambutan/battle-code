'use strict';

var _ = require('lodash');

var actions = require('../constants').action;


var initial = {
  problem_id: 0,
  content: "",
  opponent_content: "",
  submissionMessage: "Nothing passing so far...(From initial arena reducer)",
  socket: {},
  editorSolo: {},
  editorOpponent: {},
  syntaxMessage: '',
  errors: []
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
        problem_id: action.payload.id
      });
    case actions.SUBMIT_PROBLEM_WRONG:
      return _.extend({}, state, {
        submissionMessage: action.payload
      });
    case actions.SUBMIT_PROBLEM_SUCCESS:
      return _.extend({}, state, {
        submissionMessage: "Victory!"
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
        errors: action.payload
      });
    case actions.NO_SYNTAX_ERROR:
      return _.extend({}, state, {
        syntaxMessage: '',
        errors: []
      });
    case actions.STORE_SOLO_PROBLEM:
      return _.extend({}, state, {
        content: action.payload.prompt,
        problem_id: action.payload.id
      });
    case actions.CLEAR_EDITOR:
      return _.extend({}, state, {
        content: ''
      });
    default:
      return state;
  }

};

module.exports = arenaReducer;
