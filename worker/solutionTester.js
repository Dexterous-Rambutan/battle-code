var vm = require('vm');
var util = require('util');
var Solution = require('../server/solutions/solutionModel.js');
var Challenge = require('../server/challenges/challengeModel.js');

var redis = require('redis');
var Queue = require('./queue.js');
var client = redis.createClient();
var testQueue = new Queue('testQueue', client);

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
      }
      var context = new vm.createContext(sandbox);

      var solutionText = solutionInfo.soln_str;
      var solutionScript = new vm.Script(solutionText);

      // var testText = JSON.parse(challenge.get('test_suite'));
      var testText = challenge.get('test_suite');
      var testScript = new vm.Script(testText);

      try {
        solutionScript.runInContext(context);
        testScript.runInContext(context);
        console.log('victory!');
      } catch (e) {
        console.log(e);
      }
    })
    .catch(function (err) {
      return new Error(err);
    });

    runTest();
    
  });
}



