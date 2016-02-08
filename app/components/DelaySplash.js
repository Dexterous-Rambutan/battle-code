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

    <div id='delaysplash'>
     <div class="loader">Loading...</div>
    {this.props.arena.delay >0 ?
      <div>

        <p>Configuring battle against {this.props.arena.opponent_info.github_handle}.</p>
        <span>Battle starts in: {this.props.arena.delay}</span>
      </div>

    : null}

    </div>

    )
  }
});

module.exports = DelaySplash;
