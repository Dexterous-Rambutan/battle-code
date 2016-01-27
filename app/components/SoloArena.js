var React = require('react');
var io = require('socket.io-client');

var socket = require('../sockets/socket-helper');

var SoloArena = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
  },

  render: function() {
    var submitProblem = function(){
      this.props.arenaActions.submitProblem($('#editor').val(), this.props.arena.socket.id, this.props.arena.problem_id, this.props.user_handle);
    }
    return (
      <div>
        <div id="editor">
        </div>
        <button onClick={submitProblem}>Submit Solution</button>
        <div>{this.props.arena.submissionMessage}</div>
      </div>
    );
  }
});

module.exports = SoloArena;
