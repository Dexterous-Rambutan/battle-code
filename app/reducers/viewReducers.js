'use strict';

var _ = require('lodash');
//view strings
var STAGING = require('../constants').view.STAGING;
var LOGIN = require('../constants').view.LOGIN;
var ARENA = require('../constants').view.ARENA;

//action strings
var NAV_STAGING = require('../constants').action.NAV_STAGING;
var NAV_ARENA = require('../constants').action.NAV_ARENA;
var LOGOUT = require('../constants').action.LOGOUT;


function viewReducer (state, action){
  state = state || STAGING;
  switch (action.type){
    case NAV_STAGING:
      return STAGING;
    case NAV_ARENA:
      return ARENA;
    case LOGOUT:
      return LOGIN;
    default:
      return state;
  }
};

module.exports = viewReducer;
