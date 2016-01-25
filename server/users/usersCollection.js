var db = require('../helpers/dbConfig');
var User = require('./userModel.js');

var Users = db.Collection.extend({
  model: User
});

module.exports = Users;
