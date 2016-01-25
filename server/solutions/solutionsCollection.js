var db = require('../dbConfig');
var Solution = require('./solutionModel.js');

var Solutions = db.Collection.extend({
  model: Solution
});
