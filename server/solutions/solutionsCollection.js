var db = require('../helpers/dbConfig');
var Solution = require('./solutionModel.js');

var Solutions = db.Collection.extend({
  model: Solution
});

module.exports = Solutions;
