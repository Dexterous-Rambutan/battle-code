var challengeController = require('./challenges/challengeController.js');
var userController = require('./users/userController.js');
var solutionController = require('./solutions/solutionController.js');
var matchController = require('./matches/matchController.js');
var passport = require('./helpers/psConfig.js');
var db = require('./helpers/dbConfig.js');
var adminPrivilege = require('./users/adminPrivilege.js');

module.exports = function (app, redisClient) {

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
      req.body.github_profile_url = req.session.passport.user.profileUrl;
      req.body.email = req.session.passport.user.emails[0].value;
      userController.addUser(req);

      // Once complete, redirect to home page
      res.redirect('/');
  });

  // When client needs to verify if they are authenticated
  app.get('/auth-verify', function(req, res) {
    console.log('GET request to /auth-verify', req.session.loggedIn);
    if (req.session.loggedIn) {
      req.params.githubHandle = req.session.passport.user.username || '';
      userController.getUserById(req, res);
    } else {
      res.status(403).json(null);
    }
  });


  // app.get('/addProblemsSolutions.html', adminPrivilege);
  app.get('/addProblemsSolutions.html');
  app.get('/api/challenges', challengeController.getChallenge);
  app.get('/api/challenges/:challengeId', challengeController.getChallengeById);
  app.post('/api/challenges', challengeController.addChallenge);
  app.get('/api/users/:githubHandle', userController.getUserById);
  app.post('/api/users', userController.addUser);
  app.get('/api/solutions/:solutionId', solutionController.getSolutionById);
  app.get('/api/solutions/user/:githubHandle', solutionController.getAllSolutionsForUser);
  app.get('/api/solutions/:challenge_id/top', solutionController.getTopSolutions);
  app.post('/api/solutions/:challengeId', function (req, res) {
    solutionController.testSolution(req, res, redisClient);
  });
  app.get('/api/users/:githubHandle/matches', matchController.getAllByUser)
  app.get('/logout', function (req, res) {
    req.session.loggedIn = false;
    res.redirect('/');
  });
  // app.get('/api/resetDB', adminPrivilege, db.resetEverything);
  app.get('/api/resetDB', db.resetEverything);
  // app.get('/api/resetDBWithData', adminPrivilege, function (req, res) {
  app.get('/api/resetDBWithData', function (req, res) {
    db.resetEverythingPromise()
    .then(function() {
      return userController.resetWithData();
    })
    .then(function() {
      return challengeController.resetWithData();
    })
    .then(function() {
      return solutionController.resetWithData();
    })
    .then(function() {
      return matchController.resetWithData();
    })
    .then(function() {
      res.status(201).end();
      return;
    })
    .catch(function(err) {
      res.status(500).send(err);
      return;
    })
  });
  app.get('/api/resetChallenges', adminPrivilege, challengeController.repopulateTable);
};
