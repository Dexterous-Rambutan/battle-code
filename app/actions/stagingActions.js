'use strict';

var CREATE_SOCKET = require('../constants').action.CREATE_SOCKET;
var createSocket = function(){
  return {
    type: CREATE_SOCKET,
    socket: io(`${location.protocol}//${location.hostname}:3000`)
  }
};
module.exports = {
  createSocket: createSocket
}
