'use strict';
var IS_LOGGED_IN = require('../constants').action.IS_LOGGED_IN;
var IS_LOGGED_OUT = require('../constants').action.IS_LOGGED_OUT;

var _ = require('lodash');

var initial = {
  isLoggedIn: false,
  user_handle: ""

}

function userReducer (state, action){
  state = state || initial;
  switch(action.type){
    case IS_LOGGED_IN:
      return _.extend({}, state, {
        isLoggedIn: true,
        user_handle: action.harun
      });
    case IS_LOGGED_OUT:
      return _.extend({}, state, {
        isLoggedIn: false,
        user_handle: ""
      });
  }
  return state;
};

module.exports = userReducer;
