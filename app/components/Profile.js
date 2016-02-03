var React = require('react');

var Profile = React.createClass({
  render: function() {
    var listOfProblems = this.props.user.user_problems.map(function (problem) {
      var linkToProblem = function(){
        this.props.navActions.navSoloArena(problem);
      }.bind(this);
      return <a href="#" onClick={linkToProblem}><li>Challenge ID:{problem.challenge_id} - {problem.valid ? 'Completed:' : 'Attempted:'} - {problem.end_time}</li></a>
    }.bind(this));
    var wins = 0;
    var loss = 0;
    this.props.user.user_match_history.forEach(function (match) {
      wins += match.win ? 1 : 0;
      loss += match.win ? 0 : 1;
    });

    return (
      <div className="profile">
        <div className="profile-img">
          <img src={this.props.user.github_avatar_url}></img>
        </div>
        <div className="profile-github">
          <a href={this.props.user.github_profileUrl}>{this.props.user.github_handle}</a>
        </div>
        <div className="profile-name">
          {this.props.user.github_display_name}
        </div>
        <div className="profile-record">
          Wins: {wins} &nbsp;
          Losses: {loss}
        </div>
        <div className="profile-challenges">
          {listOfProblems}
        </div>
      </div>
    )
  }
});

module.exports = Profile;
