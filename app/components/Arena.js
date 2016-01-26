var React = require('react');

var Arena = React.createClass({
  componentDidMount: function(){
    console.log('2');
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

    //getProblem - action
    //getProblem_Success
      //set current prompt = response.body
      //editor.SetValue

  },
  render: function() {
    console.log('1');
    return (
      <div id="editor">
        {this.props.something}
      </div>
    )
  }
});

module.exports = Arena;
