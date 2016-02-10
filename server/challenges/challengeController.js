var db = require('../helpers/dbConfig');
var Challenge = require('./challengeModel.js');
var User = require('../users/userModel.js');
var Solution = require('../solutions/solutionModel.js');
var _ = require('lodash');

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

  // NOT an HTTP route, will be called by sockets
  getChallengeMultiplayer: function (req, callback) {
    //req has to have type
    var p1 = req.body.player1_github_handle;
    var p2 = req.body.player2_github_handle;
    var type = req.body.type;
    var completedChallenges = {
      p1: [],
      p2: []
    };
    var completed = [];
    var total = [];

    // Get list of challenges completed by player1
    User.forge({
      github_handle: p1
    }).fetch({withRelated: ['solutions']})
    .then(function (user) {
      var solutions = user.related('solutions');
      return solutions.fetch({withRelated: ['challenge']});
    })
    .then(function (solutions) {
      var challenges = solutions.filter(function (s) {
        return s.related('challenge').get('type') === type;
      });
      completedChallenges.p1 = challenges.map(function (s) {
        return s.get('challenge_id');
      });
    // Get list of challenges completed by player2
      return User.forge({
        github_handle: p2
      }).fetch({withRelated: ['solutions']});
    })
    .then(function (user) {
      var solutions = user.related('solutions');
      return solutions.fetch({withRelated: ['challenge']});
    })
    .then(function (solutions) {
      var challenges = solutions.filter(function (s) {
        return s.related('challenge').get('type') === type;
      });
      completedChallenges.p2 = challenges.map(function (s) {
        return s.get('challenge_id');
      });
      return Challenge.forge({type: type}).fetchAll();
    })
    .then(function (challenges) {
      // return a challenge neither player has seen
      completed = _.union(completedChallenges.p1, completedChallenges.p2);
      total = challenges.filter(function (c) {
        return c.get('type') === type;
      }).map(function (c) {
        return c.get('id');
      });
      var available = _.difference(total, completed);
      // if no challenges are available
      if (available.length === 0) {
        return null;
      }
      // otherwise continue to fetch challenge
      else {
        var challenge = _.sample(available);
        return challenge;
      }
    })
    .then(function (id) {
      if (id === null) {
        return null;
      }
      return Challenge.forge({id: id, type:type}).fetch();
    })
    .then(function (challenge) {
      if (challenge !== null) {
        var attrs = {
          id: challenge.get('id'),
          name: challenge.get('name'),
          prompt: challenge.get('prompt')
        };
        if (callback) {
          callback(attrs);
        }
      } else {
        if (callback) {
          callback(null);
        }
      }
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
      test_suite: req.body.test_suite,
      type: req.body.type
    };
    console.log(challengeAttr);

    Challenge.forge(challengeAttr).save()
    .then(function (challenge) {
      res.status(201).json(challenge);
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  },

  resetWithData: function () {
    return Challenge.forge({
      name: "One",
      prompt: "/*Write a function one() that returns the value 1.\n\nExample usage: \none(1); \/\/ => 1\none(2); \/\/ => 1*/\n\nvar one = function (n) {\n  \n};",
      test_suite: "assert.equal(one(1),1);\nassert.equal(one(2),1);",
      type:'battle'
    }).save()
    .then(function () {
      return Challenge.forge({
        name: "FizzBuzz",
        prompt: "/*Write a function that accepts an integer input, n, and returns \"FIZZ\" when n is divisible by 3, \"BUZZ\" when n is divisible by 5, and \"FIZZBUZZ\" when n is divisible by both 5 and 3\n\nExample usage:\n\nfizzBuzz(1) => 1\nfizzBuzz(15) => \"FIZZBUZZ\"\nfizzBuzz(20) => \"BUZZ\" */\n\nvar fizzBuzz = function (n) {};",
        test_suite: "assert.equal(fizzBuzz(1), 1);\nassert.equal(fizzBuzz(3), \"FIZZ\");\nassert.equal(fizzBuzz(5), \"BUZZ\");\nassert.equal(fizzBuzz(12), \"FIZZ\");\nassert.equal(fizzBuzz(30), \"FIZZBUZZ\");\nassert.equal(fizzBuzz(100), \"BUZZ\");\nassert.equal(fizzBuzz(300000), \"FIZZBUZZ\");\nassert.equal(fizzBuzz(123457), 123457);\nassert.equal(fizzBuzz(14), 14);",
        type:'battle'
      }).save();
    })
    .then(function () {
      return Challenge.forge({
        name: "stringReverse",
        prompt: "/*Write a function that reverses a string, str\n\nExample usage:\nstringReverse(\"Foo bar!\") => \"!rab ooF\"\nstringReverse(\"Hello World\") => \"dlroW olleH\"*/\n\nvar stringReverse = function (str) {};",
        test_suite: "assert.equal(stringReverse(\"hi\"), \"ih\");\nassert.equal(stringReverse(\"a\"), \"a\");\nassert.equal(stringReverse(\"Foo bar!\"), \"!rab ooF\");\nassert.equal(stringReverse(\"1234\"), \"4321\");\nassert.equal(stringReverse(\"stringReverse\"), \"esreveRgnirts\");\nassert.equal(stringReverse(\"b b b\"), \"b b b\");",
        type:'battle'
      }).save();
    })
    .then(function () {
      return Challenge.forge({
        name: "missingNumber",
        prompt: "/*Write a function that returns the missing number in an input array, arr.\nThe input array will always start at 0, and all following entries are 1 larger than the previous entry, except for the missing entry.\n\nExample usage:\nmissingNumber([0,1,2,4,5,6]) => 3\nmissingNumber([1,2,3,4,5]) => 0\nmissingNumber([0,1,2,3,4,5]) => null*/\n\nvar missingNumber = function (arr) {};",
        test_suite: "assert.equal(missingNumber([0,2]), 1);\nassert.equal(missingNumber([0]), null);\nassert.equal(missingNumber([1,2]), 0);\nassert.equal(missingNumber([0,1,2,3,5]), 4);\nassert.equal(missingNumber([0,1,3]), 2);\nassert.equal(missingNumber([0,1,2,3]), null);\nassert.equal(missingNumber([0,1,2,3,4]), null);\nassert.equal(missingNumber([0,1,2,4]), 3);\nassert.equal(missingNumber([0,1,2,3,4,5,6,8]), 7);",
        type:'battle'
      }).save();
    })
    .then(function() {
      return Challenge.forge({
        name: "nth Fibonacci",
        prompt: "/*A Fibonacci sequence is a list of numbers that begins with 0 and 1, and each subsequent number is the sum of the previous two.\n\nFor example, the first five Fibonacci numbers are:\n\n 0 1 1 2 3\n\nIf n were 4, your function should return 3; for 5, it should return 5.\n\nWrite a function that accepts a number, n, and returns the nth Fibonacci number. Use a recursive solution to this problem; if you finish with time left over, implement an iterative solution.\n\nExample usage:\nnthFibonacci(2); \/\/ => 1\nnthFibonacci(3); \/\/ => 2\nnthFibonacci(4); \/\/ => 3\netc...*/\n\nvar nthFibonacci = function (n) {\n  \n};",
        test_suite: "assert.equal(nthFibonacci(1), 1);\nassert.equal(nthFibonacci(2), 1);\nassert.equal(nthFibonacci(3), 2);\nassert.equal(nthFibonacci(4), 3);\nassert.equal(nthFibonacci(5), 5);\nassert.equal(nthFibonacci(10), 55);\nassert.equal(nthFibonacci(20), 6765);",
        type:'battle'
      }).save();
    });
  },

  repopulateTable: function (req, res) {
    var fs = require('fs');
    var pg = require('pg');
    var copyFrom = require('pg-copy-streams').from;

    var DB_CONN_STR = "postgres://localhost:5432/myDB";
    var DB_CSV_PATH = "./server/challenges/challenges.csv";
    if (process.env.DEPLOYED) {
      DB_CSV_PATH = "./challenges/challenges.csv";
      DB_CONN_STR = "postgres://postgres:mysecretpassword@postgres/postgres";
    }

    // Delete elements from the challenges table, then reinsert them
    db.knex('challenges').truncate()
    .then(function() {
      pg.connect(DB_CONN_STR, function(err, client, done) {
        var stream = client.query(copyFrom("COPY challenges FROM STDIN WITH DELIMITER ',' CSV HEADER"));
        var fileStream = fs.createReadStream(DB_CSV_PATH);
        fileStream.on('error', done);
        fileStream.pipe(stream).on('finish', function () {
          res.end();
          done();
        }).on('error', done);
      });
    });
  }
};
