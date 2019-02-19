import React, { Component } from 'react';
import TicTacToe from './Tic-tac-toe';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loadGame: false,
    }
    this.startGame = this.startGame.bind(this);
  }


  startGame() {
    this.setState( {loadGame: true} );
  }

  render() {
    if (this.state.loadGame) {
      return (
        <TicTacToe />
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Tic Tac Toe game.
          </p>
          <button
            className="App-start-game-button"
            onClick={this.startGame}
          >
            Start Game
          </button>
        </header>
      </div>
    );
  }
}

export default App;
