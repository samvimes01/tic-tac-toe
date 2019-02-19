import React, { Component } from 'react';
import ReactDOM from "react-dom";

import Scoreboard from './Scoreboard';

const VS_HUM = 123;
const VS_PC = 101;
const MOVE_X = 'X';
const MOVE_0 = '0';
const winPositions = ["012", "036", "048", "147", "246", "258", "345", "678"];

class TicTacToe extends Component {
  constructor() {
    super();

    this.state = {
      isNewGame: true,
      isGameStarted: false,
      winner: null,
      isPcPlay: false,
      gameMode: false,
      nextMove: MOVE_X,
      player: MOVE_X,
      cells: Array(9).fill(null),
      currentTurn: 1,
    };

    this.scoreboard = React.createRef();

    this.gameMode = this.gameMode.bind(this);
    this.restart = this.restart.bind(this);
    this.reset = this.reset.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.move = this.move.bind(this);

    // todo - logic for pc move
    // this.moveFromPc = this.moveFromPc.bind(this);
    // this.findNextWin = this.findNextWin.bind(this);
    // this.getRandomInt = this.getRandomInt.bind(this);


  }

  gameMode(event) {
    if (event.target.dataset.versus === 'hum') {
      this.scoreboard.current.setState({nextMove: this.state.nextMove});

      this.setState({
        gameMode: VS_HUM,
        isPcPlay: false,
        isGameStarted: true,
      });
    } else if (event.target.dataset.versus === 'pc') {
      this.scoreboard.current.setState({gameMode: VS_PC});
      this.setState({
        gameMode: VS_PC,
        isPcPlay: true,
        isGameStarted: false, // true when impl
      });      
    } else if (event.target.dataset.firstMove === 'pc') {
      // this.moveFromPc();
      alert('sorry - I need more time to implement PC move');
    } else if (event.target.dataset.firstMove === 'hum') {
      alert('sorry - I need more time to implement PC move');
      // this.scoreboard.current.setState({nextMove: this.state.nextMove});
    }
  }

  restart() {
    this.reset();

    this.scoreboard.current.setState({
      newGame: true,
      winner: null,
      noWinner: null,
    });

    const field = ReactDOM.findDOMNode(this).querySelector('.field');
    for (let cell of field.childNodes) {
      cell.textContent = '';
    }
  }

  reset() {
    this.setState({
      isNewGame: true,
      isGameStarted: false,
      winner: null,
      isPcPlay: false,
      gameMode: false,
      nextMove: MOVE_X,
      player: MOVE_X,
      cells: Array(9).fill(null),
      currentTurn: 1,
    });
  }

  getWinner() {
    for (let position of winPositions) {
      const [a, b, c] = [...position];

      if (
        this.state.cells[a] !== null &&
        this.state.cells[a] === this.state.cells[b] &&
        this.state.cells[b] === this.state.cells[c]
      ) {
      this.scoreboard.current.setState({winner: this.state.cells[a]});
        return this.state.cells[a];
      }
    }

    if (this.state.currentTurn === 9) {
      this.scoreboard.current.setState({noWinner: true});
    }

    return null;
  }

  handleMove(event) {
    const cell = event.target.closest("[data-index]");

    if (!cell || !this.state.isGameStarted) {
      return;
    }

    const index = cell.dataset.index;

    this.move(index);
  }

  move(index) {
    if (this.state.cells[index] !== null) {
      return;
    }

    if (this.state.winner !== null) {
      return;
    }

    const mark = this.state.currentTurn % 2 === 1 ? MOVE_X : MOVE_0;
    
    this.state.cells[index] = mark;
    
    this.setState(state => {
      return {
        currentTurn: state.currentTurn + 1,
        winner: this.getWinner(),
      };
    });
  }

  render() {
    const  cellArray = this.state.cells.map((cell, ind) => {
      return (<div key={ind} data-index={ind} className="cell">{cell || ''}</div>);
    });

    return (
      <div className="Game">
        <header className="Game-header">
          <p>
            Tic Tac Toe game.
          </p>
        </header>
        <main className="Game-main">

          <Scoreboard newGame={this.state.isNewGame} gameMode={this.gameMode} ref={this.scoreboard}/>

          <div className="field" onClick={this.handleMove}>
            {cellArray}
          </div>

          <div className="restart">
              <span onClick={this.restart}>restart</span>
          </div>

        </main>
      </div>
    );
  }
  
}

export default TicTacToe;