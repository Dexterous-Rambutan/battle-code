var React = require('react');

var Staging = React.createClass({
  componentDidMount: function(){
    this.props.stagingActions.createSocket();
  },
  render: function() {
    var getListofProblemsAndNav = function(){
      this.props.navActions.navSoloStaging(this.props.user.github_handle);
    }.bind(this);

    return (
      <div>
        <button onClick={getListofProblemsAndNav}>PRACTICE</button>
        <button onClick={this.props.navActions.navChallengeArena}>CHALLENGE</button>
      </div>
    )
  }
});

module.exports = Staging;
