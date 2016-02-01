var db = require('../helpers/dbConfig');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  solutions: function() {
    var Solution = require('../solutions/solutionModel');
    return this.hasMany(Solution);
  }
});

module.exports = User;

