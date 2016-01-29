var assert = require('chai').assert;
var request = require('request');
var solutionController = require('../server/solutions/solutionController.js');
var userController = require('../server/users/userController.js');
var challengeController = require('../server/challenges/challengeController.js');

describe('solutionControllerTest', function () {
  before(function (done) {
    request('http://127.0.0.1:3000/api/resetDBWithData', function () {
      done();
    })
  })

  describe('getSolutionById', function () {
    it('should be a function', function () {
      assert.isFunction(solutionController.getSolutionById);
    });
    it('should get a solution by solutionID', function (done) {
      request('http://127.0.0.1:3000/api/solutions/1', function (err, response, body) {
        var solution = JSON.parse(body);
        assert.equal(solution.content, 'solved!');
        assert.equal(solution.user_id, 3);
        assert.equal(solution.challenge_id, 1);
        done();
      })
    });
    it('should return 404/null if user does not exist', function (done) {
      request('http://127.0.0.1:3000/api/solutions/10', function (err, response, body) {
        var solution = JSON.parse(body);
        assert.equal(response.statusCode, 404);
        assert.equal(solution, null)
        done();
      })
    })
  })
  describe('getAllSolutionsForUser', function () {
    it('should be a function', function () {
      assert.isFunction(solutionController.getAllSolutionsForUser);
    });
    it('should get all solutions for a user', function (done) {
      request('http://127.0.0.1:3000/api/solutions/user/kweng2', function (err, response, body) {
        var solutions = JSON.parse(body);
        assert.equal(solutions.length, 3);
        assert.equal(solutions[1].challenge_id, 2);
        done();
      });
    });
    it('should return 404/null if user does not exist', function (done) {
      request('http://127.0.0.1:3000/api/solutions/user/kweng3', function (err, response, body) {
        var solutions = JSON.parse(body);
        assert.equal(response.statusCode, 404);
        assert.equal(solutions, null)
        done();
      })
    })
  });
})

describe('userController', function () {
  describe('getUserById', function () {
    it('should be a function', function () {
      assert.isFunction(userController.getUserById);
    });
    it('should get a user by github handle', function (done) {
      request('http://127.0.0.1:3000/api/users/puzzlehe4d', function (err, response, body) {
        var user = JSON.parse(body);
        assert.equal(user.github_display_name, 'Harun Davood');
        assert.equal(user.id, 2);
        done();
      });
    });
    it('should return 404/null if user does not exist', function (done) {
      request('http://127.0.0.1:3000/api/users/kweng3', function (err, response, body) {
        var user = JSON.parse(body);
        assert.equal(response.statusCode, 404);
        assert.equal(user, null)
        done();
      })
    })
  });
  describe('addUser', function () {
    it('should be a function', function () {
      assert.isFunction(userController.addUser);
    })
    xit('should add a new user', function () {

    });
    xit('should not add a new user if user exists', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/users',
        method: 'POST',
        json: {
          github_handle: 'kweng2'
        }
      }, function (err, response, body) {
        var user = JSON.parse(body);
        console.log(body);
        done();
      });
    });
  })
})

describe('challengeController', function () {
  describe('getChallenge', function () {
    it('should be a function', function () {
      assert.isFunction(challengeController.getChallenge);
    });
    xit('should get a random by challengeID', function (done) {

    })
  });
  describe('getChallengeById', function () {
    it('should be a function', function () {
      assert.isFunction(challengeController.getChallengeById);
    });
    xit('should get a challenge by challengeID', function (done) {

    });
    xit('should return 404/null if challenge does not exist', function (done) {

    })
  });
  describe('addChallenge', function () {
    it('should be a function', function () {
      assert.isFunction(challengeController.addChallenge);
    });
    xit('should add a new challenge', function (done) {

    })
  });
})
