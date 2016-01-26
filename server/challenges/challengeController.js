var db = require('../helpers/dbConfig');
var Challenge = require('./challengeModel.js');
var Challenges = require('./challengesCollection.js');

module.exports = {
  // GET /api/challenges
  getChallenge: function (req, res) {
    Challenge.fetchAll()
    .then(function (challenges) {
      var i = Math.floor(Math.random() * challenges.size());
      res.json(challenges.at(i));
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  },
  // GET /api/challenges/:challengeId
  getChallengeById: function (req, res) {
    var challengeId = req.params.challengeId;
    Challenge.forge({
      id: challengeId
    })
    .fetch()
    .then(function (challenge) {
      res.json(challenge);
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  },
  // POST /api/challenges
  addChallenge: function (req, res) {
    var challengeAttr = {
      name: req.body.name,
      prompt: req.body.prompt,
      test_suite: req.body.test_suite
    };

    Challenge.forge(challengeAttr)
    .save()
    .then(function (challenge) {
      res.json(challenge);
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  }


}
