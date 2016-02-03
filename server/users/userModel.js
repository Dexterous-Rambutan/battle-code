var db = require('../helpers/dbConfig');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  solutions: function() {
    var Solution = require('../solutions/solutionModel');
    return this.hasMany(Solution);
  },
  matches: function() {
    var Match = require('../matches/matchModel');
    return this.hasMany(Match);
  }
});

module.exports = User;

