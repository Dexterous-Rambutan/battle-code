//react & redux require
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

//actions require
var actions = require('../actions');

//component require
var SoloArena = require('../components/SoloArena');
var ChallengeArena = require('../components/ChallengeArena');
var Login = require('../components/Login');
var Staging = require('../components/Staging');
var Leaderboard = require('../components/Leaderboard');
var NavBar = require('../components/NavBar');

//constant requires (views)
var LOGIN = require('../constants').view.LOGIN;
var SOLO_ARENA = require('../constants').view.SOLO_ARENA;
var CHALLENGE_ARENA = require('../constants').view.CHALLENGE_ARENA;
var STAGING = require('../constants').view.STAGING;
var LEADERBOARD = require('../constants').view.LEADERBOARD;


var contextType = {
  redux: React.PropTypes.object
}

var App = React.createClass({
  componentWillMount: function(){
    this.props.loginActions.checkLoggedIn();
  },

  render: function(){
    if(this.props.user.isLoggedIn){
      switch(this.props.view) {
        case STAGING:
          //history.pushState(store.getState(), 'Staging', "staging");
          return (
            <div>
              <NavBar navActions={this.props.navActions}/>
              <Staging {...this.props}/>
            </div>
          );
        case SOLO_ARENA:
          //history.pushState(store.getState(), 'Arena', "arena");
          return (
            <div>
              <NavBar navActions={this.props.navActions}/>
              <SoloArena {...this.props}/>
            </div>
          );
        case CHALLENGE_ARENA:
          //history.pushState(store.getState(), 'Arena', "arena");
          return (
            <div>
              <NavBar navActions={this.props.navActions}/>
              <ChallengeArena {...this.props}/>
            </div>
          );
        case LEADERBOARD:
          //history.pushState(store.getState(), 'Leaderboard', "leadboard");
          return (
            <div>
              <NavBar {...this.props}/>
              <Leaderboard {...this.props}/>
            </div>
          );
      }
    } else {
      //history.pushState(store.getState(), 'Login', "login");
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
