var expect = require('expect');
var userReducer = require('../../reducers/userReducers.js');
var actions = require('../../constants').action;
var navActions = require('../../actions/navActions.js');
var loginActions = require('../../actions/loginActions.js');
describe('User Reducer', function(){
  var initialUserReducer = {
    isLoggedIn: false,
    github_handle: "",
    github_display_name: '',
    github_profileUrl: '',
    github_avatar_url: '',
    user_problems: []
  }

  Object.freeze(initialUserReducer);

  describe('#userReducer (immutability of state)', function(){
    // inital state for Arena Reducer


    it('should return the initial state', function(){
      expect(
        userReducer(undefined, {})
      ).toEqual(initialUserReducer)
    })

    it('should store user information when logged in', function(){
      var state = userReducer(initialUserReducer, {
        type: actions.IS_LOGGED_IN,
        payload: {
          github_handle: 'puzzlehead',
          github_display_name:'seymour butts',
          github_profileUrl:'http://example.com',
          github_avatar_url:'http://example.com'
        }
      })
      expect(state.github_handle).toEqual('puzzlehead');
      expect(state.github_display_name).toEqual('seymour butts');
      expect(state.github_profileUrl).toEqual('http://example.com');
      expect(state.github_avatar_url).toEqual('http://example.com');
      expect(state.isLoggedIn).toEqual(true);

    })

    it('should delete user information when logged out', function(){
      var state = userReducer(initialUserReducer, {
        type: actions.IS_LOGGED_IN,
        payload: {
          github_handle: 'puzzlehead',
          github_display_name:'seymour butts',
          github_profileUrl:'http://example.com',
          github_avatar_url:'http://example.com'
        }
      })
      state = userReducer(state, {
        type: actions.IS_LOGGED_OUT,
      })

      expect(state.github_handle).toEqual('');
      expect(state.github_display_name).toEqual('');
      expect(state.github_profileUrl).toEqual('');
      expect(state.github_avatar_url).toEqual('');
      expect(state.isLoggedIn).toEqual(false);

    })

    it('should store user problems that user has completed', function(){
      var state = userReducer(initialUserReducer, {
        type: actions.STORE_USER_PROBLEMS,
        payload: []
      })
      expect(state.user_problems).toBeA('array');
    })

  })


})
