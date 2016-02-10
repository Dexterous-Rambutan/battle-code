'use strict';
var actions = require('../constants').action;

var storeEditor = function(payload) {
  return {
    type: actions.STORE_EDITOR,
    payload: payload
  };
};

var storeEditorOpponent = function (payload) {
  return {
    type: actions.STORE_EDITOR_OPPONENT,
    payload: payload
  };
};

var countdown = function () {
 return ({
    type: actions.COUNTDOWN
  });
};

var resetPrompt = function () {
  return ({
    type: actions.RESET_PROMPT
  });
};

var getProblem = function (payload) {
  return function(dispatch){
    $.ajax({
      method: 'GET',
      url: '/api/challenges/:' + payload.challenge_id,
      dataType: 'json',
      cache: false,
      success: function (data) {
          dispatch({
            type: actions.GET_PROBLEM_SUCCESS,
            payload: data
          });
      },
      error: function (error) {
        dispatch({
          type: actions.GET_PROBLEM_ERROR
        });
      }
    });
  };
};

var getLeaderBoard = function(id) {
  return function(dispatch) {
    $.ajax({
      method: 'GET',
      url: '/api/solutions/' + id + '/top',
      dataType: 'json',
      cache: false,
      success: function (data) {

        dispatch({
          type: actions.GET_LEADERBOARD_SUCCESS,
          payload:data
        })
      },

      error: function(error) {
        console.log('error getting leaderboard', error);
      }
    });
  }
}

var lostChallenge = function (payload) {
  return {
    type: actions.LOST_CHALLENGE,
    payload: payload
  };
};

var playerLeave = function (payload) {
  return {
    type: actions.PLAYER_LEAVE,
    payload: payload
  };
};

var exitSplash = function () {
  console.log('here')
  return {
    type: actions.EXIT_SPLASH
  };
};

var submitProblem = function (errors, solution_str, socket_id, problem_id, user_handle, type) {

  if(errors.length === 0) {
    return function (dispatch) {
      dispatch({
        type: actions.NO_SYNTAX_ERROR,
        payload: solution_str
      });
      $.ajax({
        method:'POST',
        url: '/api/solutions/' + problem_id,
        contentType: 'application/json',
        data: JSON.stringify({
          soln_str: solution_str,
          user_handle: user_handle,
          socket_id: socket_id,
          type: type
        })
      });
    };
  } else {
    return {
      type: actions.SYNTAX_ERROR,
      payload: {
        errors: errors,
        solution_str: solution_str
      }
    };
  }
};

var handleSubmissionResponse = function (payload) {
  return function (dispatch) {
    if (payload.message === 'victory!') {
      // inform of submission success
      dispatch({
        type: actions.SUBMIT_PROBLEM_SUCCESS,
        payload: {
          stdout: payload.stdout
        }
      });
      dispatch({
        type: actions.COMPLETE_CHALLENGE
      });
    } else {
      dispatch({
        type: actions.SUBMIT_PROBLEM_WRONG,
        payload: {
          message: payload.message,
          stdout: payload.stdout
        }
      });
    }
  };
};


module.exports = {
  getProblem: getProblem,
  submitProblem: submitProblem,
  handleSubmissionResponse: handleSubmissionResponse,
  storeEditor: storeEditor,
  storeEditorOpponent: storeEditorOpponent,
  lostChallenge: lostChallenge,
  playerLeave: playerLeave,
  countdown: countdown,
  resetPrompt: resetPrompt,
  getLeaderBoard: getLeaderBoard,
  exitSplash: exitSplash
};
