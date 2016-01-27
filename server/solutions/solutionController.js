var db = require('../helpers/dbConfig');
var Solution = require('./solutionModel.js');
var User = require('../users/userModel.js');

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
