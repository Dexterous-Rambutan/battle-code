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
var components = require('../components');

//constant requires (views)
var views = require('../constants').view;


var contextType = {
  redux: React.PropTypes.object
};

var App = React.createClass({
  componentWillMount: function(){
    this.props.loginActions.checkLoggedIn();
  },

  render: function(){
    if(this.props.user.isLoggedIn){
      switch(this.props.view) {
        case views.STAGING:
          //history.pushState(store.getState(), 'Staging', "staging");
          return (
            <div>
              <components.NavBar {...this.props}/>
              <components.Staging {...this.props}/>
            </div>
          );
        case views.SOLO_ARENA:
          //history.pushState(store.getState(), 'Arena', "arena");
          return (
            <div>
              <components.NavBar {...this.props}/>
              <components.SoloArena {...this.props}/>
            </div>
          );
        case views.CHALLENGE_ARENA:
          //history.pushState(store.getState(), 'Arena', "arena");
          return (
            <div>
              <components.NavBar {...this.props}/>
              <components.ChallengeArena {...this.props}/>
            </div>
          );
        case views.LEADERBOARD:
          //history.pushState(store.getState(), 'Leaderboard', "leadboard");
          return (
            <div>
              <components.NavBar {...this.props}/>
              <components.Leaderboard {...this.props}/>
            </div>
          );
          case views.PROFILE:
            //history.pushState(store.getState(), 'Leaderboard', "leadboard");
            return (
              <div>
                <components.NavBar {...this.props}/>
                <components.Profile {...this.props}/>
                <components.Staging {...this.props}/>
              </div>
            );
          case views.SOLO_STAGING:
            //history.pushState(store.getState(), 'Leaderboard', "leadboard");
            return (
              <div>
                <components.NavBar {...this.props}/>
                <components.Staging {...this.props}/>
                <components.SoloStaging {...this.props}/>
              </div>
            );
      }
    } else {
      //history.pushState(store.getState(), 'Login', "login");
      return (
        <div>
          <components.Login {...this.props}/>
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
