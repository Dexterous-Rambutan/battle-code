var React = require('react');

var Leaderboard = React.createClass({
  getLeaderBoard: function(){
    var problem_id = this.props.arena.problem_id;
    this.props.arenaActions.getLeaderBoard(problem_id);
  },
  exit: function(){
    this.props.arenaActions.exitSplash();
  },
  render: function() {
    var solutions = this.props.arena.leaderBoard.map(function(element, index){
      return (


        <tr><td className="left">{index + 1}. {element.github_handle}</td> <td className="right">{element.total_time/1000} seconds </td> </tr>

      )
    })
    if (solutions.length > 10) {
      solutions = solutions.slice(0, 10);
    }


    return (
      <div>
        <center>
          {this.props.arena.status === 'YOU WON!' ? <div className="card-content challenge-status">{this.props.arena.status}</div> : <div className="card-content challenge-status">CHALLENGE COMPLETE</div>}
          <div><button className="submit splash-buttons" onClick={this.getLeaderBoard}>  VIEW LEADERBOARD  </button></div>
          <div><button className="submit splash-buttons" onClick={this.exit}>GO BACK TO SOLUTION</button></div>
          <div className='leaderboard'>{this.props.arena.problem_name}</div>
          <table className='leaderboard'>
          {solutions}
          </table>
        </center>
      </div>
    )
  }
});

module.exports = Leaderboard;
