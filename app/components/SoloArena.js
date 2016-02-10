var React = require('react');
var io = require('socket.io-client');

var ErrorList = require('./ErrorList');
var socket = require('../sockets/socket-helper');

var selfEditorOptions = {
  theme: "ace/theme/dawn",
  mode: "ace/mode/javascript",
  useSoftTabs: true,
  tabSize: 2,
  wrap: true,
  showPrintMargin: false,
  fontSize: 14,
};

var SoloArena = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setOptions(selfEditorOptions);
    editor.$blockScrolling = Infinity;
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

    var submissionMessage;
    if (this.props.arena.submissionMessage === "Nothing passing so far...(From initial arena reducer)") {
      submissionMessage = null;
    } else if (this.props.arena.submissionMessage === "Solution passed all tests!") {
      submissionMessage = <div className="success-messages">{this.props.arena.submissionMessage}</div>
    } else {
      submissionMessage = <div className="error-messages">{this.props.arena.submissionMessage}</div>
    }
    return (
      <div className="content">
        {this.props.arena.spinner ? <img className="spinner" src="https://shortpixel.com/img/spinner2.gif" /> : null}
        <div className="arena">
          <div id="editor" className="solo-editor"></div>
          <div className="arena-buttons">
            <button className="reset reset-challenge" onClick={this.props.arenaActions.resetPrompt}>RESET</button>
            <button className="submit submit-challenge" onClick={submitProblem}>SUBMIT</button>
          </div>
          <div className="console">{this.props.arena.stdout}
            {this.props.arena.syntaxMessage !== '' ? <ErrorList syntaxMessage={this.props.arena.syntaxMessage} errors={this.props.arena.errors}/> : null}
            {submissionMessage}
          </div>

        </div>
      </div>
    );
  }
});

module.exports = SoloArena;
