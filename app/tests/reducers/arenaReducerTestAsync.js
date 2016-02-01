var configureMockStore = require('redux-mock-store');
var thunk = require('redux-thunk');
var expect = require('expect');
var arenaReducer = require('../../reducers/arenaReducers.js');
var actions = require('../../constants').action;
var navActions = require('../../actions/navActions.js');
var nock = require('nock');
var middlewares = [ thunk ];
var mockStore = configureMockStore(middlewares);

describe('async actions', function(){
  afterEach(function() {
    nock.cleanAll()
  })



  it('fired STORE_SOLO_PROBLEM & NAV_SOLO_ARENA with navActions.spoofSolo', function(done){
    nock('http://127.0.0.1:3000')
      .get('/api/challenges/1')
      .reply(200)

    var expectedActions = [
      { type: actions.STORE_SOLO_PROBLEM } ,
      { type: actions.NAV_SOLO_ARENA }
    ]
    var store = mockStore({}, expectedActions, done)
    store.dispatch(navActions.spoofSolo())
  })
})
