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
    
    this.moveFromPc = this.moveFromPc.bind(this);
    this.findNextWin = this.findNextWin.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);


  }

  gameSetup(mode) {
    switch(mode) {
      case 'hum':
        this.setState({
          gameMode: VS_HUM,
          isPcPlay: false,
          isGameStarted: true,
          isNewGame: false,
        });
        break;
      case 'pc':
        this.setState({
          gameMode: VS_PC,
          isPcPlay: true,
          isNewGame: false,
        }); 
        break;
      case 'firstPc':
        this.setState({
          humanPlayer: MOVE_0,
          pcPlayer: MOVE_X,
          isGameStarted: true,
        });   
        this.moveFromPc();
        break;
      case 'firstHum':
        this.setState({
          humanPlayer: MOVE_X,
          pcPlayer: MOVE_0,
          isGameStarted: true,
        });
        break;
      default:
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
    const { cells, currentTurn } = this.state;

    for (let position of winPositions) {
      const [a, b, c] = [...position];

      if (
        cells[a] !== null &&
        cells[a] === cells[b] &&
        cells[b] === cells[c]
      ) {
        return cells[a];
      }
    }

    if (currentTurn === 9) {
      return 'draw'
    }

    return null;
  }

  handleMove(cellIndex) {
    const { isGameStarted, gameMode } = this.state;

    if (!isGameStarted) {
      return;
    }

    this.move(cellIndex);

    if (gameMode === VS_PC) {
      setTimeout(this.moveFromPc, 100);
    }
  }

  move(index) {
    const { cells, winner, currentTurn } = this.state;

    if (cells[index] !== null) {
      return;
    }

    if (winner) {
      return;
    }

    let mark = currentTurn % 2 === 1 ? MOVE_X : MOVE_0;
    
    this.setState(prevState => {
      const {cells} = prevState;
      cells[index] = mark;
      return {
        cells,
        currentTurn: prevState.currentTurn + 1,
        winner: this.getWinner(),
        nextMove: mark === MOVE_0 ? MOVE_X : MOVE_0,
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
        <span className="vs" onClick={() => this.gameSetup('hum')}>VS Human</span>
        <span className="vs" onClick={() => this.gameSetup('pc')}>VS PC</span>
      </span>
      );
    }

    if (gameMode === VS_PC && !isGameStarted) {
      return (
      <span>
        <span>First move: </span>
        <span className="vs" onClick={() => this.gameSetup('firstPc')}>PC</span>
        <span className="vs" onClick={() => this.gameSetup('firstHum')}>Human</span>
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

  moveFromPc() {
    const { humanPlayer, pcPlayer, cells } = this.state;
    let index;
    const humanWinMove = this.findNextWin(humanPlayer);
    if (humanWinMove >= 0) {
      index = humanWinMove;
    } else {
      const pcWinMove = this.findNextWin(pcPlayer);
  
      if (pcWinMove >= 0) {
        index = pcWinMove;
      } else {
        const emptyCells = cells.map(
          (el, i) => {
            if (!el) {
              return i
            };
            return null;
          }
        ).filter(el => el);

        index = emptyCells[this.getRandomInt(0, emptyCells.length)];
      }
    }
    this.move(index);
  }
  
  findNextWin(letterForCheck) {
    const { cells } = this.state;

    for (let position of winPositions) {
      const [a, b, c] = [...position];

      const cellValues = [ cells[a], cells[b], cells[c] ];
      const potentialWinPosArr = cellValues.filter(val => val === letterForCheck);
      const emptyPosition = cellValues.indexOf(null);

      if (emptyPosition >= 0 && potentialWinPosArr.length === 2) {
        return position[emptyPosition];
      }
    }

    return -1;
  }
  
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    const  cellArray = this.state.cells.map((cell, ind) => {
      return (<div key={ind} className="cell" onClick={() => this.handleMove(ind)}>{cell || ''}</div>);
    });

    return (
      <div className="game">
        <header className="game-header">
          <p>
            Tic Tac Toe game.
          </p>
        </header>
        <main className="game-main">

          <div className="scoreboard">
            {this.getScoreBoardMessage()}
          </div>

          <div className="field">
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