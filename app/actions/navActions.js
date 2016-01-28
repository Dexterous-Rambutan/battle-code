'use strict';
var actions = require('../constants').action;

var socket = require('../sockets/socket-helper');

var navStaging = function(){
  return {
    type: actions.NAV_STAGING
  }
};

var navSoloStaging = function(){
  //get all the links here and dispatch with payload to user reducers and view reducers
  return function(dispatch){
    $.ajax({
      method: 'GET',
      dataType: 'json',
      //use getuserproblems route here
      url:'/api/tbd',
      success: function(data){
        dispatch({
          type: actions.STORE_USER_PROBLEMS,
          //data undetermined
          payload: data
        });
        dispatch({
          type: actions.NAV_SOLO_STAGING
        });
      },
      error: function(err){
        dispatch({
          type: actions.NAV_SOLO_STAGING
        });
      }
    });
  }
};

var navSoloArena = function(payload){
  return function(dispatch){
    dispatch({
      type: actions.STORE_SOLO_PROBLEM,
      payload: payload
    });
    dispatch({
      type: actions.NAV_SOLO_ARENA
    });
  }
};

var spoofSolo = function(){
  return function (dispatch) {
    $.ajax({
      method:'GET',
      url: 'api/challenges/NUMBER_TO_SPOOF',
      dataType: 'json',
      success: function(data){
        dispatch({
          type: actions.STORE_SOLO_PROBLEM,
          payload: data
        });
        dispatch({
          type: actions.NAV_SOLO_ARENA
        });
      }
    })
  }
}

var navChallengeArena = function(){
  return {
    type: actions.NAV_CHALLENGE_ARENA
  }
};

//Currently Not used
var navLogout = function(){
  //need to send request to route to LOGOUT
    //on success, dispatch LOGOUT statement
  return {
    type: actions.LOGOUT
  }
};

var navProfile = function(){
  return {
    type: actions.NAV_PROFILE
  }
};


module.exports = {
  navStaging: navStaging,
  navLogout: navLogout,
  navSoloArena: navSoloArena,
  navSoloStaging: navSoloStaging,
  navChallengeArena: navChallengeArena,
  navProfile: navProfile,
  spoofSolo: spoofSolo
}
