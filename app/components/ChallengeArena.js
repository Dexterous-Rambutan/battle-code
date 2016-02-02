var React = require('react');
var io = require('socket.io-client');
var socket = require('../sockets/socket-helper');
var _ = require('lodash');

var selfEditorOptions = {
  theme: "ace/theme/solarized_light",
  mode: "ace/mode/javascript",
  blockScrolling: Infinity,
  useSoftTabs: true,
  tabSize: 2,
  wrap: true
};
var challengerEditorOptions = _.create(selfEditorOptions, {
  theme: "ace/theme/solarized_dark",
  readOnly: true,
  highlightActiveLine: false,
  highlightGutterLine: false
});

var ChallengeArena = React.createClass({
  componentDidMount: function() {
    //setting up solo (player) editor
    var editor = ace.edit('editor');
    editor.setOptions(selfEditorOptions);
    this.props.arenaActions.storeEditor(editor);

    //setting up opponnent editor
    var editor2 = ace.edit('editor2');
    editor2.setOptions(challengerEditorOptions);
    this.props.arenaActions.storeEditorOpponent(editor2);

    this.props.arena.socket.on('keypress', function(data){
      var array = data.split('');
      var obf = [];
      for(var i =0; i<array.length;i++){
        if (array[i] === ' ' || array[i] === '\n' || array[i] === ')' || array[i] === '(' || array[i] === '{' || array[i] === '}') {
          obf.push(array[i])
        } else {
          obf.push(String.fromCharCode(Math.floor(Math.random() * 52) + 65 ))
        }
      }
      this.props.arena.editorOpponent.setValue(obf.join(''))
    }.bind(this))


  },
  render: function() {
    var emitSocket = function () {

      if(this.props.arena.editorSolo.getSession().getValue()){
        this.props.arena.socket.emit('update', this.props.arena.editorSolo.getSession().getValue())
      }
    }.bind(this)
    return (
      <div>
        <div id="editor" onKeyPress={emitSocket} className='player'>
        </div>
        <div id="editor2" className='opponent'>
        </div>
      </div>
    )
  },

  componentDidUpdate: function(){
    this.props.arena.editorSolo.setValue(this.props.arena.content,1);
  }
});

module.exports = ChallengeArena;
