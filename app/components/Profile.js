var React = require('react');

var Profile = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <img src={this.props.user.github_avatar_url}></img>
        </div>
        <div>
          <a href={this.props.user.github_profileUrl}>{this.props.user.github_handle}</a>
        </div>
        <div>
          {this.props.user.github_display_name}
        </div>

      </div>
    )
  }
});

module.exports = Profile;
