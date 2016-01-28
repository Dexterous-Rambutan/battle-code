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

  // POST /api/solutions/:challengeId
  testSolution: function (req, res, redisClient) {
    var solutionAttr = {
      soln_str: JSON.parse(req.body.soln_str),
      user_handle: req.body.user_handle,
      socket_id: req.body.socket_id,
      challenge_id: req.params.challengeId
    };
    var jobQueue = new Queue('testQueue', redisClient);
    console.log('pushing to testQueue', solutionAttr);
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
      return Solution.forge(solutionAttr).save();
    }).catch(function (err) {
      console.log('addSolution error: ', err);
    });
  }
};
