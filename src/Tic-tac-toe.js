import React, { Component } from 'react';

const VS_HUM = 0;
const VS_PC = 1;
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
      isPcPlay: null,
      gameMode: false,
      nextMove: MOVE_X,
      humanPlayer: null,
      pcPlayer: null,
      cells: Array(9).fill(null),
      currentTurn: 1,
    };

    this.gameSetup = this.gameSetup.bind(this);
    this.restart = this.restart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.move = this.move.bind(this);
    this.getScoreBoardMessage = this.getScoreBoardMessage.bind(this);
    
    // todo - logic for pc move
    // this.moveFromPc = this.moveFromPc.bind(this);
    // this.findNextWin = this.findNextWin.bind(this);
    // this.getRandomInt = this.getRandomInt.bind(this);


  }

  gameSetup(event) {
    if (event.target.dataset.versus === 'hum') {
      this.setState({
        gameMode: VS_HUM,
        isPcPlay: false,
        isGameStarted: true,
        isNewGame: false,
      });
    } else if (event.target.dataset.versus === 'pc') {
      this.setState({
        gameMode: VS_PC,
        isPcPlay: true,
        isNewGame: false,
      });      
    } else if (event.target.dataset.firstMove === 'pc') {
      this.setState({
        humanPlayer: MOVE_0,
        pcPlayer: MOVE_X,
        isGameStarted: false, // true when impl
      });   
      // this.moveFromPc();
      alert('sorry - I need more time to implement PC move');
    } else if (event.target.dataset.firstMove === 'hum') {
      this.setState({
        humanPlayer: MOVE_X,
        pcPlayer: MOVE_0,
        isGameStarted: false, // true when impl
      });  
      alert('sorry - I need more time to implement PC move');
      // this.moveFromPc();
    }
  }

  restart() {
    this.setState({
      isNewGame: true,
      isGameStarted: false,
      winner: null,
      isPcPlay: null,
      gameMode: false,
      nextMove: MOVE_X,
      humanPlayer: null,
      pcPlayer: null,
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
        return this.state.cells[a];
      }
    }

    if (this.state.currentTurn === 9) {
      return 'draw'
    }

    return null;
  }

  handleMove(event) {
    const cell = event.target.closest("[data-index]");

    if (!cell || !this.state.isGameStarted) {
      return;
    }

    const index = +cell.dataset.index;

    this.move(index);
  }

  move(index) {
    if (this.state.cells[index] !== null) {
      return;
    }

    if (this.state.winner) {
      return;
    }

    const mark = this.state.currentTurn % 2 === 1 ? MOVE_X : MOVE_0;
    
    this.state.cells[index] = mark; // если через setState - в scoreBoard не рендерится winner
    
    this.setState(prevState => {
      return {
        currentTurn: prevState.currentTurn + 1,
        winner: this.getWinner(),
      };
    });
  }

  getScoreBoardMessage() {
    const {
      isNewGame, gameMode, winner, nextMove, isGameStarted
    } = this.state;

    if (isNewGame) {
      return (
      <span>
        <span className="vs" data-versus="hum">VS Human</span>
        <span className="vs" data-versus="pc">VS PC</span>
      </span>
      );
    }

    if (gameMode === VS_PC && !isGameStarted) {
      return (
      <span>
        <span>First move: </span>
        <span className="vs" data-first-move="pc">PC</span>
        <span className="vs" data-first-move="hum">Human</span>
      </span>
      );
    }
    if (winner && winner !== 'draw') {
      return (
      <h3>The winner is: {winner}</h3>
      );
    }

    if (winner === 'draw') {
      return (
      <h3>Nobody wins</h3>
      );
    }

    if (nextMove) {
      return (
      <p>next move: <span>{nextMove}</span></p>
      );
    }
    return null;
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

          <div className="Scoreboard" onClick={this.gameSetup}>
            {this.getScoreBoardMessage()}
          </div>

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