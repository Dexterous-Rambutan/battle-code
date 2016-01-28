var React = require('react');

var ErrorList = React.createClass({
  render: function() {
    var errors = this.props.errors.map(function(error){
      return (
        <li>Row: {error.row} - {error.text}</li>
      )

    })
    return (
      <div>
        {this.props.syntaxMessage}
        <ul>
          {errors}
        </ul>
      </div>
    )
  }
});

module.exports = ErrorList;
