'use strict';
var IS_LOGGED_IN = require('../constants').action.IS_LOGGED_IN;
var IS_LOGGED_OUT = require('../constants').action.IS_LOGGED_OUT;

var _ = require('lodash');

var initial = {
  isLoggedIn: false,
  github_handle: "",
  github_display_name: '',
  github_profileUrl: '',
  github_avatar_url: ''

}

function userReducer (state, action){
  state = state || initial;
  switch(action.type){
    case IS_LOGGED_IN:
      return _.extend({}, state, {
        isLoggedIn: true,
        github_handle: action.payload.github_handle,
        github_display_name: action.payload.github_display_name,
        github_profileUrl: action.payload.github_profileUrl,
        github_avatar_url: action.payload.github_avatar_url
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
