var React = require('react');

var SoloStaging = React.createClass({
  render: function () {
    var listOfProblems = this.props.user.user_problems.map(function (problem) {
      var linkToProblem = function(){
        this.props.navActions.navSoloArena(problem);
      }.bind(this);
      return <a href="#" onClick={linkToProblem}><li>Challenge ID:{problem.challenge_id} - {problem.valid ? 'Completed:' : 'Attempted:'} - {problem.end_time}</li></a>
    }.bind(this));

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
