'use strict';

var _ = require('lodash');
var LOGIN = require('../constants').view.LOGIN

function viewReducer (state){
  state = state || LOGIN;
  return state
};

module.exports = viewReducer;
