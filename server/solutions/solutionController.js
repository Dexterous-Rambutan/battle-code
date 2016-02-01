var db = require('../helpers/dbConfig');
var Solution = require('./solutionModel.js');
var User = require('../users/userModel.js');
var Queue = require('../responseRedis/redisQueue.js');

module.exports = {
  // GET /api/solutions/:solutionId
  getSolutionById: function (req, res) {
    var solutionId = req.params.solutionId;
    Solution.forge({
      id: solutionId
    })
    .fetch()
    .then(function (solution) {
      if (solution) {
        res.json(solution);
      } else {
        res.status(404).json(null);
      }
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  },

  // GET /api/solutions/user/:githubHandle
  getAllSolutionsForUser: function (req, res) {
    var github_handle = req.params.githubHandle;
    User.forge({
      github_handle: github_handle
    })
    .fetch()
    .then(function (user) {
      if (user) {
        return Solution.where({
          user_id: user.get('id')
        }).fetchAll();
      }
      else {
        res.status(404).json(null);
      }
    })
    .then(function (challenges) {
      res.json(challenges);
    })
    .catch(function (user) {
      res.status(500).json({error: true, data: {message: err.message}});
    })

  },


  // POST /api/solutions/:challengeId
  testSolution: function (req, res, redisClient) {
    var solutionAttr = {
      soln_str: req.body.soln_str,
      user_handle: req.body.user_handle,
      socket_id: req.body.socket_id,
      challenge_id: req.params.challengeId
    };
    var jobQueue = new Queue('testQueue', redisClient);
    jobQueue.push(JSON.stringify(solutionAttr));
    res.status(201).end();
  },

  // POST /api/solutions/:solutionId
  addSolution: function (solutionAttr) {
    console.log("LOOKING FOR USER WITH GITHUB HANDLE: ", solutionAttr.github_handle);
    new User({github_handle: solutionAttr.github_handle})
    .fetch().then(function(user) {
      return user.get('id');
    }).then(function(userId){
      delete solutionAttr.github_handle;
      solutionAttr.user_id = userId;

      return Solution.forge({
        challenge_id: solutionAttr.challenge_id,
        user_id: solutionAttr.user_id
      }).fetch();
    }).then(function (solution) {
      if (solution) {
        return;
      } else {
        return Solution.forge(solutionAttr).save();
      }
    })
    .catch(function (err) {
      console.log('addSolution error: ', err);
    });
  },

  //TODO: internally invoked when two players enter a room and a challenge ID is assigned
  initializeChallengeSolutions: function(player1_socket_id, player2_socket_id, challenge_id){
    //get user_1 id from db based on socket
    //get user_2 id
    //
  },

  resetWithData: function () {
    return Solution.forge({
      start_time: new Date(Date.now() - 152*60*60*1000),
      end_time: new Date(Date.now() - 149*60*60*1000),
      total_time: null,
      content: 'solved!',
      user_id: 3,
      challenge_id: 1
    }).save().then(function () {
      return Solution.forge({
        start_time: new Date(Date.now() - 150*60*60*1000),
        end_time: new Date(Date.now() - 142*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 3,
        challenge_id: 2
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 88*60*60*1000),
        end_time: new Date(Date.now() - 73*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 3,
        challenge_id: 3
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 82*60*60*1000),
        end_time: new Date(Date.now() - 80*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 2,
        challenge_id: 3
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 15*60*60*1000),
        end_time: new Date(Date.now() - 12*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 2,
        challenge_id: 4
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 49*60*60*1000),
        end_time: new Date(Date.now() - 38*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 4,
        challenge_id: 1
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 44*60*60*1000),
        end_time: new Date(Date.now() - 42*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 1,
        challenge_id: 3
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 58*60*60*1000),
        end_time: new Date(Date.now() - 53*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 1,
        challenge_id: 1
      }).save();
    })
  }
};
