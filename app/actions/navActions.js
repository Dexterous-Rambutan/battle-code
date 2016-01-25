'use strict';

var NAV_STAGING = require('../constants').action.NAV_STAGING;
var LOGOUT = require('../constants').action.LOGOUT;

var navStaging = function(){
  return {
    type: NAV_STAGING
  }
}

var navLogout = function(){
  return {
    type: LOGOUT
  }
}


module.exports = {
  navStaging: navStaging,
  navLogout: navLogout
}
