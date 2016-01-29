var React = require('react');

var Profile = React.createClass({
  render: function() {
    var that = this;
    var listOfProblems = this.props.user.user_problems.map(function(problem){
      var linkToProblem = function(){
        this.props.navActions.navSoloArena(problem);
      }.bind(that);
      return <a href="#" onClick={linkToProblem}><li>Challenge ID:{problem.challenge_id} - Completed {problem.end_time}</li></a>
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
          {listOfProblems}
        </div>
      </div>
    )
  }
});

module.exports = Profile;
