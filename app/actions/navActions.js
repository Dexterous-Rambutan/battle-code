'use strict';

var NAV_STAGING = require('../constants').action.NAV_STAGING;
var LOGOUT = require('../constants').action.LOGOUT;
var NAV_ARENA = require('../constants').action.NAV_ARENA;
var LOGIN = require('../constants').action.LOGIN;

var navStaging = function(){
  return {
    type: NAV_STAGING
  }
};

var navArena = function(){
  return {
    type: NAV_ARENA
  }
};

var navLogout = function(){
  //need to send request to route to LOGOUT
    //on success, dispatch LOGOUT statement
  return {
    type: LOGOUT
  }
};


module.exports = {
  navStaging: navStaging,
  navLogout: navLogout,
  navArena: navArena
}
