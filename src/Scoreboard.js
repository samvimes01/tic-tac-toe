import React, { Component } from 'react';

class Scoreboard extends Component {
  constructor(props) {
    super();
    this.state = {
      newGame: props.newGame,
    }

    this.renderScore = this.renderScore.bind(this);
  }

  renderScore() {
    if (this.state.newGame) {
      // знаю что плохо - но если через setState - то будет бесконечный рендер
      this.state.newGame = false;

      return (
      <span>
        <span className="vs" data-versus="hum">VS Human</span>
        <span className="vs" data-versus="pc">VS PC</span>
      </span>
      );
    }
    if (this.state.gameMode) {
      this.state.gameMode = false;
      
      return (
      <span>
        <span>First move: </span>
        <span className="vs" data-first-move="pc">PC</span>
        <span className="vs" data-first-move="hum">Human</span>
      </span>
      );
    }
    if (this.state.winner) {
      return (
      <h3>The winner is: {this.state.winner}</h3>
      );
    }
    if (this.state.noWinner) {
      return (
      <h3>Nobody wins</h3>
      );
    }
    if (this.state.nextMove) {
      return (
      <p>next move: <span>{this.state.nextMove}</span></p>
      );
    }
  }

  render() {
    return (
      <div className="Scoreboard" onClick={this.props.gameMode}>
        {this.renderScore()}
      </div>
    );
  }
  
}

export default Scoreboard;