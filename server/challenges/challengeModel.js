var db = require('../dbConfig');
var Solution = require('../solutions/solutionModel');

var User = db.Model.extend({
  tableName: 'challenges',
  hasTimestamps: true,
  solutions: function() {
    return this.hasMany(Solution);
  }
});

module.exports = User;
