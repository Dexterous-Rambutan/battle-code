var React = require('react');
var io = require('socket.io-client');


var ErrorList = require('./ErrorList');
var socket = require('../sockets/socket-helper');

var SoloArena = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.$blockScrolling = Infinity
    this.props.arenaActions.storeEditor(editor);

  },
  componentDidUpdate: function(){
    this.props.arena.editor.setValue(this.props.arena.content,1);
  },

  render: function() {
    var submitProblem = function(){
      var errors = this.props.arena.editor.getSession().getAnnotations();
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
