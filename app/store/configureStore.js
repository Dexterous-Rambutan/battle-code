'use strict';

var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var thunk = require('redux-thunk');
var reducer = require('../reducers');


var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

function configureStore(initialState) {
  var store = createStoreWithMiddleware(reducer, initialState)

  // IF YOU WANT TO USE HOT RELOADING
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', function(){
  //     var nextReducer = require('../reducers');
  //     store.replaceReducer(nextReducer);
  //   });
  // }

  return store;
}

module.exports = configureStore;
