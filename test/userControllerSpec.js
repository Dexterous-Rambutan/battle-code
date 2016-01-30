var assert = require('chai').assert;
var request = require('request');

var userController = require('../server/users/userController.js');

describe('userController', function () {
  before(function (done) {
    console.log('Resetting DBs')
    request('http://127.0.0.1:3000/api/resetDBWithData', function () {
      done();
    });
  });

  describe('getUserById', function () {
    it('should be a function', function () {
      assert.isFunction(userController.getUserById);
    });
    it('should get a user by github handle', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/users/puzzlehe4d',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(body.github_display_name, 'Harun Davood');
        assert.equal(body.id, 2);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    it('should return 404/null if user does not exist', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/users/kweng3',
        method: 'GET',
        json: {}
      }, function (err, response, body) {
        assert.equal(response.statusCode, 404);
        assert.equal(body, null);
        done();
      });
    });
  });
  describe('addUser', function () {
    it('should be a function', function () {
      assert.isFunction(userController.addUser);
    });
    it('should add a new user', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/users',
        method: 'POST',
        json: {
          github_handle: 'battlecoderbot'
        }
      }, function (err, response, body) {
        assert.equal(body.github_handle, 'battlecoderbot');
        assert.equal(response.statusCode, 201);
        done();
      });
    });
    it('should not add a new user if user exists', function (done) {
      request({
        url: 'http://127.0.0.1:3000/api/users',
        method: 'POST',
        json: {
          github_handle: 'kweng2'
        }
      }, function (err, response, body) {
        assert.equal(body.github_handle, 'kweng2');
        assert.equal(response.statusCode, 200);
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
