'use strict';

var _ = require('lodash');
//view strings
var STAGING = require('../constants').view.STAGING
var LOGIN = require('../constants').view.LOGIN


//action strings
var NAV_STAGING = require('../constants').action.NAV_STAGING;
var LOGOUT = require('../constants').action.LOGOUT;


function viewReducer (state, action){
  state = state || LOGIN;
  switch (action.type){
    case NAV_STAGING:
      return STAGING;
    case LOGOUT:
      return LOGIN;
    default:
      return state;
  }
};

module.exports = viewReducer;
