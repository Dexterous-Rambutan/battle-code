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
    return (
      <div id="editor">
      </div>
    )
  }
});

module.exports = SoloArena;
