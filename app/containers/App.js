var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

var actions = require('../actions');

var Arena = require('../components/Arena');
var Login = require('../components/Login');
var Staging = require('../components/Staging');
var Leaderboard = require('../components/Leaderboard');
var NavBar = require('../components/NavBar');

var LOGIN = require('../constants').view.LOGIN;
var ARENA = require('../constants').view.ARENA;
var STAGING = require('../constants').view.STAGING;
var LEADERBOARD = require('../constants').view.LEADERBOARD;


var contextType = {
  redux: React.PropTypes.object
}

var App = React.createClass({
  //switch cases for views
  render: function(){
    // TODO SEND AUTH GET REQ
    //get request to AUTH
      //if loggedin
        //switch case
        //default is STAGING
      //else
        //switch case
        //default is LOGIN
    switch(this.props.view) {
      case LOGIN:
        return (
          <div>
            <NavBar navActions={this.props.navActions}/>
            <Login {...this.props}/>
          </div>
        );

      case STAGING:
        return (
          <div>
            <NavBar navActions={this.props.navActions}/>
            <Staging {...this.props}/>
          </div>
        );

      case ARENA:
        return (
          <div>
            <NavBar navActions={this.props.navActions}/>
            <Arena {...this.props}/>
          </div>
        );

      case LEADERBOARD:
        return (
          <div>
            <NavBar {...this.props}/>
            <Leaderboard {...this.props}/>
          </div>
        );
      default:
        return (
          <div>
            <NavBar navActions={this.props.navActions}/>
            <Login {...this.props}/>
          </div>
        );
    }
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
  var actionsObj = {}
  for(var key in actions) {
    actionsObj[key] = bindActionCreators(actions[key], dispatch);
  }
  return actionsObj;
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
