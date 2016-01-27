var challengeController = require('./challenges/challengeController.js');
var userController = require('./users/userController.js');
var solutionController = require('./solutions/solutionController.js');
var passport = require('./helpers/psConfig.js');
var db = require('./helpers/dbConfig.js');

module.exports = function (app) {

  // Try to authenticate via github
  app.get('/auth/github', passport.authenticate('github'));

  // once authentication completes, redirect to /
  app.get('/login/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      req.session.loggedIn = true;
      console.log('Successfully logged in as: ', req.session.passport.user.displayName);

      // Add user to DB
      req.body.github_handle = req.session.passport.user.username;
      req.body.github_display_name = req.session.passport.user.displayName;
      req.body.github_avatar_url = req.session.passport.user._json.avatar_url;
      req.body.github_profileUrl = req.session.passport.user.profileUrl;
      req.body.email = req.session.passport.user.emails[0].value;
      userController.addUser(req);

      // Once complete, redirect to home page
      res.redirect('/');
  });

  // When client needs to verify if they are authenticated
  app.get('/auth-verify', function(req, res) {
    console.log('GET request to /auth-verify', req.session.loggedIn);
    if (req.session.loggedIn) {
      req.params.userId = req.session.passport.user.username || '';
      userController.getUserById(req, res);
    } else {
      res.status(403).json(null);
    }
  });

  app.get('/api/challenges', challengeController.getChallenge);
  app.get('/api/challenges/:challengeId', challengeController.getChallengeById);
  app.post('/api/challenges', challengeController.addChallenge);
  app.get('/api/users/:userId', userController.getUserById);
  app.post('/api/users', userController.addUser);
  app.get('/api/solutions/:solutionId', solutionController.getSolutionById);
  app.post('/api/solutions', solutionController.addSolution);
  app.get('/logout', function (req, res) {
    req.session.loggedIn = false;
    res.redirect('/');
  });
  app.get('/api/resetDB', db.resetEverything);
};
