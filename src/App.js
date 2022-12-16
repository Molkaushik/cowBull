import './App.css';
import React from 'react';
import Board from './components/Board.js';
import KeyBoard from './components/KeyBoard.js';
import GameOver from './components/GameOver.js';
import {defaultBoard, generateWordSet} from './components/Utils.js';

export const AppContext = React.createContext();

function App() {
  const [board, setBoard] = React.useState(defaultBoard);
  const [cursor, setCursor] = React.useState({row: 0, col: 0});
  const [wordSet, setWordSet] = React.useState(new Set());
  const [disabledLetters, setDisabledLetters] = React.useState([]);
  const [correctLetters, setCorrectLetters] = React.useState([]);
  const [closeLetters, setCloseLetters] = React.useState([]);
  const [gameOver, setGameOver] = React.useState({gameOver: false, guessedWord: false})
  const [correctWord, setCorrectWord] = React.useState("");
  const [correctCount, setCorrectCount] = React.useState([]);
  const [closeCount, setCloseCount] = React.useState([]);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  React.useEffect(() => {
    generateWordSet().then((data) => {
      setWordSet(data.wordSet);
      setCorrectWord(data.correctWord.toUpperCase());
    });
  }, []);

  const onKeyClick = (keyVal) => {
    if(cursor.col>3 || cursor.row>4 || !gameStarted) return;
    const newBoard = [...board];
    newBoard[cursor.row][cursor.col] = keyVal;
    setBoard(newBoard);
    setCursor({...cursor, col: cursor.col+1});
    const cell = document.getElementsByClassName('cell')[cursor.row*4 + cursor.col];
    cell.classList.add('type');
    setTimeout(() => {
      cell.classList.remove('type');
    }, 100);
  }
  const onEnter = () => {
    if(cursor.col!==4) return;
    let currWord = "";
    let correctLettersCount = 0;
    let closeLettersCount = 0;
    for(let i=0; i<4; i++){
      currWord += board[cursor.row][i];
      if(board[cursor.row][i]===correctWord[i]) correctLettersCount++;
      else if(correctWord.includes(board[cursor.row][i])) closeLettersCount++;
    }
    if(wordSet.has(currWord.toLowerCase())){
      setCorrectCount((prevState) => [...prevState, correctLettersCount]);
      setCloseCount((prevState) => [...prevState, closeLettersCount]);
      for(let i=0; i<2; i++){
        setTimeout(() => {
          const hint = document.getElementsByClassName('hint')[cursor.row*2 + i];
          hint.classList.add('reveal');
          setTimeout(() => {
            hint.classList.remove('reveal');
          }, 200);
        }, 100*2*i);
      }
      setCursor({row: cursor.row+1, col: 0});
    }else{
      alert("Not a valid word");
      return;
    }
    if(currWord === correctWord){
      setGameOver({gameOver: true, guessedWord: true});
      return;
    }
    if(cursor.row === 4){
      setGameOver({gameOver: true, guessedWord: false});
    }
  }
  const onDelete = () => {
    if(cursor.col<=0) return;
    const newBoard = [...board];
    newBoard[cursor.row][cursor.col-1] = "";
    setBoard(newBoard);
    setCursor({...cursor, col: cursor.col-1});
  }

  return (
    <div className="App">
      <header>
        Cow-bull
      </header>
      <AppContext.Provider value={{board, setBoard, cursor, setCursor, onKeyClick, onEnter, onDelete, correctWord, disabledLetters, setDisabledLetters, correctLetters, setCorrectLetters, closeLetters, setCloseLetters, gameOver, setGameOver, correctCount, closeCount, minutes, seconds, setMinutes, setSeconds, gameStarted, setGameStarted}}>
        <Board />
        {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
