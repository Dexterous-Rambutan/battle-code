//react & redux require
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var io = require('socket.io-client');


//actions require
var actions = require('../actions');

//component require
var SoloArena = require('../components/SoloArena');
var ChallengeArena = require('../components/ChallengeArena');
var Login = require('../components/Login');
var Staging = require('../components/Staging');
var Leaderboard = require('../components/Leaderboard');
var NavBar = require('../components/NavBar');
var Profile = require('../components/Profile');
var SoloStaging = require('../components/SoloStaging');

//constant requires (views)
var LOGIN = require('../constants').view.LOGIN;
var SOLO_ARENA = require('../constants').view.SOLO_ARENA;
var CHALLENGE_ARENA = require('../constants').view.CHALLENGE_ARENA;
var STAGING = require('../constants').view.STAGING;
var LEADERBOARD = require('../constants').view.LEADERBOARD;
var PROFILE = require('../constants').view.PROFILE;
var SOLO_STAGING = require('../constants').view.SOLO_STAGING;

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
        console.log(this.props)
          //history.pushState(store.getState(), 'Staging', "staging");
          return (
            <div>
              <NavBar {...this.props}/>
              <Staging {...this.props}/>
            </div>
          );
        case SOLO_ARENA:
          //history.pushState(store.getState(), 'Arena', "arena");
          return (
            <div>
              <NavBar {...this.props}/>
              <SoloArena {...this.props}/>
            </div>
          );
        case CHALLENGE_ARENA:
          //history.pushState(store.getState(), 'Arena', "arena");
          return (
            <div>
              <NavBar {...this.props}/>
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
          case PROFILE:
            //history.pushState(store.getState(), 'Leaderboard', "leadboard");
            return (
              <div>
                <NavBar {...this.props}/>
                <Profile {...this.props}/>
              </div>
            );
          case SOLO_STAGING:
            //history.pushState(store.getState(), 'Leaderboard', "leadboard");
            return (
              <div>
                <NavBar {...this.props}/>
                <SoloStaging {...this.props}/>
              </div>
            );
      }
    } else {
      //history.pushState(store.getState(), 'Login', "login");
      return (
        <div>
          <NavBar {...this.props}/>
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
