var db = require('../helpers/dbConfig');
var User = require('../users/userModel');

var Solution = db.Model.extend({
  tableName: 'solutions',
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  challenge: function() {
    var Challenge = require('../challenges/challengeModel');
    return this.belongsTo(Challenge, 'challenge_id');
  }
});

module.exports = Solution;
