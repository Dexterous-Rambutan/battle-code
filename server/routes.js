var challengesController = require('../challenges/challengeController.js');
var usersController = require('../users/userController.js');
var solutionsController = require('../solutions/solutionController.js');

module.exports = function (app) {
  app.get('/api/challenges', function (req, res) {});
  app.get('/api/challenges/:challengeId', function (req, res) {});
  app.post('/api/challenges', function (req, res) {});
  app.get('/api/users/:userId', function (req, res) {});
  app.post('/api/users', function (req, res) {});
  app.get('/api/solutions/:problemId', function (req, res) {});
  app.post('/api/solutions/:problemId', function (req, res) {});
};
