var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

var actions = require('../actions');

var contextType = {
  redux: React.PropTypes.object
}

var App = React.createClass({
  //switch cases for views
  render: function(){
    return (
      <div>
        test
      </div>
    );
  }
});

function mapStateToProps(state) {
    // instantiate empty object
    // keys currently are: user, view, newRace, activeRace
    var mapping = {};

    for (var k in state){
      mapping[k] = state[k];
    }

  return mapping;
}

function mapDispatchToProps(dispatch) {
  // console.log("THE MAPPED ACTIONS", actions);
  var actionsObj = {};
  for(var key in actions) {
    actionsObj[key] = bindActionCreators(actions[key], dispatch);
  }
  console.log('actionsObj',actionsObj);
  return actionsObj;
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
