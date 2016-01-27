var User = require('./userModel.js');

var userController = {};

// Try to fetch that user via route: /api/users/:userId, and
// return {user object}
userController.getUserById = function ( req, res ) {
  var github_handle = req.params.github_handle;
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
    github_profileUrl: req.body.github_profileUrl,
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

module.exports = userController;