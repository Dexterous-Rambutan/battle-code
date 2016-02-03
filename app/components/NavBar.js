var React = require('react');

var Nav = React.createClass({
  navProfile: function () {
    this.props.navActions.navProfile(this.props.user.github_handle);
  },

  render: function () {
    return (
      <div className="nav-bar">
        <ul>
          {this.props.user.isLoggedIn && this.props.view !== 'CHALLENGE_ARENA' ? <li><a href='/logout'>Logout</a></li> : null}
          {this.props.user.isLoggedIn && this.props.view !== 'CHALLENGE_ARENA' ? <li><a href='#' onClick={this.navProfile}>Profile</a></li> : null}
          {this.props.user.isLoggedIn && this.props.view !== 'CHALLENGE_ARENA' ? <li><a href='#' onClick={this.props.navActions.navStaging}>Modes</a></li> : null}
          {this.props.user.isLoggedIn && this.props.view === 'CHALLENGE_ARENA' ? <li><a href='#' onClick={this.props.navActions.navAwayFromArena}>LEAVE</a></li> : null}
        </ul>
      </div>
    );
  }
});

module.exports = Nav;
