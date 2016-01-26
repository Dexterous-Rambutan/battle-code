'use strict';
var IS_LOGGED_IN = require('../constants').action.IS_LOGGED_IN;
var IS_LOGGED_OUT = require('../constants').action.IS_LOGGED_OUT;


var checkLoggedIn = function(){
  return function(dispatch){
    $.ajax({
      method: 'GET',
      url: '/auth-verify',
      dataType: 'json',
      cache: false,
      success: function(data){
        if(data.auth===true){
          dispatch({type: IS_LOGGED_IN});
        } else {
          dispatch({type: IS_LOGGED_OUT});
        }
      }
    })
  }
};


module.exports = {
  checkLoggedIn: checkLoggedIn
}
