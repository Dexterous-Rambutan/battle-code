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
    });

  },


  // POST /api/solutions/:challengeId
  testSolution: function (req, res, redisClient) {
    var solutionAttr = {
      soln_str: req.body.soln_str,
      user_handle: req.body.user_handle,
      socket_id: req.body.socket_id,
      challenge_id: req.params.challengeId,
      type: req.body.type
    };
    //prevents submission in event of
    if(solutionAttr.challenge_id !== 'null') {
      var jobQueue = new Queue('testQueue', redisClient);
      jobQueue.push(JSON.stringify(solutionAttr));
    }
    res.status(201).end();
  },

  findTimeElapsed: function(dateStart, dateEnd){
    var time1 = Date.parse(dateStart);
    var time2 = Date.parse(dateEnd);
    return time2 - time1;
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

      if(solutionAttr.type === 'battle' && solution.get('valid') === false) {
        solutionAttr['valid'] = true;
        solutionAttr['end_time'] = new Date(Date.now());
        solutionAttr['total_time'] = module.exports.findTimeElapsed(solution.attributes.start_time,solutionAttr.end_time);
        delete solutionAttr.type;
        solution.set(solutionAttr).save();
      }
      return;
    })
    .catch(function (err) {
      console.log('addSolution error: ', err);
    });
  },



  //Internally invoked when two players enter a room and a challenge ID is assigned
  initializeChallengeSolutions: function(player1_github_handle, player2_github_handle, challenge_id, callback){
    var playerIds = {};

    User.forge({github_handle: player1_github_handle}).fetch()
    .then(function(player1) {
      playerIds.player1_id = player1.get('id');
      return player1.get('id');
    })
    .then(function(player1_id){
      return User.forge({github_handle: player2_github_handle}).fetch();
    })
    .then(function(player2) {
      playerIds.player2_id = player2.get('id');
      return player2.get('id');
    })
    .then(function () {
      return Solution.forge({
        start_time: new Date(Date.now()),
        end_time: new Date(Date.now()),
        total_time: null,
        content: 'Initial Value',
        user_id: playerIds.player1_id,
        challenge_id: challenge_id,
        valid: false
      }).save();
    })
    .then(function () {
      return Solution.forge({
        start_time: new Date(Date.now()),
        end_time: new Date(Date.now()),
        total_time: null,
        content: 'Initial Value',
        user_id: playerIds.player2_id,
        challenge_id: challenge_id,
        valid: false
      }).save();
    }).then(function (solution) {
      if (callback) {
        callback(solution);
      }
    })
    .catch(function(error) {
      console.log('error initializing solutions', error)
    });
  },

  resetWithData: function () {
    return Solution.forge({
      start_time: new Date(Date.now() - 152*60*60*1000),
      end_time: new Date(Date.now() - 149*60*60*1000),
      total_time: null,
      content: 'solved!',
      user_id: 1,
      challenge_id: 2,
      valid: true
    }).save().then(function () {
      return Solution.forge({
        start_time: new Date(Date.now() - 150*60*60*1000),
        end_time: new Date(Date.now() - 142*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 4,
        challenge_id: 2,
        valid: true
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 88*60*60*1000),
        end_time: new Date(Date.now() - 73*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 4,
        challenge_id: 3,
        valid: true
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 82*60*60*1000),
        end_time: new Date(Date.now() - 80*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 3,
        challenge_id: 3,
        valid: true
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 49*60*60*1000),
        end_time: new Date(Date.now() - 38*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 2,
        challenge_id: 1,
        valid: true
      }).save();
    }).then(function() {
      return Solution.forge({
        start_time: new Date(Date.now() - 49*60*60*1000),
        end_time: new Date(Date.now() - 38*60*60*1000),
        total_time: null,
        content: 'solved!',
        user_id: 1,
        challenge_id: 1,
        valid: true
      }).save();
    })
  }
};
