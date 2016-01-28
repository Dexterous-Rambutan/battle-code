var React = require('react');
var io = require('socket.io-client');


var ErrorList = require('./ErrorList');
var socket = require('../sockets/socket-helper');

var SoloArena = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    this.props.arenaActions.storeEditor(editor);
  },

  render: function() {
    var submitProblem = function(){
      var errors = this.props.arena.editor.getSession().getAnnotations();
      console.log(errors);
      var content = this.props.arena.editor.getSession().getValue();
      this.props.arenaActions.submitProblem(errors, content, this.props.arena.socket.id, this.props.arena.problem_id, this.props.user.github_handle);
    }.bind(this);
    return (
      <div>
        <div id="editor">
          {this.props.arena.content}
        </div>
        <button onClick={submitProblem}>Submit Solution</button>
        <ErrorList syntaxMessage={this.props.arena.syntaxMessage} errors={this.props.arena.errors} />
        <div>{this.props.arena.submissionMessage}</div>
      </div>
    );
  }
});

module.exports = SoloArena;
