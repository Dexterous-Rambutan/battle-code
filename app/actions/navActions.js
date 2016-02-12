'use strict';
var actions = require('../constants').action;

var socket = require('../sockets/socket-helper');

var navStaging = function () {
  return {
    type: actions.NAV_STAGING
  };
};

// Update the view with challenges the user has either attempted or completed
var updateChallenges = function (dispatch, github_handle, action) {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url:'/api/solutions/user/' + github_handle,
    success: function (data) {
      dispatch({
        type: actions.STORE_USER_PROBLEMS,
        payload: data
      });
      dispatch({
        type: action
      });
    },
    error: function (err) {
      dispatch({
        type: action
      });
    }
  });
};

// Update user match history
var updateMatchHistory = function (dispatch, github_handle, action) {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url:'/api/users/' + github_handle + '/matches',
    success: function (data) {
      dispatch({
        type: actions.STORE_MATCH_HISTORY,
        payload: data
      });
      dispatch({
        type: action
      });
    },
    error: function (err) {
      dispatch({
        type: action
      });
    }
  });
};

var getElo = function (dispatch, github_handle, action) {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url:'/api/users/' + github_handle + '/elo',
    success: function (data) {
      console.log('data', data)
      dispatch({
        type: action,
        payload: data
      });
    },
    error: function (err) {
      dispatch({
        type: action
      });
    }
  });
};

var navSoloStaging = function (github_handle) {
  return function (dispatch) {
    updateChallenges(dispatch, github_handle, actions.NAV_SOLO_STAGING);
  };
};

var navSoloArena = function (payload) {
  return function (dispatch) {
    $.ajax({
      method: 'GET',
      url: '/api/challenges/'+payload.challenge_id,
      dataType: 'json',
      success: function (results) {
        dispatch({
          type: actions.CLEAR_INFO
        });
        dispatch({
          type: actions.STORE_SOLO_PROBLEM,
          payload: results
        });
        dispatch({
          type: actions.NAV_SOLO_ARENA
        });
      },
      error: function (error) {
        console.log('error fetching problem', error);
        dispatch({
          type: actions.NAV_SOLO_STAGING
        });
      }
    });
  };
};

var spoofSolo = function () {
  return function (dispatch) {
    $.ajax({
      method:'GET',
      url: '/api/challenges/1',
      dataType: 'json',
      success: function (data) {
        dispatch({
          type: actions.STORE_SOLO_PROBLEM,
          payload: data
        });
        dispatch({
          type: actions.NAV_SOLO_ARENA
        });
      },
      error: function (err) {
        console.log('Change the url to the spoofed challenge_id from the db',err);
      }
    });
  };
};

var navChallengeArena = function (github_handle) {
  return function (dispatch) {
    socket.emit('arena', github_handle);
    dispatch({
      type: actions.CLEAR_INFO
    });
    dispatch({
      type: actions.NAV_CHALLENGE_ARENA
    });
  };
};

var navAwayFromArena = function () {
  socket.emit('leaveArena');
  return function (dispatch) {
    dispatch({
      type: actions.NAV_STAGING
    });
    dispatch({
      type: actions.LEAVING
    });
  };
};

//Currently Not used
var navLogout = function () {
  //need to send request to route to LOGOUT
    //on success, dispatch LOGOUT statement
  return {
    type: actions.LOGOUT
  };
};

var navProfile = function (github_handle) {
  return function (dispatch) {
    updateChallenges(dispatch, github_handle, actions.NAV_PROFILE);
    updateMatchHistory(dispatch, github_handle, actions.NAV_PROFILE);
    getElo(dispatch, github_handle, actions.GET_ELO);
  };
};


module.exports = {
  navStaging: navStaging,
  navLogout: navLogout,
  navSoloArena: navSoloArena,
  navSoloStaging: navSoloStaging,
  navChallengeArena: navChallengeArena,
  navAwayFromArena: navAwayFromArena,
  navProfile: navProfile,
  spoofSolo: spoofSolo,
  getElo: getElo
};
