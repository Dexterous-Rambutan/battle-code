'use strict';

var _ = require('lodash');

var CREATE_SOCKET = require('../constants').action.CREATE_SOCKET;
var GET_PROBLEM_SUCCESS = require('../constants').action.GET_PROBLEM_SUCCESS;

var initial = {
  problem_id: 0,
  content: "",
  opponent_content: "",
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
        content: payload.content,
        problem_id: payload.id
      });
    default:
      return state;
  }

};

module.exports = arenaReducer;
