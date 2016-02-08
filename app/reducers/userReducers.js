'use strict';
var actions = require('../constants').action;


var _ = require('lodash');

var initial = {
  isLoggedIn: false,
  github_handle: "",
  github_display_name: '',
  github_profile_url: '',
  github_avatar_url: '',
  user_problems: [],
  user_match_history: []
};

function userReducer (state, action){
  state = state || initial;
  switch(action.type){
    case actions.IS_LOGGED_IN:
      return _.extend({}, state, {
        isLoggedIn: true,
        github_handle: action.payload.github_handle,
        github_display_name: action.payload.github_display_name,
        github_profile_url: action.payload.github_profile_url,
        github_avatar_url: action.payload.github_avatar_url
      });
    case actions.IS_LOGGED_OUT:
      return _.extend({}, state, {
        isLoggedIn: false,
        github_handle: "",
        github_display_name: '',
        github_profile_url: '',
        github_avatar_url: ''
      });
    case actions.STORE_USER_PROBLEMS:
      return _.extend({}, state, {
        user_problems: action.payload
      });
    case actions.STORE_MATCH_HISTORY:
      return _.extend({}, state, {
        user_match_history: action.payload
      });
    default:
      return state;
  }
  return state;
}

module.exports = userReducer;
