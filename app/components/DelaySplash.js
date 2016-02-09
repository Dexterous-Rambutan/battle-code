var React = require('react');
var actions = require('../constants').action;
var DelaySplash = React.createClass({
  componentDidUpdate: function () {
    console.log(this.props.arena.delay)
    if(this.props.arena.delay > 0){
      setTimeout(this.props.arenaActions.countdown, 1000)
    }
  },
  render: function() {
    return (
    <div className='delaysplash'>
      <div className="card player-card user-card">
        <div className="player-card-handle">
          <img src={this.props.user.github_avatar_url} />
        </div>
        <div className="card-content">
          <h2>{this.props.user.github_handle}</h2>
        </div>
      </div>
      <div className="card player-card opponent-card">
        <div className="card-content">
          <h2>{this.props.arena.opponent_info.github_handle}</h2>
        </div>
        <div className="player-card-handle">
          <img src={this.props.arena.opponent_info.github_avatar_url} />
        </div>
      </div>
      <div className="card countdown-card">
        {"Starting in " + this.props.arena.delay + "..."}
      </div>
    </div>
    )
  }
});

module.exports = DelaySplash;
