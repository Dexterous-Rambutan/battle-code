'use strict';

var _ = require('lodash');
//view strings
var STAGING = require('../constants').view.STAGING;
var LOGIN = require('../constants').view.LOGIN;
var SOLO_ARENA = require('../constants').view.SOLO_ARENA;
var CHALLENGE_ARENA = require('../constants').view.CHALLENGE_ARENA;
var PROFILE = require('../constants').view.PROFILE;
var SOLO_STAGING = require('../constants').view.SOLO_STAGING;
//action strings
var NAV_STAGING = require('../constants').action.NAV_STAGING;
var NAV_SOLO_ARENA = require('../constants').action.NAV_SOLO_ARENA;
var NAV_CHALLENGE_ARENA = require('../constants').action.NAV_CHALLENGE_ARENA;
var LOGOUT = require('../constants').action.LOGOUT;
var NAV_PROFILE = require('../constants').action.NAV_PROFILE;
var NAV_SOLO_STAGING = require('../constants').action.NAV_SOLO_STAGING;



function viewReducer (state, action){
  state = state || STAGING;
  switch (action.type){
    case NAV_STAGING:
      return STAGING;
    case NAV_SOLO_STAGING:
      return SOLO_STAGING;
    case NAV_SOLO_ARENA:
      return SOLO_ARENA;
    case NAV_CHALLENGE_ARENA:
      return CHALLENGE_ARENA;
    case LOGOUT:
      return LOGIN;
    case NAV_PROFILE:
      return PROFILE;
    default:
      return state;
  }
};

module.exports = viewReducer;
