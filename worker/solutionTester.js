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

  testQueue.pop(function (err, results) {
    if (err) throw new Error(err);

    // var results = JSON.parse(results);
    var solutionInfo = JSON.parse(results[1]);
    var challenge = Challenge.forge({
      id: solutionInfo.challenge_id
    });

    var output = challenge.fetch()
    .then(function (challenge) {      
      var sandbox = {
        // chai: require('chai'),
        assert: require('chai').assert,
      };
      var context = new vm.createContext(sandbox);

      var solutionText = solutionInfo.soln_str;
      var solutionScript = new vm.Script(solutionText);

      // var testText = JSON.parse(challenge.get('test_suite'));
      var testText = challenge.get('test_suite');
      var testScript = new vm.Script(testText);

      solutionScript.runInContext(context);
      console.log('try1');
      testScript.runInContext(context);
      console.log('try2');

      // console.log('There was an error while evaluating the solution');
      responseQueue.push(JSON.stringify({
        socket_id: 'testing socketID',
        challenge_id: challenge.get('id'),
        github_handle: 'kweng2',
        soln_str: solutionText,
        // message: e.message
        message: 'YOU WIN!'
      }));
      // , function() {
      //   console.log('try4');
      //   client.lrange('rQueue', 0, -1, function(err, results) {
      //     console.log(results);
      //     console.log('Here is the error thrown: ', e.message);
      //   });
      //   console.log('try5');
      // });
    })
    .catch(function (err) {
      console.log('YOU LOSE!');
      responseQueue.push(JSON.stringify({
        socket_id: 'testing socketID',
        challenge_id: challenge.get('id'),
        github_handle: 'kweng2',
        soln_str: solutionText,
        // message: e.message
        message: 'YOU LOSE!'
      }));
      return new Error(err);
    });

    runTest();
    
  });
}



