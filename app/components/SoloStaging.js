var React = require('react');

var SoloStaging = React.createClass({
  render: function () {
    var formatDate = function (date) {
      var d = new Date(date);
      var output = '';

      output += d.getMonth() + '/';
      output += d.getDate() + '/';
      if (d.getYear() >= 100) {
        output += (d.getYear() - 100);
      } else {
        output += d.getYear();
      }
      output += ' ';
      output += (d.getHours() < 10 ? ('0' + d.getHours()) : d.getHours());
      output += ':';
      output += (d.getMinutes() < 10 ? ('0' + d.getMinutes()) : d.getMinutes());
      return output;
    }

    var listOfProblems = this.props.user.user_problems.map(function (problem) {
      var linkToProblem = function(){
        this.props.navActions.navSoloArena(problem);
      }.bind(this);
      return (
        <div className="card card-clickable challenge-card" onClick={linkToProblem}>
          <div className="challenge-card-handle">
            <img src="/img/training.png" />
          </div>
          <div className="card-content">
            {problem.challenge_name}
            <br />
            <span className="challenge-date">Seen: {formatDate(problem.start_time)}</span>
            
          </div>
        </div>
      )
    }.bind(this));

    return (
      <div className="content">
        <div className="content-header card">
          <div className="content-header-handle">
            <img src="/img/training.png" />
          </div>
          <div className="card-content">
            <h2>Practice Problem Archive</h2>
          </div>
        </div>
          {
            listOfProblems.length > 0 ? 
            <div className="challenge-list">
              <div className="challenge-list-container">
                {listOfProblems}
              </div>
            </div> : 
            <div>
              Sorry, you do not have any problems to practice on. Please play challenge or pair mode to unlock more problems.
            </div>
            }
      </div>
    )
  }
});

module.exports = SoloStaging;
