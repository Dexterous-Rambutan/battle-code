var React = require('react');

var ErrorList = React.createClass({
  render: function() {
    var errors = this.props.errors.map(function(error){
      return (
        <div className="syntax-message">
        Row: {error.row + 1} - {error.text}
        </div>
      )

    })
    return (
      <div className="error-messages">
        {this.props.syntaxMessage}
        {errors}
      </div>
    )
  }
});

module.exports = ErrorList;
