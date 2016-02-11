var vm = require('vm');
var util = require('util');
var redis = require('redis');
var fs = require('fs');
var Queue = require('./queue.js');
var Solution;
var Challenge;
var client;
if (process.env.DEPLOYED) {
  client = redis.createClient(6379, 'redis');
  Solution = require('./solutions/solutionModel.js');
  Challenge = require('./challenges/challengeModel.js');
} else {
  client = redis.createClient();
  Solution = require('../server/solutions/solutionModel.js');
  Challenge = require('../server/challenges/challengeModel.js');
}

var testQueue = new Queue('testQueue', client);
var responseQueue = new Queue('rQueue', client);

runTest();

function runTest() {
  console.log('Listening for items to enter testQueue...');

  // Pop from testQueue any solutions waiting to be tested
  testQueue.pop(function (err, results) {
    if (err) {
      fs.appendFile('ERROR_LOG.txt', JSON.stringify(err), function(er) {
        if (er) throw er;
        console.log('Redis list blocking pop threw an error, check ERROR_LOG!');
      });
      throw new Error(err);
    }
    console.log('successfully popped from testQueue');

    // Parse the solution string from testQueue
    var solutionInfo = JSON.parse(results[1]);
    var challenge = Challenge.forge({
      id: solutionInfo.challenge_id
    });

    // Fetch the challenge test suite
    challenge.fetch()
    .then(function (challenge) {
      console.log('Successfully fetched challenge', challenge);
      // create a sandbox and load chai into that context
      var context = new vm.createContext();
      // Load test suite into the context
      var testText = challenge.get('test_suite');
      var testScript = new vm.Script(testText);
      var solutionText = solutionInfo.soln_str;
      var stdout = '';

      // Try to run solution string against the test suite
      try {
        // hooking into node's stdout
        context.console = console;
        function hook_stdout(callback) {
          var old_write = process.stdout.write
          process.stdout.write = (function(write) {
            return function(string, encoding, fd) {
              write.apply(process.stdout, arguments)
              callback(string, encoding, fd)
            }
          })(process.stdout.write)
          return function() {
            process.stdout.write = old_write
          }
        }
        var unhook = hook_stdout(function(string, encoding, fd) {
          stdout += string;
        })

        // Try to load the solution string into the context
        var solutionScript = new vm.Script(solutionText);
        solutionScript.runInContext(context, {timeout:2000});

        // Try to run tests
        context.assert = require('chai').assert;
        testScript.runInContext(context,{timeout:2000});

        // unhook console.log
        unhook();

        // Successful evaluation, add response to rQueue
        console.log('Successfully evaluated the solution!');
        responseQueue.push(JSON.stringify({
          socket_id: solutionInfo.socket_id,
          challenge_id: challenge.get('id'),
          github_handle: solutionInfo.user_handle,
          soln_str: solutionText,
          type: solutionInfo.type,
          message: 'victory!',
          stdout: stdout
        }), runTest);
      } catch (e) {
        // Failed evaluation, add response to rQueue
        unhook();
        console.log('Failed while evaluating the solution', e.message);
        responseQueue.push(JSON.stringify({
          socket_id: solutionInfo.socket_id,
          challenge_id: challenge.get('id'),
          github_handle: solutionInfo.user_handle,
          soln_str: solutionText,
          type: solutionInfo.type,
          message: e.message,
          stdout: stdout
        }), runTest);
      }
    })
    // Potential errors include: no such challenge
    .catch(function (err) {
      console.log('got an error despite the try catch block', err);
      return new Error(err);
    });
  });
}
