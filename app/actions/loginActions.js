'use strict';
var actions = require('../constants').action;



var checkLoggedIn = function(){
  return function(dispatch){
    $.ajax({
      method: 'GET',
      url: '/auth-verify',
      dataType: 'json',
      cache: false,
      success: function(data){
          console.log('login data',data);
          dispatch({
            type: actions.IS_LOGGED_IN,
            payload: data
          })
      },
      error: function(error){
        dispatch({
          type: actions.IS_LOGGED_OUT
        });
      }
    })
  }
};


module.exports = {
  checkLoggedIn: checkLoggedIn
}
