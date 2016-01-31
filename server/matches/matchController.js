var db = require('../helpers/dbConfig');
var User = require('./userModel.js');

module.exports = {

  //Internally Invoked when a room is filled
  addForBoth: function(user_id, opponent_id, challenge_id){
    return Match.forge({
      user_id: user_id,
      opponent_id: opponent_id,
      challenge_id: challenge_id
    }).save().then(function(){
      Match.forge({
        user_id: user_id,
        opponent_id: opponent_id,
        challenge_id: challenge_id
      }).save();
    })
    .catch(function(err){
      console.log(err, 'error creating match entries');
    })
  },

  //TODO:still need to store socketId on the user

  /*
  var toSocket = reply.socket_id;
  var challenge_id = reply.challenge_id;
  var github_handle = reply.github_handle;
  var soln_str = reply.soln_str;
  var message = reply.message;
  */
  editOneWhenValid: function(checkedSolutions, opponentSocketId){
    var challenge_id = checkedSolutions.challenge_id;
    User.forge({
      socket_id: opponentSocketId
    })
    .fetch()
    .then(function(opponent){
      return User.forge({
        socket_id: checkedSolutions.socket_id
      })
    })
    .then(function(user){
      return Match.forge({
        opponent_id: opponent.get('id'),
        challenge_id: checkedSolutions.challenge_id
      })
    })
    .fetch()
    .then(function(opponentMatchEntry){
      if (opponentMatchEntry) {
        if (opponentMatchEntry.win === false) {
          //edit user match to be true;
        }
      }
    })
  },

  //Gets match history by user
  getAllByUser: function(req, res){
    User.forge({
      github_handle: req.params.github_handle
    })
    .fetch()
    .then(function(user){
      return Match.forge({
        user_id: user.get('id')
      }).fetchAll()
    })
    .then(function(matches){
      res.status(201).json(matches);
    })

  }
}
