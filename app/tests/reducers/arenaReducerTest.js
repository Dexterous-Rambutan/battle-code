var expect = require('expect');
var arenaReducer = require('../../reducers/arenaReducers.js');
var actions = require('../../constants').action;
describe('Arena Reducer', function(){

  describe('#arenaReducer (immutability of state)', function(){
    // inital state for Arena Reducer
    var initialArenaReducer = {
      problem_id: 0,
      content: "",
      opponent_content: "",
      submissionMessage: "Nothing passing so far...(From initial arena reducer)",
      socket: {},
      editor: {},
      syntaxMessage: '',
      errors: []
    }

    Object.freeze(initialArenaReducer);

    it('should return the initial state', function(){
      expect(
        arenaReducer(undefined, {})
      ).toEqual(initialArenaReducer)
    })

    it('should store a solo problem', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.STORE_SOLO_PROBLEM,
        payload: {
          id: 1,
          prompt:'test problem prompt'
        }
      })
      expect(state.content).toEqual('test problem prompt');
      expect(state.problem_id).toEqual(1);
    })

    it('should store syntax errors', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.SYNTAX_ERROR,
        payload: ['error1', 'error2']
      })
      expect(state.syntaxMessage).toBeA('string');
      expect(state.errors).toEqual(['error1', 'error2']);
    })

    it('should delete syntax errors when fixed', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.NO_SYNTAX_ERROR,
      })
      expect(state.syntaxMessage).toEqual('');
      expect(state.errors).toEqual([]);
    })

    it('should store ace editor on state', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.STORE_EDITOR,
        payload: {}
      })
      expect(state.editor).toBeA('object');
    })

    it('should store submission message on successful solution post', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.SUBMIT_PROBLEM_SUCCESS,
      })
      expect(state.submissionMessage).toBeA('string').toEqual('Victory!');
    })

    it('should store error message on failing test', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.SUBMIT_PROBLEM_WRONG,
        payload:'example error'
      })
      expect(state.submissionMessage).toBeA('string').toEqual('example error');
    })

    it('should store problem content and id', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.GET_PROBLEM_SUCCESS,
        payload: {
          id: 1,
          content:'test problem prompt'
        }
      })
      expect(state.content).toEqual('test problem prompt');
      expect(state.problem_id).toEqual(1);
    })

    it('should store socket', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.CREATE_SOCKET,
        payload: {}
      })
      expect(state.socket).toBeA('object');
    })
  })
})
