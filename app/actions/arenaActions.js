'use strict';

var GET_PROBLEM_SUCCESS = require('../constants').action.GET_PROBLEM_SUCCESS;
var GET_PROBLEM_ERROR = require('../constants').action.GET_PROBLEM_ERROR;
var SUBMIT_PROBLEM_SUCCESS = require('../constants').action.SUBMIT_PROBLEM_SUCCESS;
var SUBMIT_PROBLEM_WRONG = require('../constants').action.SUBMIT_PROBLEM_WRONG;
var SUBMIT_PROBLEM = require('../constants').action.SUBMIT_PROBLEM;
var STORE_EDITOR = require('../constants').action.STORE_EDITOR;
var SYNTAX_ERROR = require('../constants').action.SYNTAX_ERROR;
var NO_SYNTAX_ERROR = require('../constants').action.NO_SYNTAX_ERROR;



var storeEditor= function(payload){
  return {
    type: STORE_EDITOR,
    payload: payload
  }
}
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

var submitProblem = function(errors, solution_str, socket_id, problem_id, user_handle){
  if(errors.length === 0){
    return function(dispatch){

      dispatch({
        type: NO_SYNTAX_ERROR
      });

      console.log({
        soln_str: solution_str,
        user_handle: user_handle,
        socket_id: socket_id
      });
      $.ajax({
        method:'POST',
        url: '/api/solutions/' + problem_id,
        dataType: 'json',
        data: {
          soln_str: solution_str,
          user_handle: user_handle,
          socket_id: socket_id
        },
        success: function(){
          dispatch({
            type: SUBMIT_PROBLEM
          });
        }
      });
    }
  } else {

    return {
      type: SYNTAX_ERROR,
      payload: errors
    }
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
  handleSubmissionResponse: handleSubmissionResponse,
  storeEditor: storeEditor
}
