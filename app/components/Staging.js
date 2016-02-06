var React = require('react');


var Staging = React.createClass({
  navChallengeArena: function () {
    this.props.navActions.navChallengeArena(this.props.user.github_handle);
  },
  componentDidMount: function(){
    this.props.stagingActions.createSocket();
  },
  render: function() {
    var getListofProblemsAndNav = function(){
      this.props.navActions.navSoloStaging(this.props.user.github_handle);
    }.bind(this);

    return (
      <div className="content">
        <div className="staging">
          <div onClick={getListofProblemsAndNav} className="mode card card-clickable">
            <div className="mode-handle">
              <img src="/img/training.png" />
            </div>
            <div className="card-content">
              <h3>TRAINING</h3>
            </div>
          </div>
          <div onClick={this.navChallengeArena} className="mode card card-clickable">
            <div className="mode-handle">
              <img src="/img/battle.png" />
            </div>
            <div className="card-content">
              <h3>ARENA</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Staging;
