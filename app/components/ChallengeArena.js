var React = require('react');
var io = require('socket.io-client');
var socket = require('../sockets/socket-helper');
var _ = require('lodash');
var ErrorList = require('./ErrorList');
var DelaySplash = require('./DelaySplash');

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
    // this.props.arena.socket.on('start', function(data){
    //   var player = {
    //     github_handle: this.props.user.github_handle,
    //     github_display_name: this.props.user.github_display_name,
    //     github_profileUrl: this.props.user.github_profileUrl,
    //     github_avatar_url: this.props.user.github_avatar_url
    //   };
    //   this.props.arena.socket.emit('playerId', player)
    // }.bind(this))
    // sockets on won event
    // this.props.arena.socket.on('won', function(data){
    //   this.props.arenaActions.lostChallenge();
    // }.bind(this))

    // sockets on playerLeave event
    // this.props.arena.socket.on('playerLeave', function(data){
    //   this.props.arenaActions.playerLeave();
    // }.bind(this))

    // this.props.arena.socket.on('keypress', function(data){
    //   var array = data.split('');
    //   var obf = [];
    //   for(var i =0; i<array.length;i++){
    //     if (array[i] === ' ' || array[i] === '\n' || array[i] === ')' || array[i] === '(' || array[i] === '{' || array[i] === '}') {
    //       obf.push(array[i])
    //     } else {
    //       obf.push(String.fromCharCode(Math.floor(Math.random() * 52) + 65 ))
    //     }
    //   }
    //   this.props.arena.editorOpponent.setValue(obf.join(''))
    // }.bind(this))


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
      <div className="arena">
        <div id="editor" onKeyPress={this.emitSocket} className='player-editor'></div>
        <div id="editor2" className='opponent-editor'></div>
        {this.props.arena.content ? <div><button className="submit" onClick={this.submitProblem}>Submit Solution</button></div>: null}
        <div className="messages">
          {this.props.arena.opponentStatus === 'Player has joined. Challenge starting soon...' ? <DelaySplash {...this.props}/>: null}
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

module.exports = ChallengeArena;
