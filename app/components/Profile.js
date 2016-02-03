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
      <div>
        <div>
          <img src={this.props.user.github_avatar_url}></img>
        </div>
        <div>
          <a href={this.props.user.github_profileUrl}>{this.props.user.github_handle}</a>
        </div>
        <div>
          {this.props.user.github_display_name}
        </div>
        <div>
          Wins: {wins} &nbsp;
          Losses: {loss}
        </div>
        <div>
          {listOfProblems}
        </div>
      </div>
    )
  }
});

module.exports = Profile;
