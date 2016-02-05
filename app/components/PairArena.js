var React = require('react');
var io = require('socket.io-client');
var socket = require('../sockets/socket-helper');
var _ = require('lodash');
var ErrorList = require('./ErrorList');

var selfEditorOptions = {
  theme: "ace/theme/solarized_light",
  mode: "ace/mode/javascript",
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

var PairArena = React.createClass({
  componentDidMount: function() {
    //setting up pair editor
    var editor = ace.edit('editor');
    editor.setOptions(selfEditorOptions);
    editor.$blockScrolling = Infinity;
    this.props.arenaActions.storeEditor(editor);
  },
  ready: function () {
    this.props.arenaActions.ready();
    this.props.arena.socket.emit('ready');
  },
  emitSocket: function () {
    ///////////////////////////////////////////////////////////////
    //////// CHANGE THIS SECTION TO REFLECT PAIR MODE /////////////
    ///////////////////////////////////////////////////////////////
    // if(this.props.arena.editorSolo.getSession().getValue()){
    //   this.props.arena.socket.emit('update', this.props.arena.editorSolo.getSession().getValue())
    // }
  },
  submitProblem: function(){
      var errors = this.props.arena.editorSolo.getSession().getAnnotations();
      var content = this.props.arena.editorSolo.getSession().getValue();
      // if (errors.length > 0) {
        this.props.arena.socket.emit('syntaxErrors', errors);
      // }
      this.props.arenaActions.submitProblem(errors, content, this.props.arena.socket.id, this.props.arena.problem_id, this.props.user.github_handle, 'pair');
  },
  render: function() {

    return (
      <div className="arena">
        <div id="editor" onKeyPress={this.emitSocket} className='player-editor'></div>
        {this.props.arena.content ? <div><button className="submit" onClick={this.submitProblem}>Submit Solution</button></div>: null}
        {!this.props.arena.iAmReady ? <div><button className="ready" onClick={this.ready}>Ready</button></div>: null}
        <div className="messages">
          {!!this.props.arena.opponent_info.github_handle ? <div>OPPONENT: {this.props.arena.opponent_info.github_handle}</div> : null}
          {this.props.arena.syntaxMessage !== '' ? <ErrorList syntaxMessage={this.props.arena.syntaxMessage} errors={this.props.arena.errors}/> : null}
          {this.props.arena.submissionMessage !== "Nothing passing so far...(From initial arena reducer)" ? <div className="submission-message">SUBMISSION RESPONSE: {this.props.arena.submissionMessage}</div> : null}
          {this.props.arena.stdout !== '' ? <div className="console">Console: <br />{this.props.arena.stdout}</div> : null }
          {this.props.arena.opponentStatus !== '' ? <div>{this.props.arena.opponentStatus}</div> : null}
          {this.props.arena.status !== '' ? <div>{this.props.arena.status}</div> : null}
        </div>
      </div>
    )
  },

  componentDidUpdate: function(){
    this.props.arena.editorSolo.setValue(this.props.arena.content,1);
  }
});

module.exports = PairArena;
