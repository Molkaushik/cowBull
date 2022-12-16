import React from 'react';
import {AppContext} from '../App.js';
import {letterColor} from './Utils.js';

export default function Cell(props){
    const {board, correctWord, cursor, setDisabledLetters, setCorrectLetters, setCloseLetters, closeCount, correctCount} = React.useContext(AppContext);
    const letter = board[props.row][props.col];
    const correct = correctWord[props.col] === letter;
    const close = !correct && letter !== "" && correctWord.includes(letter);
    // const letterState = cursor.row > props.row && (correct ? "correct" : close ? "close" : "incorrect");
    const letterState = cursor.row > props.row && (closeCount[props.row]===0 && correctCount[props.row]===0 ? "cancel" : "incorrect");

    React.useEffect(() => {
        // if(letter!=="" && !correct && !close){
        //     setDisabledLetters((prevState) => [...prevState, letter]);
        // }else if(letter!=="" && correct){
        //     setCorrectLetters((prevState) => [...prevState, letter]);
        // }else if(letter!=="" && close){
        //     setCloseLetters((prevState) => [...prevState, letter]);
        // }
        if(closeCount[props.row]===0 && correctCount[props.row]===0){
            setDisabledLetters((prevState) => [...prevState, board[props.row][0], board[props.row][1], board[props.row][2], board[props.row][3]]);
        }
    }, [cursor.row]);
    return (
        <div 
            className={cursor.row > props.row ? `cell ${letterColor[letter]}` : "cell"} 
            id={letterState ? letterState : ""}
            >{letter}
        </div>
    )
}