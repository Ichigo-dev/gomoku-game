import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}

function Board(props) {
  const [isNext, setIsNext] = useState('X')

  function toggleIsNext() {
    setIsNext(isNext === 'X' ? 'O' : 'X');
  }

  function clickBtn(i) {
    if(props.squares[i] === null && winner === null){
      var tmp = props.squares.slice();
      toggleIsNext()
      tmp[i] = isNext;
      setSquares(tmp)
    }
  }

  function renderSquare(i) {
    return <Square value={props.squares[i]} onClick={ ()=>clickBtn(i) } />;
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(props.squares)
  var status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + isNext;
  }

  return (
    <div>
    <div className="status">{status}</div>
    <div className="board-row">
    {renderSquare(0)}
    {renderSquare(1)}
    {renderSquare(2)}
    </div>
    <div className="board-row">
    {renderSquare(3)}
    {renderSquare(4)}
    {renderSquare(5)}
    </div>
    <div className="board-row">
    {renderSquare(6)}
    {renderSquare(7)}
    {renderSquare(8)}
    </div>
    </div>
  );
}

function Game() {
    const [history, setHistory] = useState(Array(9).fill(null))
    const [squares, setSquares] = useState(Array(9).fill(null))

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={ squares }/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
 
