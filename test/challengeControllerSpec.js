var assert = require('chai').assert;
var request = require('request');

var challengeController = require('../server/challenges/challengeController.js');

describe('challengeController', function () {
  before(function (done) {
    request('http://127.0.0.1:3000/api/resetDBWithData', function () {
      done();
    });
  });
  
  describe('getChallenge', function () {
    it('should be a function', function () {
      assert.isFunction(challengeController.getChallenge);
    });
    it('should get a random by challengeID', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/challenges',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.isNumber(body.id);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('getChallengeMultiplayer', function () {
    it('should be a function', function() {
      assert.isFunction(challengeController.getChallengeMultiplayer);
    });
    it('should get a random challenge that two players have not seen', function (done) {
      challengeController.getChallengeMultiplayer({
        body: {
          player1_github_handle: 'kweng2',
          player2_github_handle: 'alanzfu'
        }
      }, function (challenge) {
        assert.isAbove(challenge.id, 3);
        assert.isBelow(challenge.id, 6);
        done();
      })
    });
  });

  describe('getChallengeById', function () {
    it('should be a function', function () {
      assert.isFunction(challengeController.getChallengeById);
    });
    it('should get a challenge by challengeID', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/challenges/3',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(body.id, 3);
        assert.equal(body.name, "Test function three")
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    it('should return 404/null if challenge does not exist', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/challenges/15',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(body, null);
        assert.equal(response.statusCode, 404);
        done();
      });
    });
  });
  describe('addChallenge', function () {
    it('should be a function', function () {
      assert.isFunction(challengeController.addChallenge);
    });
    it('should add a new challenge', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/challenges',
        method: 'POST',
        json: {
          name: 'testing_name',
          prompt: 'testing_prompt',
          test_suite: 'testing_test_suite'
        }
      }, function (err, response, body) {
        assert.equal(response.statusCode, 201);
        assert.equal(body.name, 'testing_name');
        assert.equal(body.prompt, 'testing_prompt');
        assert.equal(body.test_suite, 'testing_test_suite');
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
