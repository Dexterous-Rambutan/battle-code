var port = process.env.PORT || 3000;

///////////////// API key for GitHub OAuth /////////////
var apikey = require('../lib/apiKey');
var GITHUB_CLIENT_ID = apikey.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = apikey.GITHUB_CLIENT_SECRET;

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
    callbackURL: "http://104.131.141.22/login/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

module.exports = passport;