'use strict';
var socket = require('../sockets/socket-helper');


var CREATE_SOCKET = require('../constants').action.CREATE_SOCKET;
var createSocket = function(){
  return {
        type: CREATE_SOCKET,
        payload: socket
    }
};


module.exports = {
  createSocket: createSocket
}
