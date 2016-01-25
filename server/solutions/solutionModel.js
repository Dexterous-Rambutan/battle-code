var db = require('../dbConfig');
var User = require('../users/userModel');
var Challenge = require('../challenges/challengeModel');

var Solution = db.Model.extend({
  tableName: 'solutions',
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  challenge: function() {
    return this.belongsTo(Challenge, 'challenge_id');
  }
});

module.exports = Solution;
