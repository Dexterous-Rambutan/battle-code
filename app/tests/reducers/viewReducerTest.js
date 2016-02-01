var expect = require('expect');
var viewReducer = require('../../reducers/viewReducers.js');
var actions = require('../../constants').action;
var views = require('../../constants').view;
describe('View Reducer', function(){

  describe('#viewReducer (immutability of state)', function(){
    // inital state for Arena Reducer
    var initialViewReducer = views.STAGING;

    Object.freeze(initialViewReducer);

    it('should return the initial state (STAGING)', function(){
      expect(
        viewReducer(undefined, {})
      ).toEqual(initialViewReducer)
    })

    it('should store STAGING view on state', function(){
      var state = viewReducer(initialViewReducer, {
        type: actions.NAV_STAGING
      })
      expect(state).toEqual(views.STAGING)
    })

    it('should store SOLO_STAGING view on state', function(){
      var state = viewReducer(initialViewReducer, {
        type: actions.NAV_SOLO_STAGING
      })
      expect(state).toEqual(views.SOLO_STAGING)
    })

    it('should store SOLO_ARENA view on state', function(){
      var state = viewReducer(initialViewReducer, {
        type: actions.NAV_SOLO_ARENA
      })
      expect(state).toEqual(views.SOLO_ARENA)
    })

    it('should store CHALLENGE_ARENA view on state', function(){
      var state = viewReducer(initialViewReducer, {
        type: actions.NAV_CHALLENGE_ARENA
      })
      expect(state).toEqual(views.CHALLENGE_ARENA)
    })

    it('should store LOGIN view on state when LOGOUT action is dispatched', function(){
      var state = viewReducer(initialViewReducer, {
        type: actions.LOGOUT
      })
      expect(state).toEqual(views.LOGIN)
    })

    it('should store PROFILE view on state', function(){
      var state = viewReducer(initialViewReducer, {
        type: actions.NAV_PROFILE
      })
      expect(state).toEqual(views.PROFILE)
    })

  })
})
