var io = require('socket.io-client');
var arenaAction = require('../actions/arenaActions');


var socket = io();
socket.on('start', function(data){
  console.log('got here');
  store.dispatch(arenaAction.getProblem(data))
  // return function(dispatch){
  //   $.ajax({
  //     method: 'GET',
  //     url: '/api/challenges/' + data.challenge_id,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(data){
  //       console.log('does this work?');
  //         dispatch({
  //           type: IS_LOGGED_IN,
  //           payload: data.github_handle
  //         })
  //     },
  //     error: function(error){
  //       console.log('does this work badly?');
  //       dispatch({type: IS_LOGGED_OUT});
  //     }
  //   })
  // }
})

module.exports = socket;
