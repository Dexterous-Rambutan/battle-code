var React = require('react');

var Staging = React.createClass({
  render: function() {
    console.log('poop',this.props)
    return (
      <div>
        <button onClick={this.props.navActions.navArena}>Ready?</button>
      </div>
    )
  }
});

module.exports = Staging;
