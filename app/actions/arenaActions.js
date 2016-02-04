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


var lostChallenge = function (payload) {
  return {
    type: actions.LOST_CHALLENGE,
    payload: payload
  }
};

var playerLeave = function(){
  return {
    type: actions.PLAYER_LEAVE
  }
};

var submitProblem = function (errors, solution_str, socket_id, problem_id, user_handle, type) {

  if(errors.length === 0) {
    return function (dispatch) {

      dispatch({
        type: actions.NO_SYNTAX_ERROR,
        payload: solution_str
      });

      console.log({
        soln_str: solution_str,
        user_handle: user_handle,
        socket_id: socket_id
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
        }),
        success: function(){
          dispatch({
            type: actions.SUBMIT_PROBLEM
          });
        }
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
    // Update the profile with all challenges, attempted and successfully completed
    // $.ajax({
    //   method: 'GET',
    //   url: '/api/solutions/user/' + payload.github_handle,
    //   dataType: 'json',
    //   cache: false,
    //   success: function (data) {
    //     dispatch({
    //       type: actions.STORE_USER_PROBLEMS,
    //       payload: data
    //     });
    //   },
    //   error: function (error) {
    //     dispatch({
    //       type: actions.GET_PROBLEM_ERROR
    //     });
    //   }
    // });
    if (payload.message === 'victory!') {
      // inform of submission success
      dispatch({
        type: actions.SUBMIT_PROBLEM_SUCCESS
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
  playerLeave: playerLeave
};
