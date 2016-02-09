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
      color:"rgba(0,51,0,0.6)",
      highlight: "rgba(0,51,0,0.8)",
      label: "Wins"
    },{
      value: loss,
      color: "rgba(128,0,0,0.8)",
      highlight: "rgba(128,0,0,1)",
      label: "Losses"
    }];
    var myPieChart = new Chart(ctx).Pie(data);
  },

  render: function() {
    // var listOfProblems = this.props.user.user_problems.map(function (problem) {
    //   var linkToProblem = function(){
    //     this.props.navActions.navSoloArena(problem);
    //   }.bind(this);
    //   return <a href="#" onClick={linkToProblem}><li>Challenge ID:{problem.challenge_id} - {problem.valid ? 'Completed:' : 'Attempted:'} - {problem.end_time}</li></a>
    // }.bind(this));

    var wins = 0;
    var loss = 0;
    this.props.user.user_match_history.forEach(function (match) {
      wins += match.win ? 1 : 0;
      loss += match.win ? 0 : 1;
    });

    var matchHistory = this.props.user.user_match_history.map(function (match) {
      var opponentURL = "http://github.com/" + opponent;
      var opponent = match.opponent_github_handle;
      var linkToProblem = function(){
        this.props.navActions.navSoloArena(match);
        console.log('called');
      }.bind(this);
      return (
        <div  onClick={linkToProblem} className="challenge-card card card-clickable profile-offset-card">
          <div className="challenge-card-handle"><img className="opponent-profile-image" src={match.opponent_avatar} /></div>
          {match.win ? <div className="match-result match-won">W</div>: <div className="match-result match-lost">L</div>}
          <div className="match-detail-info">
            <div>vs. <a className="match-opponent-url" href={opponentURL} target="_blank">{opponent}</a></div>
            <div>Challenge ID: {match.challenge_id}</div>
          </div>
        </div>
      )
    }.bind(this));

    return (
      <div>
        <div className="overlay" onClick={this.props.navActions.navStaging}></div>
        <div className="profile">
          <button className="exit" onClick={this.props.navActions.navStaging}>X</button>

          <div className="profile-top-row">
            <div className="basic-info card profile-card">
              <div className="profile-img">
                <img src={this.props.user.github_avatar_url}></img>
              </div>
              <div className="profile-name">
                {this.props.user.github_display_name}
              </div>
              <div className="profile-github">
                <a href={this.props.user.github_profileUrl}>{this.props.user.github_handle}</a>
              </div>
            </div>

            <div className="match-stats profile-card card">
              <div className="win-loss-record">
                <canvas id="myChart" width="200" height="250"></canvas>
              </div>
              <div className="profile-record">
                Wins: {wins} &nbsp;
                Losses: {loss}
              </div>

            </div>
          </div>


          <div className="profile-matches card">
            <h2 className="content-header match-grid-header">MATCH HISTORY</h2>
            {/*listOfProblems*/}
            <div className="profile-match-grid">
              {matchHistory}
            </div>

          </div>
        </div>
      </div>
    )
  }
});

module.exports = Profile;
