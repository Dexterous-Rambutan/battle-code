var challengesController = require('./challenges/challengeController.js');
var usersController = require('./users/userController.js');
var solutionsController = require('./solutions/solutionController.js');
var passport = require('./helpers/psConfig.js');

module.exports = function (app) {

  // Try to authenticate via github
  app.get('/auth/github', passport.authenticate('github'));

  // once authentication completes, redirect to /
  app.get('/login/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      req.session.loggedIn = true;
      res.redirect('/');
  });

  // When client needs to verify if they are authenticated
  app.get('/auth-verify', function(req, res) {
    console.log('GET REQ to /auth-verify', req.session.loggedIn);
    if (req.session.loggedIn) {
      res.end(JSON.stringify({auth: true}));
    } else {
      res.end(JSON.stringify({auth: false}));
    }
  });

  app.get('/api/challenges', challengesController.getChallenge);
  app.get('/api/challenges/:challengeId', challengesController.getChallengeById);
  app.post('/api/challenges', challengesController.addChallenge);
  app.get('/api/users/:userId', function (req, res) {});
  app.post('/api/users', function (req, res) {});
  app.get('/api/solutions/:solutionId', solutionsController.getSolutionById);
  app.post('/api/solutions', solutionsController.addSolution);
};
