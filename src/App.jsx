import { useState } from 'react'
import './App.css'

const TURNS = {
  x: 'x',
  o: 'o'
}




const Square = ({ children,isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''} `

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className= {className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const[ board, setBoard ] = useState(Array(9).fill(null));

  const  [ turn, setTurn ] = useState(TURNS.x);

  const [ winner, setWinner ] = useState(null) // null no hay ganador y false que hay un empate

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c ] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c] 
      ){
      return boardToCheck[a];
      }

    }
    return null;
  }


  const updateBoard = (index) => {
    // no actualizamos esta posicion
    // si ya tiene algo
    if(board[index] || winner ) return 
    // actualizar el tablero

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno 
    const newTurn = turn  === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    // revisar si hay ganador
    const newWinner = checkWinner(newBoard) 
    if(newWinner) {
      setWinner(newWinner)
    }

  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
    </main>
  )
}

export default App
