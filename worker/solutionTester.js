var vm = require('vm');
var util = require('util');
var Solution = require('../server/solutions/solutionModel.js');
var Challenge = require('../server/challenges/challengeModel.js');

var redis = require('redis');
var Queue = require('./queue.js');
var client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});
var testQueue = new Queue('testQueue', client);
var responseQueue = new Queue('rQueue', client);

runTest();

function runTest() {
  console.log('Listening for items to enter testQueue...');

  // Pop from testQueue any solutions waiting to be tested
  testQueue.pop(function (err, results) {
    if (err) throw new Error(err);

    // Parse the solution string from testQueue
    var solutionInfo = JSON.parse(results[1]);
    var challenge = Challenge.forge({
      id: solutionInfo.challenge_id
    });

    // Fetch the challenge test suite
    challenge.fetch()
    .then(function (challenge) {
      // create a sanbox and load chai into that context
      var sandbox = {
        assert: require('chai').assert
      };
      var context = new vm.createContext(sandbox);

      // Load test suite into the context
      var testText = challenge.get('test_suite');
      var solutionText = solutionInfo.soln_str;
      var testScript = new vm.Script(testText);

      // Try to run solution string against the test suite
      try {
        // Try to load the solution string into the context
        var solutionScript = new vm.Script(solutionText);
        solutionScript.runInContext(context);
        testScript.runInContext(context);

        // Successful evaluation, add response to rQueue
        console.log('Successfully evaluated the solution!');
        responseQueue.push(JSON.stringify({
          socket_id: solutionInfo.socket_id,
          challenge_id: challenge.get('id'),
          github_handle: solutionInfo.user_handle,
          soln_str: solutionText,
          message: 'victory!'
        }), runTest);
      } catch (e) {
        // Failed evaluation, add response to rQueue
        console.log('Failed while evaluating the solution', e.message);
        responseQueue.push(JSON.stringify({
          socket_id: solutionInfo.socket_id,
          challenge_id: challenge.get('id'),
          github_handle: solutionInfo.user_handle,
          soln_str: solutionText,
          message: e.message
        }), runTest);
      }
    })
    // Potential errors include: no such challenge
    .catch(function (err) {
      console.log('got an error despite the try catch block');
      return new Error(err);
    });
  });
}



