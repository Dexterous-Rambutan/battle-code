'use strict';

var _ = require('lodash');
//view strings
var STAGING = require('../constants').view.STAGING;
var LOGIN = require('../constants').view.LOGIN;
var SOLO_ARENA = require('../constants').view.SOLO_ARENA;
var CHALLENGE_ARENA = require('../constants').view.CHALLENGE_ARENA;

//action strings
var NAV_STAGING = require('../constants').action.NAV_STAGING;
var NAV_SOLO_ARENA = require('../constants').action.NAV_SOLO_ARENA;
var NAV_CHALLENGE_ARENA = require('../constants').action.NAV_CHALLENGE_ARENA;
var LOGOUT = require('../constants').action.LOGOUT;


function viewReducer (state, action){
  state = state || STAGING;
  switch (action.type){
    case NAV_STAGING:
      return STAGING;
    case NAV_SOLO_ARENA:
      return SOLO_ARENA;
    case NAV_CHALLENGE_ARENA:
      return CHALLENGE_ARENA;
    case LOGOUT:
      return LOGIN;
    default:
      return state;
  }
};

module.exports = viewReducer;
