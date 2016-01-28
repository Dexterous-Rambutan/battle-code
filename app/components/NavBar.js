var React = require('react');

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li><a href="/logout">Log Out</a></li>
          {this.props.user.isLoggedIn ? <li><a href='#' onClick={this.props.navActions.navProfile}>Profile</a></li> : null}
        </ul>
      </div>
    );
  }
});

module.exports = Nav;
