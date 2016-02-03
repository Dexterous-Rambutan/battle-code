var React = require('react');

var SoloStaging = React.createClass({
  render: function () {
    // Only render unique challenges
    var uniqueList = {};
    var listOfProblems = [];
    // Find every unique challenge, favoring completed over attempted
    // In case a user attempts the problem twice, and only solves it once, only display the valid one
    // In case a user attemps the problem once and does not solve it, display the attempted anyway
    for (var i = 0; i < this.props.user.user_problems.length; i++ ) {
      var problem = this.props.user.user_problems[i];
      if (!(uniqueList[problem.challenge_id])) {
        uniqueList[problem.challenge_id] = problem;
      } else if (problem.valid) {
        uniqueList[problem.challenge_id] = problem;
      }
    }
    for (var key in uniqueList) {
      var problem = uniqueList[key];
      var linkToProblem = function () {
        this.props.navActions.navSoloArena(problem);
      }.bind(this);
      listOfProblems.push(<a href="#" onClick={linkToProblem}><li>Challenge ID:{problem.challenge_id} - {problem.valid ? 'Completed:' : 'Attempted:'} - {problem.end_time}</li></a>);
    }

    return (
      <div className="practice-problems">
        <h2>Practice Problem Archive</h2>
        {listOfProblems.length>0 ? <ul>{listOfProblems}</ul> : <div>Sorry, you do not have any problems to practice on. Please play challenge or pair mode to unlock more problems.</div>}
        <button className="submit" onClick={this.props.navActions.spoofSolo}>Spoof Solo</button>
      </div>
    )
  }
});

module.exports = SoloStaging;
