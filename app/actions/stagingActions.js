'use strict';
var socket = require('../sockets/socket-helper');
var actions = require('../constants').action;


var createSocket = function(){
  return {
        type: actions.CREATE_SOCKET,
        payload: socket
    }
};


module.exports = {
  createSocket: createSocket
}
