var db = require('../helpers/dbConfig');
var Solution = require('../solutions/solutionModel');

var Challenge = db.Model.extend({
  tableName: 'challenges',
  hasTimestamps: true,
  solutions: function() {
    return this.hasMany(Solution);
  }
});

module.exports = Challenge;
