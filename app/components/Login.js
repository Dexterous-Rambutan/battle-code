var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <div>
        <a href="/auth/github">Login with GitHub</a>
      </div>
    )
  }
});

module.exports = Login;
