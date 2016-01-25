var db = require('../helpers/dbConfig');
var Challenge = require('./challengeModel.js');

var Challenges = db.Collection.extend({
  model: Challenge
});

module.exports = Challenges;
