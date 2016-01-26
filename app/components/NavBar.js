var React = require('react');

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <a href="/logout">Log Out</a>
        </ul>
      </div>
    );
  }
});

module.exports = Nav;
