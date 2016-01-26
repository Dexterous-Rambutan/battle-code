var React = require('react');

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <a href="/logout">Log Out</a>
          <li onClick={this.props.navActions.navStaging}>Staging</li>
        </ul>
      </div>
    );
  }
});

module.exports = Nav;
