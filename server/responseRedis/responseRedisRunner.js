var redis = require('redis');
var redisQueue = require('./redisQueue.js');

// May need to change client URL and port number
var client = redis.createClient();
var responseQueue = new redisQueue('rQueue', client);

var responds = function (io) {
  // Wait for responses to arrive in `responseQueue`, then pop them out.
  // Afterwards, resume waiting for more responses to arrive
  responseQueue.pop(function (err, replies) {
    if (err) throw new Error(err);

    console.log('Successfully popped from redisQueue', replies);

    // assume replies is a JSON object
    var reply = JSON.parse(replies[1]);
    var toSocket = reply.socketId;
    var message = reply.message;

    // // Send evaluated response to socket
    io.to(toSocket).emit('eval', message);

    // // Keep listening
    responds(io);
  });
};

module.exports = responds;
