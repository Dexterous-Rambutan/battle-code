var db = require('../helpers/dbConfig');
var User = require('../users/userModel.js');
var Match = require('../matches/matchModel.js');

module.exports = {

  //Internally Invoked when a room is filled
  addForBoth: function(user_github_handle, opponent_github_handle, challenge_id){
    User.forge({
      github_handle: user_github_handle
    })
    .fetch()
    .then(function(player1){
      return Match.forge({
        user_id: player1.get('id'),
        user_github_handle: user_github_handle,
        opponent_github_handle: opponent_github_handle,
        challenge_id: challenge_id,
        win: false
      }).save()
    })
    .then(function(){
      return User.forge({
        github_handle: opponent_github_handle
      }).fetch()
    })
    .then(function(player2){
      return Match.forge({
        user_id: player2.get('id'),
        user_github_handle: opponent_github_handle,
        opponent_github_handle: user_github_handle,
        challenge_id: challenge_id,
        win: false
      }).save()
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
  editOneWhenValid: function(checkedSolutions){
    var challenge_id = checkedSolutions.challenge_id;
    var github_handle = checkedSolutions.github_handle;
    return User.forge({
      github_handle: github_handle
    }).fetch()
    .then(function(user){
      return Match.forge({
        user_github_handle: user.get('github_handle'),
        challenge_id: challenge_id
      }).fetch()
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
          Match.forge({
            user_github_handle: opponentMatchEntry.get('opponent_github_handle'),
            challenge_id: opponentMatchEntry.get('challenge_id')
          }).fetch()
          .then(function(userMatchEntry){
            userMatchEntry.set('win', true).save();
          })
        }
      }
    })
    .catch(function(err) {
      console.log('what',err)
      return err;
    })
  },

  //Gets match history by user
  getAllByUser: function(req, res){
    User.forge({
      github_handle: req.params.githubHandle
    })
    .fetch()
    .then(function(user){
      return Match.forge({
        user_github_handle: user.get('github_handle')
      }).fetchAll()
    })
    .then(function(matches){
      res.status(201).json(matches);
    })
  },

  resetWithData: function() {
    return Match.forge({
      user_id: 1,
      user_github_handle: 'alanzfu',
      opponent_github_handle: 'hahnbi',
      win: true,
      challenge_id: 2
    }).save().then(function() {
      return Match.forge({
        user_id: 4,
        user_github_handle: 'hahnbi',
        opponent_github_handle: 'alanzfu',
        win: false,
        challenge_id: 2
      }).save();
    }).then(function() {
      return Match.forge({
        user_id: 4,
        user_github_handle: 'hahnbi',
        opponent_github_handle: 'kweng2',
        win: true,
        challenge_id: 3
      }).save();
    }).then(function() {
      return Match.forge({
        user_id: 3,
        user_github_handle: 'kweng2',
        opponent_github_handle: 'hahnbi',
        win: false,
        challenge_id: 3
      }).save()
    })
    .then(function(){
      return Match.forge({
        user_id: 2,
        user_github_handle: 'puzzlehe4d',
        opponent_github_handle: 'alanzfu',
        win: true,
        challenge_id: 1
      }).save();
    })
    .then(function() {
      return Match.forge({
        user_id: 1,
        user_github_handle: 'alanzfu',
        opponent_github_handle: 'puzzlehe4d',
        win: false,
        challenge_id: 1
      }).save();
    })
    .catch(function(err){
      console.log(err);
    })
  }
}
