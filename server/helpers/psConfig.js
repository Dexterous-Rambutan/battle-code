var apiKey;
var callbackURL;
var port = process.env.PORT || 3000;

if (process.env.DEPLOYED) {
  callbackURL = "http://??????/login/callback";
  apiKey = require('../lib/apiKey-demo.js');
} else {
  callbackURL = "http://127.0.0.1:3000/login/callback";
  apiKey = require('../lib/apiKey-dev.js');
}

///////////////// API key for GitHub OAuth /////////////
var GITHUB_CLIENT_ID = apiKey.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = apiKey.GITHUB_CLIENT_SECRET;

////////// Passport and github passport required //////
var GitHubStrategy = require('passport-github').Strategy;
var passport = require('passport');

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

module.exports = passport;