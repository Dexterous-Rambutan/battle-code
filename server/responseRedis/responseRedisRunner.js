var redis = require('redis');
var redisQueue = require('./redisQueue.js');
var solutionController = require('../solutions/solutionController.js');

// May need to change client URL and port number
// var client = redis.createClient({
//   // host: 'localhost',
//   host: '192.168.99.100',
//   port: 6379
// });
var client = redis.createClient(6379, 'redis');
var responseQueue = new redisQueue('rQueue', client);

var responds = function (io) {
  // Wait for responses to arrive in `responseQueue`, then pop them out.
  // Afterwards, resume waiting for more responses to arrive
  responseQueue.pop(function (err, replies) {
    if (err) throw new Error(err);

    console.log('Successfully popped from', replies[0], 'with message: ', JSON.parse(replies[1]).message);

    // assume replies is a JSON object
    var reply = JSON.parse(replies[1]);
    var toSocket = reply.socket_id;
    var challenge_id = reply.challenge_id;
    var github_handle = reply.github_handle;
    var soln_str = reply.soln_str;
    var message = reply.message;

    if ( message === 'victory!') {
      solutionController.addSolution({
        content: soln_str,
        challenge_id: challenge_id,
        github_handle: github_handle
      });
    }

    // Send evaluated response to socket
    io.to('/#'+toSocket).emit('eval', message);

    // Keep listening
    responds(io);
  });
};

module.exports = responds;
