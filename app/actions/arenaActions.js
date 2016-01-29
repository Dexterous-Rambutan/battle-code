'use strict';
var actions = require('../constants').action;


var storeEditor= function(payload){
  return {
    type: actions.STORE_EDITOR,
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
            type: actions.GET_PROBLEM_SUCCESS,
            payload: data
          });
      },
      error: function(error){
        dispatch({
          type: actions.GET_PROBLEM_ERROR
        });
      }
    })
  }
};

var submitProblem = function(errors, solution_str, socket_id, problem_id, user_handle){
  if(errors.length === 0){
    return function(dispatch){

      dispatch({
        type: actions.NO_SYNTAX_ERROR
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
          soln_str: JSON.stringify(solution_str),
          user_handle: user_handle,
          socket_id: socket_id
        }),
        success: function(){
          dispatch({
            type: actions.SUBMIT_PROBLEM
          });
        }
      });
    }
  } else {

    return {
      type: actions.SYNTAX_ERROR,
      payload: errors
    }
  }
};

var handleSubmissionResponse = function(payload){
  if(payload === 'victory!'){
    return {
      type: actions.SUBMIT_PROBLEM_SUCCESS
    }
  } else {
    return {
      type: actions.SUBMIT_PROBLEM_WRONG,
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
