var db = require('../helpers/dbConfig');
var Solution = require('./solutionModel.js');

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
  addSolution: function (req, res) {
    var solutionAttr = {
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      total_time: req.body.total_time,
      content: req.body.content,
      user_id: req.body.user_id,
      challenge_id: req.body.challenge_id,  
    };
    //TODO: evaluate code, send to worker process
    //TODO: sockets to signal solution submitted and results of solution testing
    Solution.forge(solutionAttr)
    .save()
    .then(function (solution) {
      res.status(201).json(solution);
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });

  }
};
