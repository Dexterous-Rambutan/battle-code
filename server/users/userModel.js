var db = require('../helpers/dbConfig');
var Solution = require('../solutions/solutionModel');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  solutions: function() {
    return this.hasMany(Solution);
  }
});

module.exports = User;
