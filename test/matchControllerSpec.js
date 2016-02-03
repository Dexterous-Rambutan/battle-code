var assert = require('chai').assert;
var request = require('request');

var matchController = require('../server/matches/matchController.js');

describe('matchController', function () {
  before(function (done) {
    request('http://127.0.0.1:3000/api/resetDBWithData', function () {
      done();
    });
  });

  describe('addForBoth', function () {
    it('should be a function', function () {
      assert.isFunction(matchController.addForBoth);
    });
    it('should insert two matches for 2 users', function (done) {
      matchController.addForBoth('alanzfu', 'kweng2', 1, function (match2) {
        assert.isNumber(match2.get('challenge_id'));
        assert.equal(match2.get('user_github_handle'), 'kweng2');
        done();
      })
    })
  });

  describe('editOneWhenValid', function () {
    it('should be a function', function() {
      assert.isFunction(matchController.editOneWhenValid);
    });
    it('should edit an entry that exists', function (done) {
      matchController.editOneWhenValid({
          github_handle: 'hahnbi',
          challenge_id: 3
      }, function (userMatch) {
        assert.equal(userMatch.get('win'), true);
        assert.equal(userMatch.get('user_github_handle'), 'hahnbi');
        done();
      });
    });
  });

  describe('getAllByUser', function () {
    it('should be a function', function() {
      assert.isFunction(matchController.getAllByUser);
    });
    it('should get all matches by a user', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/users/alanzfu/matches',
        method: 'GET'
      }, function (err, response, body) {
        console.log(body);
        assert.equal(JSON.parse(body).length, 2);
        assert.equal(JSON.parse(body)[0].opponent_github_handle[0], 'hahnbi');
        done();
      });
    });
  });

  after(function (done) {
    request('http://127.0.0.1:3000/api/resetDBWithData', function () {
      done();
    });
  });
});
