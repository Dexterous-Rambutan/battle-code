var React = require('react');
var io = require('socket.io-client');
var socket = require('../sockets/socket-helper');
var _ = require('lodash');
var ErrorList = require('./ErrorList');
var DelaySplash = require('./DelaySplash');
var Leaderboard = require('./Leaderboard');

var selfEditorOptions = {
  theme: "ace/theme/solarized_light",
  mode: "ace/mode/javascript",
  useSoftTabs: true,
  tabSize: 2,
  wrap: true,
  showPrintMargin: false,
  fontSize: 16
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
    editor.$blockScrolling = Infinity;
    this.props.arenaActions.storeEditor(editor);

    //setting up opponnent editor
    var editor2 = ace.edit('editor2');
    editor2.setOptions(challengerEditorOptions);
    editor2.$blockScrolling = Infinity;
    this.props.arenaActions.storeEditorOpponent(editor2);
  },
  emitSocket: function () {

    if(this.props.arena.editorSolo.getSession().getValue()){
      this.props.arena.socket.emit('update', this.props.arena.editorSolo.getSession().getValue())
    }
  },
  submitProblem: function(){
      var errors = this.props.arena.editorSolo.getSession().getAnnotations();
      var content = this.props.arena.editorSolo.getSession().getValue();
      this.props.arenaActions.submitProblem(errors, content, this.props.arena.socket.id, this.props.arena.problem_id, this.props.user.github_handle, 'battle');
  },
  render: function() {
    return (
      <div className="content">
        <div className="arena">
          <div className="editors">
            <div id="editor" onKeyPress={this.emitSocket} className='player-editor'></div>
            <div id="editor2" className='opponent-editor'></div>
          </div>
          <div>
            <div className="challenge-arena-buttons">
              <button className="submit submit-challenge" onClick={this.submitProblem}>SUBMIT</button>
            </div>
            <div></div>
          </div>
          <div className="console">
            {this.props.arena.opponentStatus !== '' ? <div>{this.props.arena.opponentStatus}</div> : null}
            {this.props.arena.status !== '' ? <div>{this.props.arena.status}</div> : null}
            {this.props.arena.stdout}
            {this.props.arena.syntaxMessage !== '' ? <ErrorList syntaxMessage={this.props.arena.syntaxMessage} errors={this.props.arena.errors}/> : null}
            {submissionMessage}
          </div>
          {this.props.arena.opponentStatus === 'Player has joined. Challenge starting soon...' ? <div className="backdrop"><DelaySplash {...this.props}/></div>: null}
        </div>
      </div>
    )
  },

  componentDidUpdate: function(){
    this.props.arena.editorSolo.setValue(this.props.arena.content,1);
  }
});

module.exports = ChallengeArena;
