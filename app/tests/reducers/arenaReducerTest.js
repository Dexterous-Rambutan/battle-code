var expect = require('expect');
var arenaReducer = require('../../reducers/arenaReducers.js');
var actions = require('../../constants').action;
describe('Arena Reducer', function(){

  describe('#arenaReducer (immutability of state); tests the storing of state variables when dispatch actions are fired', function(){
    // inital state for Arena Reducer
    var initialArenaReducer = {
      problem_id: 0,
      content: "",
      opponentStatus: "waiting for other player... when propmt appears, you may begin hacking. be ready.",
      status: '',
      opponent_content: "",
      submissionMessage: "Nothing passing so far...(From initial arena reducer)",
      socket: {},
      editorSolo: {},
      editorOpponent: {},
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
        payload: {
          solution_str: 'test string',
          errors: ['error1', 'error2']
        }
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
      expect(state.editorSolo.length).toNotEqual(0);
    })

    it('should store submission message on successful solution post', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.SUBMIT_PROBLEM_SUCCESS,
      })
      expect(state.submissionMessage).toBeA('string').toEqual("solution submitted successfully with passing results...");
    })

    it('should store error message on failing test', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.SUBMIT_PROBLEM_WRONG,
        payload:'example error'
      })
      expect(state.submissionMessage).toBeA('string').toEqual('example error');
    })

    it('should store problem content, id and empty opponentStatus', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.GET_PROBLEM_SUCCESS,
        payload: {
          prompt:'test problem prompt',
          id: 15
        }
      })
      expect(state.content).toEqual('test problem prompt');
      expect(state.opponentStatus).toEqual('');
      expect(state.problem_id).toEqual(15);
    })

    it('should store socket', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.CREATE_SOCKET,
        payload: {}
      })
      expect(state.socket).toBeA('object');
    })

    it('should clear content and player status and reset opponentStatus and submissionMessage', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.CLEAR_INFO
      })
      expect(state.content).toEqual('');
      expect(state.status).toEqual('');
      expect(state.opponentStatus).toEqual("waiting for other player... when propmt appears, you may begin hacking. be ready.");
      expect(state.submissionMessage).toEqual('Nothing passing so far...(From initial arena reducer)');
    })

    it('should update winners status on win', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.COMPLETE_CHALLENGE
      })
      expect(state.status).toEqual('YOU WON!');
    })

    it('should update losers status on loss', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.LOST_CHALLENGE
      })
      expect(state.status).toEqual('YOU LOST :(');
    })

    it('should update opponentStatus when opponent leaves room', function(){
      var state = arenaReducer(initialArenaReducer, {
        type: actions.PLAYER_LEAVE
      })
      expect(state.opponentStatus).toEqual('The other player has left the room.');
    })
  })
})
