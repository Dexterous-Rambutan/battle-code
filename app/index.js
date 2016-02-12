'use strict';

var React = require('react');
var render = require('react-dom').render;
var Provider = require('react-redux').Provider;

var App = require('./containers/App');

var configureStore = require('./store/configureStore');




var store = configureStore();
// store.subscribe(() => {
//   console.log('state changed',store.getState());
// });


window.store = store;
store.getState();

require('./sockets/socket-helper');

render(
 <Provider store={store}>
  <App />
 </Provider>,
 document.getElementById('app')
);
