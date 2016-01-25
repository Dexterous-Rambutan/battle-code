'use strict';

var _ = require('lodash');

var initial = {
  problem_id: 0,
  content: "",
  opponent_content: ""
}

function arenaReducer (state){
  state = state || initial;
  return state;
};

module.exports = arenaReducer;
