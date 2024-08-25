import { useState } from "react";
import "./App.css"

function Square({ value, clickation }) {
  //const [value, setvalue] = useState(null);

  //function clickation() {
  //  setvalue("X");
  //  console.log("Clicked");
  //}
  return (<button className="square" onClick={clickation} >{value}</button>);
}

export default function Game()
{
  const [xIsNext, setXAsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const currentSquares = squares[squares.length - 1];
  
  function play()
  {
    setSquares([...squares, setSquares]);
    setXAsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={play}/>
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
function Board({xIsNext , squares , onPlay}) {
  //const [xIsNext, setXAsNext] = useState(true);
  //const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      console.log("you win");
      return;
    }
    if (xIsNext)
      nextSquares[i] = "X";
    else
      nextSquares[i] = "O";
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player is: " + (xIsNext ? "X" : "O");
  }


  return (
    <>
    <div class="winning">{status}</div>
      <div class="board-square">
        <Square value={squares[0]} clickation={() => handleClick(0)} />
        <Square value={squares[1]} clickation={() => handleClick(1)} />
        <Square value={squares[2]} clickation={() => handleClick(2)} />
      </div>
      <div class="board-square">
        <Square value={squares[3]} clickation={() => handleClick(3)} />
        <Square value={squares[4]} clickation={() => handleClick(4)} />
        <Square value={squares[5]} clickation={() => handleClick(5)} />
      </div>
      <div class="board-square">
        <Square value={squares[6]} clickation={() => handleClick(6)} />
        <Square value={squares[7]} clickation={() => handleClick(7)} />
        <Square value={squares[8]} clickation={() => handleClick(8)} />
      </div>
    </>
  );
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}