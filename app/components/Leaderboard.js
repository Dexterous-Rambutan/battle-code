var React = require('react');

var Leaderboard = React.createClass({
  render: function() {
    var solutions = this.props.arena.leaderBoard.map(function(element){
      return (
        <div>
        {element.content}
        {element.github_handle}
        </div>
      )
    })
    return (
      <div>
      {solutions}
      </div>
    )
  }
});

module.exports = Leaderboard;
