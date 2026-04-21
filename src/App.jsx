import { useState } from 'react'
import './App.css'

export default function App() {
  // here I am creating a board of 9 boxes (initially empty)
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  // this is for checking whose turn it is (true = X, false = O)
  const [isXTurn, setIsXTurn] = useState(true);

  // when user clicks on any box
  function handleClick(index) {
    // if box is already filled OR game already has a winner, then do nothing
    if (board[index] !== "" || checkWinner()) {
      return;
    }

    // making a copy of board so original state is not directly changed
    let updatedBoard = [...board];

    // putting X or O based on turn
    if (isXTurn) {
      updatedBoard[index] = "X";
    } else {
      updatedBoard[index] = "O";
    }

    // updating state
    setBoard(updatedBoard);

    // switching turn
    setIsXTurn(!isXTurn);
  }

  // this function checks if someone has won
  function checkWinner() {
    // all possible winning combinations
    const winCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // for rows

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // for columns

      [0, 4, 8],
      [2, 4, 6], // for diagonals
    ];

    // checking each combination
    for (let i = 0; i < winCases.length; i++) {
      let a = winCases[i][0];
      let b = winCases[i][1];
      let c = winCases[i][2];

      // if all three values match and are not empty
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // return X or O
      }
    }

    // if no winner
    return null;
  }

  // storing winner value
  const winner = checkWinner();

  // reset button function
  function resetGame() {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setIsXTurn(true);
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      {/* showing turn or winner */}
      <h2>{winner ? "Winner: " + winner : "Turn: " + (isXTurn ? "X" : "O")}</h2>

      <div className="board">
        {/* creating 9 buttons using map */}
        {board.map((value, index) => {
          return (
            <button
              key={index}
              className="cell"
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          );
        })}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
