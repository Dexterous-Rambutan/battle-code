var User = require('./userModel.js');

var userController = {};

// Try to fetch that user via route: /api/users/:github_handle, and
// return {user object}
userController.getUserById = function ( req, res ) {
  var github_handle = req.params.githubHandle;
  new User({github_handle: github_handle}).fetch()
  .then(function(user) {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json(null);
    }
  }).catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};

// retrieve user object if it exists
// otherwise ask DB to create user
userController.addUser = function ( req, res ) {
  var github_handle = req.body.github_handle;
  var userAttr = {
    github_handle: req.body.github_handle,
    github_display_name: req.body.github_display_name,
    github_avatar_url: req.body.github_avatar_url,
<<<<<<< HEAD
    github_profile_url: req.body.github_profile_url,
=======
    github_profileUrl: req.body.github_profileUrl,
    elo_rating: 1000,
>>>>>>> added elo rating for players
    email: req.body.email
  };
  // Construct a new user, and see if it already exists
  new User({github_handle: github_handle}).fetch()
  .then(function(user) {
    // if so, return that user object
    if (user) {
      if (res) {
        res.status(200).json(user);
      }
    // if not, add that user to the DB
    } else {
      User.forge(userAttr).save().then(function(newUser){
        if (res) {
          res.status(201).json(newUser);
        }
      }).catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    }
  });
};

userController.resetWithData = function() {
  return User.forge({
    github_handle: 'alanzfu',
    github_display_name: 'Alan Fu',
    github_avatar_url: 'https://avatars0.githubusercontent.com/u/7851211?v=3&s=460',
<<<<<<< HEAD
    github_profile_url: 'https://github.com/alanzfu',
=======
    github_profileUrl: 'https://github.com/alanzfu',
    elo_rating:2000,
>>>>>>> added elo rating for players
    email: null
  }).save().then(function() {
    return User.forge({
      github_handle: 'puzzlehe4d',
      github_display_name: 'Harun Davood',
      github_avatar_url: 'https://avatars2.githubusercontent.com/u/12518929?v=3&s=460',
<<<<<<< HEAD
      github_profile_url: 'https://github.com/puzzlehe4d',
=======
      github_profileUrl: 'https://github.com/puzzlehe4d',
      elo_rating:2000,
>>>>>>> added elo rating for players
      email: null
    }).save();
  }).then(function() {
    return User.forge({
      github_handle: 'kweng2',
      github_display_name: 'Kevin Weng',
      github_avatar_url: 'https://avatars2.githubusercontent.com/u/13741053?v=3&s=460',
<<<<<<< HEAD
      github_profile_url: 'https://github.com/kweng2',
=======
      github_profileUrl: 'https://github.com/kweng2',
      elo_rating:1000,
>>>>>>> added elo rating for players
      email: null
    }).save();
  }).then(function() {
    return User.forge({
      github_handle: 'hahnbi',
      github_display_name: 'Hahnbi Sun',
      github_avatar_url: 'https://avatars3.githubusercontent.com/u/12260923?v=3&s=460',
<<<<<<< HEAD
      github_profile_url: 'https://github.com/hahnbi',
=======
      github_profileUrl: 'https://github.com/hahnbi',
      elo_rating:1000,
>>>>>>> added elo rating for players
      email: null
    }).save();
  })
}

module.exports = userController;
