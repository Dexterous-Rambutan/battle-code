'use strict';

var NAV_STAGING = require('../constants').action.NAV_STAGING;
var LOGOUT = require('../constants').action.LOGOUT;
var NAV_SOLO_ARENA = require('../constants').action.NAV_SOLO_ARENA;
var NAV_CHALLENGE_ARENA = require('../constants').action.NAV_CHALLENGE_ARENA;
var LOGIN = require('../constants').action.LOGIN;
var NAV_PROFILE = require('../constants').action.NAV_PROFILE;
var NAV_SOLO_STAGING = require('../constants').action.NAV_SOLO_STAGING;

var socket = require('../sockets/socket-helper');

var navStaging = function(){
  return {
    type: NAV_STAGING
  }
};

var navSoloStaging = function(){
  return {
    type: NAV_SOLO_STAGING
  }
};

var navSoloArena = function(){
  socket.emit('solo_arena');
  return {
    type: NAV_SOLO_ARENA
  }
};

var navChallengeArena = function(){
  return {
    type: NAV_CHALLENGE_ARENA
  }
};

//Currently Not used
var navLogout = function(){
  //need to send request to route to LOGOUT
    //on success, dispatch LOGOUT statement
  return {
    type: LOGOUT
  }
};

var navProfile = function(){
  return {
    type: NAV_PROFILE
  }
};


module.exports = {
  navStaging: navStaging,
  navLogout: navLogout,
  navSoloArena: navSoloArena,
  navSoloStaging: navSoloStaging,
  navChallengeArena: navChallengeArena,
  navProfile: navProfile
}
