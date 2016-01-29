'use strict';
var actions = require('../constants').action;

var socket = require('../sockets/socket-helper');

var navStaging = function(){
  return {
    type: actions.NAV_STAGING
  }
};

var navSoloStaging = function(github_handle){
  //get all the links here and dispatch with payload to user reducers and view reducers
  return function(dispatch){
    $.ajax({
      method: 'GET',
      dataType: 'json',
      //use getuserproblems route here
      url:'/api/solutions/user/' + github_handle,
      success: function(data){
        console.log('list of solutions',data);
        dispatch({
          type: actions.STORE_USER_PROBLEMS,
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
      url: '/api/challenges/1',
      dataType: 'json',
      success: function(data){
        console.log('hey')
        dispatch({
          type: actions.STORE_SOLO_PROBLEM,
          payload: data
        });
        dispatch({
          type: actions.NAV_SOLO_ARENA
        });
      },
      error: function(err){
        console.log('Change the url to the spoofed challenge_id from the db',err)
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
