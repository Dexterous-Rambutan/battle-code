'use strict';

var GET_PROBLEM_SUCCESS = require('../constants').action.GET_PROBLEM_SUCCESS;
var GET_PROBLEM_ERROR = require('../constants').action.GET_PROBLEM_ERROR;
var SUBMIT_PROBLEM_SUCCESS = require('../constants').action.SUBMIT_PROBLEM_SUCCESS;
var SUBMIT_PROBLEM_WRONG = require('../constants').action.SUBMIT_PROBLEM_WRONG;

var getProblem = function(payload){
  return function(dispatch){
    $.ajax({
      method: 'GET',
      url: '/api/challenges/:' + payload.challenge_id,
      dataType: 'json',
      cache: false,
      success: function(data){
          dispatch({
            type: GET_PROBLEM_SUCCESS,
            payload: data
          });
      },
      error: function(error){
        dispatch({
          type: GET_PROBLEM_ERROR
        });
      }
    })
  }
};

var submitProblem = function(solution_str, socket_id, problem_id, user_handle){
  return function(dispatch){
    $.ajax({
      method:'POST',
      url: '/api/solutions/' + problem_id,
      dataType: 'json',
      data: {
        soln_str: solution_str,
        user_handle: user_handle,
        socket_id
      }
    });
  }
};

var handleSubmissionResponse = function(payload){
  if(payload === 'victory!'){
    return {
      type: SUBMIT_PROBLEM_SUCCESS
    }
  } else {
    return {
      type: SUBMIT_PROBLEM_WRONG,
      payload: payload
    }
  }
}


module.exports = {
  getProblem: getProblem,
  submitProblem: submitProblem,
  handleSubmissionResponse: handleSubmissionResponse
}
