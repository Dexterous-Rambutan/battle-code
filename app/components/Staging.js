var React = require('react');


var Staging = React.createClass({
  navChallengeArena: function () {
    this.props.navActions.navChallengeArena(this.props.user.github_handle);
  },
  navPairArena: function () {
    this.props.navActions.navPairArena(this.props.user.github_handle);
  },
  componentDidMount: function(){
    this.props.stagingActions.createSocket();
  },
  render: function() {
    var getListofProblemsAndNav = function(){
      this.props.navActions.navSoloStaging(this.props.user.github_handle);
    }.bind(this);

    return (
      <div className="modes">
        <button onClick={getListofProblemsAndNav}>PRACTICE</button>
        <button onClick={this.navChallengeArena}>CHALLENGE</button>
        <button onClick={this.navPairArena}>PAIR</button>
      </div>
    )
  }
});

module.exports = Staging;
