var React = require('react');

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li onClick={this.props.navActions.navLogout}>Log Out</li>
          <li onClick={this.props.navActions.navStaging}>Staging</li>
        </ul>
      </div>
    );
  }
});

module.exports = Nav;
