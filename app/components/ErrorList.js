var React = require('react');

var ErrorList = React.createClass({
  render: function() {
    var errors = this.props.errors.map(function(error){
      return (
        <li>Row: {error.row + 1} - {error.text}</li>
      )

    })
    return (
      <div className="syntax-messages">
        SYNTAX ERRORS: {this.props.syntaxMessage}
        <ul>
          {errors}
        </ul>
      </div>
    )
  }
});

module.exports = ErrorList;
