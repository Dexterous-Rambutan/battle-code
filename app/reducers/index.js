'use strict';
var combineReducers = require('redux').combineReducers;


var reducers = {
  arenaReducers: require('./arenaReducers.js'),

  userReducers: require('./userReducers.js'),

  viewReducers: require('./viewReducers.js')
}

module.exports = combineReducers(reducers);
