'use strict';

var _ = require('lodash');

var initial = {
  isLoggedIn: false,
  user_handle: ""
}

function userReducer (state){
  state = state || initial;
  return state;
};

module.exports = userReducer;
