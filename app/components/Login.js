var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <div className="splash">
        <div className="splash-logo">
          <img src="/img/logo_full.png" />
        </div>
        <a href="/auth/github">
          <div className="github-login card card-clickable">
            <div className="github-login-handle">
              <img src="img/github_logo.png" />
            </div>
            <div className="card-content">
            <h3>Login with GitHub</h3>
            </div>
          </div>
        </a>
      </div>
    )
  }
});

module.exports = Login;
