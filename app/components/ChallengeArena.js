var React = require('react');

var ChallengeArena = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

    //getProblem - action
    //getProblem_Success
      //set current prompt = response.body
      //editor.SetValue

  },
  render: function() {
    return (
      <div id="editor">
      </div>

    )
  }
});

module.exports = ChallengeArena;
