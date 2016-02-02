var db = require('../helpers/dbConfig');
var Challenge = require('../challenges/challengeModel');
var User = require('../users/userModel');

var Match = db.Model.extend({
  tableName: 'matches',
  user: function(){
    return this.belongsTo(User, 'user_id');
  },
  challenge: function(){
    return this.belongsTo(Challenge, 'challenge_id');
  }
});

module.exports = Match;
