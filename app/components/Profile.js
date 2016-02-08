var React = require('react');

var Profile = React.createClass({
  componentDidUpdate: function () {
    var wins = 0;
    var loss = 0;
    var matchHistory = this.props.user.user_match_history;
    // var matchHistory = store.getState().user.user_match_history;
    for ( var i = 0; i < matchHistory.length; i ++ ) {
      wins += matchHistory[i].win ? 1 : 0;
      loss += matchHistory[i].win ? 0 : 1;
    }
    console.log('Wins:', wins, 'Losses:', loss);
    var ctx = document.getElementById("myChart").getContext("2d");
    var data = [{
      value: wins,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Wins"
    },{
      value: loss,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Losses"
    }];
    var myPieChart = new Chart(ctx).Pie(data);
  },

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

    var matchHistory = this.props.user.user_match_history.map(function (match) {
      var opponent = match.opponent_github_handle;
      var opponentURL = "http://github.com/" + opponent;
      return <li>Challenge ID: {match.challenge_id} --
        Opponent: <a href={opponentURL} target="_blank">{opponent}</a> --
        <img className="opponent-profile-image" src={match.opponent_avatar} />
        Status: {match.win ? 'Won' : 'Lost'}</li>
    });

    return (
      <div>
        <div className="overlay"></div>
        <div className="profile">
          <button className="exit" onClick={this.props.navActions.navStaging}>X</button>
          <div className="profile-img">
            <img src={this.props.user.github_avatar_url}></img>
          </div>
          <div className="profile-github">
            <a href={this.props.user.github_profileUrl}>{this.props.user.github_handle}</a>
          </div>
          <div className="profile-name">
            {this.props.user.github_display_name}
          </div>


          <div className="match-stats">
            <div className="profile-record">
              Wins: {wins} &nbsp;
              Losses: {loss}
            </div>
            <div className="win-loss-record">
              <canvas id="myChart" width="300" height="300"></canvas>
            </div>
          </div>


          <div className="profile-challenges">
            <h2>Match History</h2>
            {/*listOfProblems*/}
            {matchHistory}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Profile;
