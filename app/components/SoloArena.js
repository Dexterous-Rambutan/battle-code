var React = require('react');
var io = require('socket.io-client');

var ErrorList = require('./ErrorList');
var socket = require('../sockets/socket-helper');

var selfEditorOptions = {
  // theme: "ace/theme/solarized_light",
  theme: "ace/theme/monokai",
  mode: "ace/mode/javascript",
  blockScrolling: Infinity,
  useSoftTabs: true,
  tabSize: 2,
  wrap: true
};

var SoloArena = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setOptions(selfEditorOptions);
    this.props.arenaActions.storeEditor(editor);
  },
  componentDidUpdate: function(){
    this.props.arena.editorSolo.setValue(this.props.arena.content,1);
  },

  render: function() {
    var submitProblem = function(){
      var errors = this.props.arena.editorSolo.getSession().getAnnotations();
      var content = this.props.arena.editorSolo.getSession().getValue();
      this.props.arenaActions.submitProblem(errors, content, this.props.arena.socket.id, this.props.arena.problem_id, this.props.user.github_handle, 'solo');
    }.bind(this);
    return (
      <div>
        <div id="editor">
        </div>
        <button onClick={submitProblem}>Submit Solution</button>
        <ErrorList syntaxMessage={this.props.arena.syntaxMessage} errors={this.props.arena.errors} />
        <div>{this.props.arena.submissionMessage}</div>
      </div>
    );
  }
});

module.exports = SoloArena;
