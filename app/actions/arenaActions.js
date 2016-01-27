'use strict';

var GET_PROBLEM_SUCCESS = require('../constants').action.GET_PROBLEM_SUCCESS;
var GET_PROBLEM_ERROR = require('../constants').action.GET_PROBLEM_ERROR;

var getProblem = function(payload){
console.log('got to action')
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
          })
      },
      error: function(error){
        dispatch({type: GET_PROBLEM_ERROR});
      }
    })
  }
}
module.exports = {
  getProblem: getProblem
}
