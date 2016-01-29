'use strict';
var actions = require('../constants').action;


var _ = require('lodash');

var initial = {
  isLoggedIn: false,
  github_handle: "",
  github_display_name: '',
  github_profileUrl: '',
  github_avatar_url: '',
  user_problems: []
}

function userReducer (state, action){
  state = state || initial;
  switch(action.type){
    case actions.IS_LOGGED_IN:
      return _.extend({}, state, {
        isLoggedIn: true,
        github_handle: action.payload.github_handle,
        github_display_name: action.payload.github_display_name,
        github_profileUrl: action.payload.github_profileUrl,
        github_avatar_url: action.payload.github_avatar_url
      });
    case actions.IS_LOGGED_OUT:
      return _.extend({}, state, {
        isLoggedIn: false,
        user_handle: ""
      });
    case actions.STORE_USER_PROBLEMS:
      return _.extend({}, state, {
        user_problems: action.payload
      });
  }
  return state;
};

module.exports = userReducer;
