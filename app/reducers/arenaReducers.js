'use strict';

var _ = require('lodash');

var CREATE_SOCKET = require('../constants').action.CREATE_SOCKET;
var GET_PROBLEM_SUCCESS = require('../constants').action.GET_PROBLEM_SUCCESS;
var SUBMIT_PROBLEM_SUCCESS = require('../constants').action.SUBMIT_PROBLEM_SUCCESS;
var SUBMIT_PROBLEM_WRONG = require('../constants').action.SUBMIT_PROBLEM_WRONG;
var STORE_EDITOR = require('../constants').action.STORE_EDITOR;
var SYNTAX_ERROR = require('../constants').action.SYNTAX_ERROR;
var NO_SYNTAX_ERROR = require('../constants').action.NO_SYNTAX_ERROR;

var initial = {
  problem_id: 0,
  content: "",
  opponent_content: "",
  submissionMessage: "Nothing passing so far...(From initial arena reducer)",
  socket: {},
  editor: {},
  syntaxMessage: '',
  errors: []
}

function arenaReducer (state, action){
  state = state || initial;
  switch(action.type){
    case CREATE_SOCKET:
      return _.extend({},state,{
        socket: action.payload
      });
    case GET_PROBLEM_SUCCESS:
      return _.extend({}, state, {
        content: action.payload.content,
        problem_id: action.payload.id
      });
    case SUBMIT_PROBLEM_WRONG:
      return _.extend({}, state, {
        submissionMessage: action.payload
      });
    case STORE_EDITOR:
      return _.extend({}, state, {
        editor: action.payload
      });
    case SYNTAX_ERROR:
      return _.extend({}, state, {
        syntaxMessage: 'There are syntax errors in your code. Please fix them and re-submit.',
        errors: action.payload
      });
    case NO_SYNTAX_ERROR:
      return _.extend({}, state, {
        syntaxMessage: '',
        errors: []
      });
    default:
      return state;
  }

};

module.exports = arenaReducer;
