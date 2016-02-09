var User = require('../users/userModel.js');
var Match = require('../matches/matchModel.js');
var elo = require('elo-rank')(32);
var Promise = require('bluebird');
module.exports = {

  //Internally Invoked when a room is filled
  addForBoth: function(user_github_handle, opponent_github_handle, challenge_id, callback){
    User.forge({
      github_handle: user_github_handle
    })
    .fetch()
    .then(function (player1) {
      return User.forge({
        github_handle: opponent_github_handle
      }).fetch().then(function (opponent) {
        return Match.forge({
          user_id: player1.get('id'),
          user_github_handle: user_github_handle,
          opponent_github_handle: opponent_github_handle,
          opponent_avatar: opponent.get('github_avatar_url'),
          challenge_id: challenge_id,
          win: false
        }).save();
      });
    })
    .then(function(){
      return User.forge({
        github_handle: opponent_github_handle
      }).fetch();
    })
    .then(function(player2){
      return User.forge({
        github_handle: user_github_handle
      }).fetch().then(function (opponent) {
        return Match.forge({
          user_id: player2.get('id'),
          user_github_handle: opponent_github_handle,
          opponent_github_handle: user_github_handle,
          opponent_avatar: opponent.get('github_avatar_url'),
          challenge_id: challenge_id,
          win: false
        }).save();
      });
    })
    .then(function(match){
      if(callback) {
        callback(match);
      }
    })
    .catch(function(err){
      console.log(err, 'error initiating match entries');
      return err;
    });
  },

  /*
  var toSocket = reply.socket_id;
  var challenge_id = reply.challenge_id;
  var github_handle = reply.github_handle;
  var soln_str = reply.soln_str;
  var message = reply.message;
  */
  //Internally invoked when a valid solution arrives from redisQueue
  editOneWhenValid: function(checkedSolutions, callback){
    var challenge_id = checkedSolutions.challenge_id;
    var github_handle = checkedSolutions.github_handle;
    //define vairable for winner & loser
    var winner = '';
    var loser = '';
    return User.forge({
      github_handle: github_handle
    }).fetch()
    .then(function(user){
      return Match.forge({
        user_github_handle: user.get('github_handle'),
        challenge_id: challenge_id
      }).fetch();
    })
    .then(function(userMatchEntry){
      return Match.forge({
        user_github_handle: userMatchEntry.get('opponent_github_handle'),
        challenge_id: checkedSolutions.challenge_id
      }).fetch();
    })
    .then(function(opponentMatchEntry) {
      if (opponentMatchEntry) {
        if (opponentMatchEntry.get('win') === false) {
          //set winner
          winner = opponentMatchEntry.get('opponent_github_handle');
          Match.forge({
            user_github_handle: opponentMatchEntry.get('opponent_github_handle'),
            challenge_id: opponentMatchEntry.get('challenge_id')
          }).fetch()
          .then(function (userMatchEntry) {
            //set loser
            loser = userMatchEntry.get('opponent_github_handle');
            return userMatchEntry.set('win', true).save();
          })
          .then(function () {
            if(callback) {
              //callback assignEloRating(winner, loser)
              callback(winner, loser);
            }
          });
        }
      }
    })
    .catch(function(err) {
      console.log('what',err);
      return err;
    });
  },
  assignEloRating: function(winner, loser){
    //make promise for winnerUser
    var winnerUser = function(winner) {
      return User.forge({
      github_handle: winner
      }).fetch();
    }

    //make Promise for loserUser
    var loserUser = function(loser) {
      return User.forge({
        github_handle: loser
      }).fetch();
    }
    //join promisese with .all
      Promise.all([winnerUser(winner), loserUser(loser)]).then(function(players){
        var winner = players[0];
        var loser = players[1];
        // elo rating calculations
        var expectedWinnerScore = elo.getExpected(winner.get('elo_rating'), loser.get('elo_rating'));
        var expectedLoserScore = elo.getExpected(loser.get('elo_rating'), winner.get('elo_rating'));
        winner.set('elo_rating', elo.updateRating(expectedWinnerScore, 1 , winner.get('elo_rating'))).save();
        loser.set('elo_rating', elo.updateRating(expectedLoserScore, 0, loser.get('elo_rating'))).save();
      }).catch(function(err){
        console.log(err, 'error getting players');
      })
  },
  //Gets match history by user
  getAllByUser: function(req, res, callback){
    User.forge({github_handle: req.params.githubHandle})
    .fetch({withRelated: ['matches']})
    .then(function (user) {
      var matches = user.related('matches');
      res.status(201).json(matches);
      return matches;
    })
    .then(function (matches) {
      if(callback) {
        callback(matches);
      }
    })
    .catch(function (err) {
      res.status(404).end();
    });
  },

  resetWithData: function() {
    return Match.forge({
      user_id: 1,
      user_github_handle: 'alanzfu',
      opponent_github_handle: 'hahnbi',
      opponent_avatar: "https://avatars1.githubusercontent.com/u/12260923?v=3&s=400",
      win: true,
      challenge_id: 2
    }).save().then(function() {
      return Match.forge({
        user_id: 4,
        user_github_handle: 'hahnbi',
        opponent_github_handle: 'alanzfu',
        opponent_avatar: "https://avatars2.githubusercontent.com/u/7851211?v=3&s=400",
        win: false,
        challenge_id: 2
      }).save();
    }).then(function() {
      return Match.forge({
        user_id: 4,
        user_github_handle: 'hahnbi',
        opponent_github_handle: 'kweng2',
        opponent_avatar: "https://avatars2.githubusercontent.com/u/13741053?v=3&s=460",
        win: true,
        challenge_id: 3
      }).save();
    }).then(function() {
      return Match.forge({
        user_id: 3,
        user_github_handle: 'kweng2',
        opponent_github_handle: 'hahnbi',
        opponent_avatar: "https://avatars1.githubusercontent.com/u/12260923?v=3&s=400",
        win: false,
        challenge_id: 3
      }).save();
    })
    .then(function(){
      return Match.forge({
        user_id: 2,
        user_github_handle: 'puzzlehe4d',
        opponent_github_handle: 'alanzfu',
        opponent_avatar: "https://avatars2.githubusercontent.com/u/7851211?v=3&s=400",
        win: true,
        challenge_id: 1
      }).save();
    })
    .then(function() {
      return Match.forge({
        user_id: 1,
        user_github_handle: 'alanzfu',
        opponent_github_handle: 'puzzlehe4d',
        opponent_avatar: "https://avatars0.githubusercontent.com/u/12518929?v=3&s=400",
        win: false,
        challenge_id: 1
      }).save();
    })
    .catch(function(err){
      console.log(err);
    });
  }
};
