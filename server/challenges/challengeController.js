var db = require('../helpers/dbConfig');
var Challenge = require('./challengeModel.js');

module.exports = {
  // GET /api/challenges
  getChallenge: function (req, res) {
    Challenge.fetchAll()
    .then(function (challenges) {
      var i = Math.floor(Math.random() * challenges.size());
      res.status(200).json(challenges.at(i));
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  },
  // GET /api/challenges/:challengeId
  getChallengeById: function (req, res) {
    var challengeId = req.params.challengeId;
    Challenge.forge({
      id: challengeId
    })
    .fetch()
    .then(function (challenge) {
      if (challenge) {
        res.status(200).json(challenge);
      } else {
        res.status(404).json(null);
      }
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  },
  // POST /api/challenges
  addChallenge: function (req, res) {
    var challengeAttr = {
      name: req.body.name,
      prompt: req.body.prompt,
      test_suite: req.body.test_suite
    };

    Challenge.forge(challengeAttr).save()
    .then(function (challenge) {
      res.status(201).json(challenge);
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  },

  resetWithData: function () { 
    return Challenge.forge({
      name: "Test function one",
      prompt: "Write a function one() that returns the value 1.\n\nExample usage: \none(1); \/\/ => 1\none(2); \/\/ => 1",
      test_suite: "assert.equal(one(1),1);\nassert.equal(one(2),1);"
    }).save()
    .then(function () {
      return Challenge.forge({
        name: "Test function two",
        prompt: "Write a function two() that returns the value 2.\n\nExample usage: \ntwo(1); \/\/ => 2\ntwo(2); \/\/ => 2",
        test_suite: "assert.equal(two(1),2);\nassert.equal(two(2),2);"
      }).save();
    })
    .then(function () {
      return Challenge.forge({
        name: "Test function three",
        prompt: "Write a function three() that returns the value 3.\n\nExample usage: \nthree(1); \/\/ => 3\nthree(2); \/\/ => 3",
        test_suite: "assert.equal(three(1),3);\nassert.equal(three(2),3);"
      }).save();
    })
    .then(function () {
      return Challenge.forge({
        name: "Test function four",
        prompt: "Write a function four() that returns the value 4.\n\nExample usage: \nfour(1); \/\/ => 4\nfour(2); \/\/ => 4",
        test_suite: "assert.equal(four(1),4);\nassert.equal(four(2),4);"
      }).save();
    })
    .then(function() {
      return Challenge.forge({
        name: "nth Fibonacci",
        prompt: "A Fibonacci sequence is a list of numbers that begins with 0 and 1, and each subsequent number is the sum of the previous two.\n\nFor example, the first five Fibonacci numbers are:\n\n 0 1 1 2 3\n\nIf n were 4, your function should return 3; for 5, it should return 5.\n\nWrite a function that accepts a number, n, and returns the nth Fibonacci number. Use a recursive solution to this problem; if you finish with time left over, implement an iterative solution.\n\nExample usage:\nnthFibonacci(2); \/\/ => 1\nnthFibonacci(3); \/\/ => 2\nnthFibonacci(4); \/\/ => 3\netc...",
        test_suite: "assert.equal(nthFibonacci(1), 1);\nassert.equal(nthFibonacci(2), 1);\nassert.equal(nthFibonacci(3), 2);\nassert.equal(nthFibonacci(4), 3);\nassert.equal(nthFibonacci(5), 5);\nassert.equal(nthFibonacci(10), 55);\nassert.equal(nthFibonacci(20), 6765);"
      }).save();
    })
  }
};
