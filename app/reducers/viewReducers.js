'use strict';

var _ = require('lodash');
//view strings
var views = require('../constants').view
var actions = require('../constants').action;




function viewReducer (state, action){
  state = state || views.STAGING;
  switch (action.type){
    case actions.NAV_STAGING:
      return views.STAGING;
    case actions.NAV_SOLO_STAGING:
      return views.SOLO_STAGING;
    case actions.NAV_SOLO_ARENA:
      return views.SOLO_ARENA;
    case actions.NAV_CHALLENGE_ARENA:
      return views.CHALLENGE_ARENA;
    case actions.LOGOUT:
      return views.LOGIN;
    case actions.NAV_PROFILE:
      return views.PROFILE;
    default:
      return state;
  }
};

module.exports = viewReducer;
