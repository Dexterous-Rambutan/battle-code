var React = require('react');


var Staging = React.createClass({
  hoverPractice: false,
  hoverChallenge: false,
  onMouseOverPractice: function(){
    this.hoverPractice = true;
    this.forceUpdate()
  },
  onMouseOutPractice: function(){
    this.hoverPractice = false;
    this.forceUpdate()
    console.log(this.hover);
  },
  onMouseOverChallenge: function(){
    this.hoverChallenge = true;
    this.forceUpdate()
  },
  onMouseOutChallenge: function(){
    this.hoverChallenge = false;
    this.forceUpdate()
    console.log(this.hover);
  },
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
          <div onMouseOver={this.onMouseOverPractice} onMouseOut={this.onMouseOutPractice} onClick={getListofProblemsAndNav} className="mode card card-vertical card-vertical-clickable">
            <div className="mode-handle">
              <img src="/img/training.png" />
            </div>
            <div className="card-content">
              <h3>TRAINING</h3>
            </div>

          </div>
          <div onClick={this.navChallengeArena} onMouseOver={this.onMouseOverChallenge} onMouseOut={this.onMouseOutChallenge} className="mode card card-vertical card-vertical-clickable">
            <div className="mode-handle">
              <img src="/img/battle.png" />
            </div>
            <div className="card-content">
              <h3>ARENA</h3>
            </div>

          </div>

        </div>
        <div className='description-staging'>
          {this.hoverPractice ? <div className='description-practice'><img src="/img/description-practice.png" /></div> : null}
          {this.hoverChallenge ? <div className='description-challenge'><img src="/img/description-challenge.png" /></div> : null}
        </div>
      </div>
    )
  }
});

module.exports = Staging;
