var redis = require('redis');
var redisQueue = require('./redisQueue.js');
var solutionController = require('../solutions/solutionController.js');
var matchController = require('../matches/matchController.js');

var client;
if (process.env.DEPLOYED) {
  client = redis.createClient(6379, 'redis');
} else {
  client = redis.createClient();
}

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
    var type = reply.type;
    var stdout = reply.stdout;

    if ( message === 'victory!') {
      solutionController.addSolution({
        content: soln_str,
        challenge_id: challenge_id,
        github_handle: github_handle,
        type: type
      });
      if(type === 'battle'){
        matchController.editOneWhenValid({
          challenge_id: challenge_id,
          github_handle: github_handle
        }, matchController.assignEloRating);
      }
    }
    var socketMessage = {
      message: message,
      challenge_id: challenge_id,
      github_handle: github_handle,
      stdout: stdout
    };
    // Send evaluated response to socket
    if (type === 'battle' || type === 'solo') {
      io.to('/#'+toSocket).emit('eval', socketMessage);
    } else if (type === 'pair') {
      io.to('/#'+toSocket).emit('pair_eval', socketMessage);
    }

    // Keep listening
    responds(io);
  });
};

module.exports = responds;
