'use strict';

var _ = require('lodash');

var CREATE_SOCKET = require('../constants').action.CREATE_SOCKET;
var GET_PROBLEM_SUCCESS = require('../constants').action.GET_PROBLEM_SUCCESS;
var SUBMIT_PROBLEM_SUCCESS = require('../constants').action.SUBMIT_PROBLEM_SUCCESS;
var SUBMIT_PROBLEM_WRONG = require('../constants').action.SUBMIT_PROBLEM_WRONG;


var initial = {
  problem_id: 0,
  content: "",
  opponent_content: "",
  submissionMessage: "Nothing passing so far...(From initial arena reducer)",
  socket: {}
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
    default:
      return state;
  }

};

module.exports = arenaReducer;
