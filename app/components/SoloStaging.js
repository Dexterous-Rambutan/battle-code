var React = require('react');
var moment = require('moment');

var SoloStaging = React.createClass({
  render: function () {

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
            <span className="challenge-date">Seen: {moment(problem.start_time).format('l')}</span>
          </div>
        </div>
      )
    }.bind(this));

    return (
      <div>
        <div className="overlay" onClick={this.props.navActions.navStaging}></div>
          {
            listOfProblems.length > 0 ? 
            <div className="challenge-list">
              <div className="staging-exit-container">
                <button className="staging-exit" onClick={this.props.navActions.navStaging}>X</button>
              </div>
              <div className="challenge-list-container">
                {listOfProblems}
              </div>
            </div> : 
            <div className="challenge-list">
              <div className="staging-exit-container">
                <button className="staging-exit" onClick={this.props.navActions.navStaging}>X</button>
              </div>
              <div className="challenge-list-container">
                Sorry, you do not have any problems to practice on. Please play challenge mode to unlock more problems.
                </div>
            </div>
          }
      </div>
    )
  }
});

module.exports = SoloStaging;
