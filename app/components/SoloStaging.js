var React = require('react');

var SoloStaging = React.createClass({
  render: function() {
    var listOfProblems = this.props.user.user_problems.map(function(problem){
      var linkToProblem = function(){
        this.props.navActions.navSoloArena(problem);
      }.bind(this);
      return <a href="#" onClick={linkToProblem}><li>problem.name</li></a>
    });

    return (
      <div>
        <h1>Practice Problem Archive</h1>
        {listOfProblems.length>0 ? <ul>{listOfProblems}</ul> : <div>Sorry, you do not have any problems to practice on. Please play challenge or pair mode to unlock more problems.</div>}
        <button onClick={this.props.navActions.spoofProblem}>Play Solo</button>
      </div>
    )
  }
});

module.exports = SoloStaging;
