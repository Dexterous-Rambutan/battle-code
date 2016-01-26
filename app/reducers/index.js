'use strict';
var combineReducers = require('redux').combineReducers;


var reducers = {
  arena: require('./arenaReducers.js'),

  user: require('./userReducers.js'),

  view: require('./viewReducers.js'),

}

module.exports = combineReducers(reducers);
