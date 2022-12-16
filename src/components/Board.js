import React from 'react';
import Cell from './Cell.js';
import Hint from './Hint.js';
import Timer from './Timer.js';
import {AppContext} from '../App.js';

export default function Board(){
    const {minutes, seconds, setMinutes, setSeconds, gameStarted, setGameStarted, gameOver} = React.useContext(AppContext);
    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
    };
    const handleSecondsChange = (event) => {
        setSeconds(event.target.value);
    };
    const handleClick = () => {
        if(((minutes===0 || minutes==0) && (seconds>0 && seconds<60)) || (minutes>0 && (seconds>=0 && seconds<=59))){
            setGameStarted(true);
        }else{
            alert("Enter valid time");
        }
    }
    
    return (
        <div className="board">
            <div className="board-header">
                <h2>Guess the word!</h2>
                {gameStarted ? (!gameOver.gameOver ? <Timer />  : ""): <div className="game-header">
                    <input id="minutes-input" type="text" placeholder="Minutes..." onChange={handleMinutesChange} autoComplete="off"/>
                    <input id="seconds-input" type="text" placeholder="Seconds..." onChange={handleSecondsChange} autoComplete="off"/>
                    <button id="timer-btn" onClick={handleClick}>Start Timer</button>
                </div>}
            </div>
            <div className="grid-and-hints">
                <div className="board-grid">
                    <div className="grid-row">
                        <Cell row={0} col={0}/>
                        <Cell row={0} col={1}/>
                        <Cell row={0} col={2}/>
                        <Cell row={0} col={3}/>
                    </div>
                    <div className="grid-row">
                        <Cell row={1} col={0}/>
                        <Cell row={1} col={1}/>
                        <Cell row={1} col={2}/>
                        <Cell row={1} col={3}/>
                    </div>
                    <div className="grid-row">
                        <Cell row={2} col={0}/>
                        <Cell row={2} col={1}/>
                        <Cell row={2} col={2}/>
                        <Cell row={2} col={3}/>
                    </div>
                    <div className="grid-row">
                        <Cell row={3} col={0}/>
                        <Cell row={3} col={1}/>
                        <Cell row={3} col={2}/>
                        <Cell row={3} col={3}/>
                    </div>
                    <div className="grid-row">
                        <Cell row={4} col={0}/>
                        <Cell row={4} col={1}/>
                        <Cell row={4} col={2}/>
                        <Cell row={4} col={3}/>
                    </div>
                </div>
                <div className="hints">
                    <div className="hints-row">
                        <Hint row={0} col={0}/>
                        <Hint row={0} col={1}/>
                    </div>
                    <div className="hints-row">
                        <Hint row={1} col={0}/>
                        <Hint row={1} col={1}/>
                    </div>
                    <div className="hints-row">
                        <Hint row={2} col={0}/>
                        <Hint row={2} col={1}/>
                    </div>
                    <div className="hints-row">
                        <Hint row={3} col={0}/>
                        <Hint row={3} col={1}/>
                    </div>
                    <div className="hints-row">
                        <Hint row={4} col={0}/>
                        <Hint row={4} col={1}/>
                    </div>
                </div>
            </div>
        </div>
    )
}