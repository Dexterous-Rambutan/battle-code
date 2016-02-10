var React = require('react');

var Nav = React.createClass({
  navProfile: function () {
    this.props.navActions.navProfile(this.props.user.github_handle);
  },

  render: function () {
    var showNav = (this.props.user.isLoggedIn && (this.props.view !== 'CHALLENGE_ARENA' && this.props.view !== 'SOLO_ARENA'));
    var showLeave = (this.props.user.isLoggedIn && (this.props.view === 'CHALLENGE_ARENA' || this.props.view === 'SOLO_ARENA'));
    return (
      <div className="nav-bar">
        <div className="nav-content">
          <div className="nav-logo">
            <a href='#' onClick={this.props.navActions.navAwayFromArena}>
              <img src="/img/logo_50.png" />
            </a>
          </div>
          <div className="nav-links">
            <ul>
              {showNav ? <li><a href='#' onClick={this.navProfile}>Profile</a></li> : null}
              {showNav ? <li><a href='/logout'>Logout</a></li> : null}
              {showLeave ? <li><a href='#' onClick={this.props.navActions.navAwayFromArena}>LEAVE</a></li> : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Nav;
