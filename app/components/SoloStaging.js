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
        {listOfProblems}
        <button onClick={this.props.navActions.navSoloArena}>Play Solo</button>
      </div>
    )
  }
});

module.exports = SoloStaging;
