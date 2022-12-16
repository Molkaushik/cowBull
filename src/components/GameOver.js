import React from 'react';
import {AppContext} from '../App.js';

export default function GameOver(){
    const {gameOver, correctWord} = React.useContext(AppContext);
    return (
        <div className="game-over">
            <h3>{gameOver.guessedWord ? "Awesome! You guessed it right 🎉" : "Better luck next time!💔"}</h3>
            <h1>Correct word: {correctWord}</h1>
        </div>
    )
}