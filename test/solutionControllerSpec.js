var assert = require('chai').assert;
var request = require('request');
var io = require('socket.io-client');

var solutionController = require('../server/solutions/solutionController.js');
var Solution = require('../server/solutions/solutionModel.js');

describe('solutionControllerTest', function () {
  before(function (done) {
    console.log('Resetting DBs')
    request('http://127.0.0.1:3000/api/resetDBWithData', function () {
      done();
    });
  });

  describe('getSolutionById', function () {
    it('should be a function', function () {
      assert.isFunction(solutionController.getSolutionById);
    });
    it('should get a solution by solutionID', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/solutions/1',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(body.content, 'solved!');
        assert.equal(body.user_id, 3);
        assert.equal(body.challenge_id, 1);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    it('should return 404/null if solution does not exist', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/solutions/100',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(response.statusCode, 404);
        assert.equal(body, null)
        done();
      });
    });
  });

  describe('getAllSolutionsForUser', function () {
    it('should be a function', function () {
      assert.isFunction(solutionController.getAllSolutionsForUser);
    });
    it('should get all solutions for a user', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/solutions/user/kweng2',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(body.length, 3);
        assert.equal(body[1].challenge_id, 2);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    it('should return 404/null if user does not exist', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/solutions/user/kweng3',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(response.statusCode, 404);
        assert.equal(body, null);
        done();
      });
    });
  });
  describe('testSolution', function () {
    it('should be a function', function () {
      assert.isFunction(solutionController.testSolution);
    });
    it('should return success for a valid solution if user has already completed challenge', function (done) {
      var socket = io('http://127.0.0.1:3000');
      socket.on('connect', function () {
        request({
          url: 'http://127.0.0.1:3000/api/solutions/2',
          method: 'POST',
          json: {
            socket_id: socket.id,
            soln_str: "function two() {return 2;}",
            user_handle: 'kweng2',
            type: 'battle'
          }
        }, function (err, response, body) {
          assert.equal(response.statusCode, 201);
        });

        socket.on('eval', function(message) {
          assert.equal(message, 'victory!');
          done();
        });
      });
    });
    it('should not persist valid solutions in database if user has already completed the challenge', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/solutions/11',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(response.statusCode, 404);
        done();
      });
    });
    it('should return success for a valid solution if user has not completed challenge', function (done) {
      var socket = io('http://127.0.0.1:3000');
      socket.on('connect', function () {
        solutionController.initializeChallengeSolutions('kweng2','alanzfu', 4, function () {
          request({
            url: 'http://127.0.0.1:3000/api/solutions/4',
            method: 'POST',
            json: {
              socket_id: socket.id,
              soln_str: "function four() {return 4;}",
              user_handle: 'kweng2',
              type: 'battle'
            }
          }, function (err, response, body) {
            assert.equal(response.statusCode, 201);
          });
          
        })

        socket.on('eval', function(message) {
          assert.equal(message, 'victory!');
          done();
        });
      });
    });
    it('should return failure for an invalid solution', function (done) {
      var socket = io('http://127.0.0.1:3000');
      socket.on('connect', function () {
        request({
          url: 'http://127.0.0.1:3000/api/solutions/2',
          method: 'POST',
          json: {
            socket_id: socket.id,
            soln_str: "test solution",
            user_handle: 'kweng2'
          }
        }, function (err, response, body) {
          assert.equal(response.statusCode, 201);
        });

        socket.on('eval', function(message) {
          assert.equal(message, 'Unexpected identifier');
          done();
        })
      });
    });
    it('should not persist invalid solutons in database', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/solutions/11',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(response.statusCode, 404);
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
